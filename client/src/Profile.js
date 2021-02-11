import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";
// import Uploader from "./Uploader";

export default function Profile(props) {
    console.log("props in profile: ", props);
    return (
        <div className="profile-box border-pink">
            <h1>I am the profile component</h1>
            <p>
                Hi, {props.firstName} {props.lastName}
            </p>
            <ProfilePic
                firstName={props.firstName}
                lastName={props.lastName}
                profilePicUrl={props.profilePicUrl}
                className="profile-pic"
            />

            <BioEditor bio={props.bio} />
        </div>
    );
}

// need to add bio in bioeditor component
