import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <>
            <Link to="/show-my-friends">
                <p>Friends</p>
            </Link>
            <Link to="/find-users">
                <p>Find People</p>
            </Link>
            <a href="/logout">Logout</a>
        </>
    );
}
