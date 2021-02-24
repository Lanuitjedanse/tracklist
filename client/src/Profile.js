import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";
import DeleteProfilePic from "./deleteProfilePic";
import DeleteAccount from "./DeleteAccount";

export default function Profile(props) {
    console.log("props in profile: ", props);
    console.log("deletepic: ", props.deletePic);

    // console.log("playlist: ", props.playlist);
    return (
        <div className="profile-box border-pink">
            <div className="profile-pic-box">
                <ProfilePic
                    firstName={props.firstName}
                    lastName={props.lastName}
                    profilePicUrl={props.profilePicUrl}
                    className="profile-pic"
                />
                <div className="icon-box">
                    <img
                        className="camera-icon"
                        src="/camera.svg"
                        onClick={props.toggleUploader}
                    />
                    <DeleteProfilePic
                        profilePicUrl={props.profilePicUrl}
                        deletePic={props.deletePic}
                        id={props.id}
                    />
                </div>
            </div>

            <h3>
                {props.firstName} {props.lastName}
            </h3>
            <BioEditor bio={props.bio} />
            <DeleteAccount />
        </div>
    );
}
// <Playlist />;
// need to add bio in bioeditor component
{
    /* <Playlist playlist={props.playlist} />; */
}
