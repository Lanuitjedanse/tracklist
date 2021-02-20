import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";
// import Playlist from "./Playlist";

export default function Profile(props) {
    console.log("props in profile: ", props);
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
                <img
                    className="camera-icon"
                    src="/camera.svg"
                    onClick={props.toggleUploader}
                />
            </div>

            <h3>
                {props.firstName} {props.lastName}
            </h3>
            <BioEditor bio={props.bio} />
        </div>
    );
}
// <Playlist />;
// need to add bio in bioeditor component
{
    /* <Playlist playlist={props.playlist} />; */
}
