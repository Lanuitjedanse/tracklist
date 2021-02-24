import axios from "./Axios";
import { useState } from "react";

export default function DeleteAccount() {
    const [toggleDel, setToggleDel] = useState(false);

    const toggleDelete = () => {
        setToggleDel(!toggleDel);
    };
    const deleteProfile = () => {
        // console.log("deletePic", props.deletePic);

        axios
            .post("/delete-account")
            .then(() => {
                // console.log("data: ", data.rows[0].profile_pic_url);
                // response.redirect("/logout");
                window.location.reload();
            })
            .catch((err) => {
                console.log("err in axios get users: ", err);
            });
    };

    return (
        <div className="delete-container">
            <button
                className="btn-purple btn-delete"
                onClick={() => toggleDelete()}
            >
                Delete your account
            </button>
            {toggleDel && (
                <div className="delete-box">
                    <p>Are you sure?</p>
                    <div className="button-box">
                        <button
                            className="btn-purple btn-delete"
                            onClick={() => deleteProfile()}
                        >
                            Yes
                        </button>
                        <button
                            className="btn-purple btn-delete"
                            onClick={() => toggleDelete()}
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
