const spicedPg = require("spiced-pg");

let db;
if (process.env.DATABASE_URL) {
    // means we are in production on heroku
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbUsername, dbPassword } = require("../secrets");
    db = spicedPg(`postgres:${dbUsername}:${dbPassword}@localhost:5432/social`);
}

module.exports.insertUserData = (first, last, email, hashedPw) => {
    const q = `INSERT INTO users (first, last, email, password) 
    VALUES ($1, $2, $3, $4) RETURNING *`;
    const params = [first, last, email, hashedPw];
    return db.query(q, params);
};

module.exports.getLoginData = (email) => {
    const q = `SELECT users.email, users.password, users.id FROM users
    WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.insertCode = (email, code) => {
    const q = `INSERT INTO reset_codes (email, code) 
    VALUES ($1, $2) RETURNING *`;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.verifyCode = () => {
    const q = `SELECT * FROM reset_codes
    WHERE CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes'`;
    // const params = [code];
    return db.query(q);
};

module.exports.updatePassword = (email, hashedPw) => {
    const q = `UPDATE users
    SET password = $2
    WHERE email = $1`;
    const params = [email, hashedPw];
    return db.query(q, params);
};

module.exports.fetchProfileData = (userId) => {
    const q = `SELECT id, first, last, profile_pic_url, bio FROM users WHERE id = $1`;
    const params = [userId];
    return db.query(q, params);
};

module.exports.uploadPic = (userId, profilePicUrl) => {
    const q = `UPDATE users
    SET profile_pic_url = $2
    WHERE id = $1 RETURNING profile_pic_url`;
    const params = [userId, profilePicUrl];
    return db.query(q, params);
};

module.exports.editBio = (userId, bio) => {
    const q = `UPDATE users
    SET bio = $2
    WHERE id = $1 RETURNING bio`;
    const params = [userId, bio];
    return db.query(q, params);
};

module.exports.findMatchingUsers = (val) => {
    return db.query(
        `SELECT id, first, last, profile_pic_url FROM USERS WHERE first ILIKE $1 OR last ILIKE $1`,
        [val + "%"]
    );
};

module.exports.getThreeLastUsers = () => {
    const q = `SELECT id, first, last, profile_pic_url FROM users ORDER BY id DESC LIMIT 3`;
    return db.query(q);
};

module.exports.checkFriendStatus = (recipientId, senderId) => {
    const q = `SELECT * FROM friendships
    WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1)`;
    const params = [recipientId, senderId];
    return db.query(q, params);
};

module.exports.createFriendship = (recipientId, senderId) => {
    const q = `INSERT INTO friendships (recipient_id, sender_id) 
     VALUES ($1, $2) RETURNING *`;
    const params = [recipientId, senderId];
    return db.query(q, params);
};

module.exports.unfriend = (recipientId, senderId) => {
    const q = `DELETE FROM friendships WHERE recipient_id = $1 AND sender_id = $2
    OR sender_id = $1 AND recipient_id = $2`;
    const params = [recipientId, senderId];
    return db.query(q, params);
};

module.exports.acceptFriendship = (senderId, recipientId) => {
    const q = `UPDATE friendships
    SET accepted = true
    WHERE sender_id = $1 AND recipient_id = $2 OR recipient_id = $1 AND sender_id = $2
    RETURNING *`;
    const params = [senderId, recipientId];
    return db.query(q, params);
};

module.exports.showFriends = (userId) => {
    const q = `SELECT users.id, first, last, profile_pic_url, accepted, sender_id, recipient_id
    FROM friendships
    JOIN users
    ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = false AND sender_id = $1 AND recipient_id = users.id)
    OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)`;
    const params = [userId];
    return db.query(q, params);
};

module.exports.showFriendsOthers = (userId) => {
    const q = `SELECT users.id, first, last, profile_pic_url, accepted, sender_id, recipient_id
    FROM friendships
    JOIN users
    ON (accepted = true AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)`;
    const params = [userId];
    return db.query(q, params);
};

module.exports.deleteProfilePic = (userId) => {
    const q = `UPDATE users
    SET profile_pic_url = null
    WHERE id = $1 returning profile_pic_url, id`;
    const params = [userId];
    return db.query(q, params);
};

module.exports.addMessage = (senderId, message) => {
    const q = `INSERT INTO chat (sender_id, message) 
    VALUES ($1, $2) RETURNING *`;
    const params = [senderId, message];
    return db.query(q, params);
};

module.exports.showMessages = () => {
    const q = `SELECT chat.sender_id, chat.message, chat.created_at, users.first, users.last, users.profile_pic_url, chat.id 
    FROM chat
    JOIN users
    ON sender_id = users.id
    ORDER BY chat.id DESC LIMIT 10`;

    return db.query(q);
};

module.exports.showLastMessage = () => {
    const q = `SELECT chat.sender_id, chat.message, chat.created_at, users.first, users.last, users.profile_pic_url, chat.id 
    FROM chat
    JOIN users
    ON sender_id = users.id
    ORDER BY chat.id DESC LIMIT 1`;

    return db.query(q);
};

module.exports.deleteUser = (userId) => {
    const q = `DELETE FROM users
    WHERE id = $1`;
    const params = [userId];
    return db.query(q, params);
};

module.exports.deleteChats = (userId) => {
    const q = `DELETE FROM chat
    WHERE sender_id = $1`;
    const params = [userId];
    return db.query(q, params);
};

module.exports.deleteFrienships = (userId) => {
    const q = `DELETE FROM friendships
    WHERE sender_id = $1 OR recipient_id = $1`;
    const params = [userId];
    return db.query(q, params);
};

module.exports.deleteCodes = (userId) => {
    const q = `DELETE FROM reset_codes
    WHERE reset_id = $1`;
    const params = [userId];
    return db.query(q, params);
};
// DELETE users, chat, friendships, reset_codes
//     FROM users
//     LEFT JOIN chat ON users.id = chat.sender_id
//     LEFT JOIN friendships ON users.id = friendships.sender_id OR users.id = recipient_id
//     LEFT JOIN reset_codes ON users.id = reset_codes.reset_id
//     WHERE users.id = 212;

// module.exports.addPlaylist = (userId, playlist) => {
//     const q = `UPDATE users
//     SET playlist = $2
//     WHERE id = $1 RETURNING playlist`;
//     const params = [userId, playlist];
//     return db.query(q, params);
// };

// UPDATE users
//     SET playlist = 'https://open.spotify.com/embed/playlist/51siUNlGNdF4Bp78hKZ8RA'
//     WHERE id = 1 RETURNING playlist;

// ALTER TABLE users
// DROP COLUMN playlist;
