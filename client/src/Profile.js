import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";
// import Uploader from "./Uploader";

export default function Profile(props) {
    console.log("props in profile: ", props);
    return (
        <div className="profile-box border-pink">
            <ProfilePic
                firstName={props.firstName}
                lastName={props.lastName}
                profilePicUrl={props.profilePicUrl}
                className="profile-pic"
            />
            <h3>
                {props.firstName} {props.lastName}
            </h3>

            <BioEditor bio={props.bio} />
        </div>
    );
}

// need to add bio in bioeditor component
