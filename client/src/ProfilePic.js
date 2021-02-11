export default function ProfilePic(props) {
    console.log("props: ", props);
    let { firstName, lastName, profilePicUrl, toggleUploader } = props;

    return (
        <div onClick={toggleUploader} className="profile-pic">
            <img
                src={profilePicUrl || "avatar.png"} // need to change this
                alt={`${firstName}, ${lastName}`}
            />
        </div>
    );
}

// export function ProfilePic(props) {
//     return (
//         <div onClick={props.toggleUploader} className="profile-pic">
//             <img
//                 src={props.profilePicUrl || "default.png"}
//                 alt={`$props.firstName`}
//             />
//         </div>
//     );
// }
