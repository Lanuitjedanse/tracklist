import { useState, useEffect } from "react";
import axios from "./Axios";

export default function DeleteProfilePic(props) {
    const [profilePic, setProfilePic] = useState();
    console.log("props: ", props);

    const deletePic = (e) => {
        e.preventDefault();
        // console.log("viewee: ", viewee);

        axios
            .post(`/delete-profile-pic`, profilePic)
            .then(({ data }) => {
                console.log("data: ", data.rows[0].profile_pic_url);
                setProfilePic(data.rows[0].profile_pic_url);
            })
            .catch((err) => {
                console.log("err in axios get users: ", err);
            });
    };

    return (
        <div>
            <img onClick={deletePic} src="/delete.svg" className="delete" />
        </div>
    );
}
