export default function ProfilePic({
    firstName,
    lastName,
    profilePicUrl,
    toggleUploader,
    size = "",
}) {
    return (
        <img
            src={profilePicUrl || "/avatar.jpg"} // need to change this
            alt={`${firstName} ${lastName}`}
            className={`${size} profile-pic`}
            onClick={toggleUploader}
        />
    );
}
