// import { useState } from "react";
import axios from "./Axios";

export default function DeleteProfilePic(props) {
    const submit = () => {
        axios
            .post(`/delete-profile-pic`)
            .then(({ data }) => {
                props.deletePic(data.rows[0].profile_pic_url);
            })
            .catch((err) => {
                console.log("err in axios get users: ", err);
            });
    };

    return (
        <>
            <img
                onClick={() => submit()}
                src="/delete.svg"
                className="delete"
            />
        </>
    );
}
