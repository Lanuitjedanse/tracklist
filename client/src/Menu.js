// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Menu() {
    return (
        <>
            <NavLink exact to="/" activeClassName="active">
                <p>Home</p>
            </NavLink>
            <NavLink to="/show-my-friends" activeClassName="active">
                <p>Friends</p>
            </NavLink>
            <NavLink to="/find-users" activeClassName="active">
                <p>Find People</p>
            </NavLink>
            <a href="/logout">Logout</a>
        </>
    );
}
