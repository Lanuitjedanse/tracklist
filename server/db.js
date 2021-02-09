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
