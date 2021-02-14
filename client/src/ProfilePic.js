export default function ProfilePic({
    firstName,
    lastName,
    profilePicUrl,
    toggleUploader,
    size = "",
}) {
    // console.log("props in profilePic: ", props);
    // let { ProfilePicUrl } = props;
    // let { firstName, lastName, profilePicUrl, toggleUploader } = props;
    {
        /* <div className="profile-pic-box"> */
    }

    return (
        <img
            src={profilePicUrl || "avatar.png"} // need to change this
            alt={`${firstName} ${lastName}`}
            className={`${size} profile-pic`}
            onClick={toggleUploader}
        />
    );
}
