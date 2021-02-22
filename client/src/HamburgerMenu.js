import { NavLink } from "react-router-dom";

export default function HamburgerMenu({ toggleBurgerMenu }) {
    // console.log("props.toggleBurgerMenu: ", props.toggleBurgerMenu);
    return (
        <nav>
            <ul className="hamburger-menu">
                <NavLink
                    onClick={toggleBurgerMenu}
                    exact
                    to="/"
                    activeClassName="burger-active"
                >
                    <li>Home</li>
                </NavLink>
                <NavLink
                    to="/chat"
                    activeClassName="burger-active"
                    onClick={toggleBurgerMenu}
                >
                    <li>Chat</li>
                </NavLink>
                <NavLink
                    onClick={toggleBurgerMenu}
                    to="/show-my-friends"
                    activeClassName="burger-active"
                >
                    <li>Friends</li>
                </NavLink>
                <NavLink
                    onClick={toggleBurgerMenu}
                    to="/find-users"
                    activeClassName="burger-active"
                >
                    <li>Find People</li>
                </NavLink>
                <a onClick={toggleBurgerMenu} href="/logout">
                    <li>Logout</li>
                </a>
            </ul>
        </nav>
    );
}
