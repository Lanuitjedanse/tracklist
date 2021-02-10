export default function ProfilePic(props) {
    console.log(props);
    return (
        <div onClick={props.toggleUploader} className="profile-pic">
            <img
                src={props.ProfilePicUrl || "avatar.png"} // need to change this
                alt={`${props.firstName}`}
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
