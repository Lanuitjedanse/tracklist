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
        <div>
            <button
                className="btn-purple btn-no"
                onClick={() => toggleDelete()}
            >
                Delete your account
            </button>
            {toggleDel && (
                <div className="delete-box">
                    <p>Are you sure?</p>
                    <button
                        className="btn-purple btn-no"
                        onClick={() => deleteProfile()}
                    >
                        Yes, adios!
                    </button>
                    <button
                        className="btn-purple btn-no"
                        onClick={() => toggleDelete()}
                    >
                        No, I want to stay
                    </button>
                </div>
            )}
        </div>
    );
}
