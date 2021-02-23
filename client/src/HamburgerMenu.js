import { NavLink } from "react-router-dom";
// import { ReactComponent as House } from "./client/public/house.svg";

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
                    <img className="menu-icon" src="/house.svg" fill="white" />

                    <li>Home</li>
                </NavLink>
                <NavLink
                    to="/chat"
                    activeClassName="burger-active"
                    onClick={toggleBurgerMenu}
                >
                    <img className="menu-icon" src="/chat.svg" />
                    <li>Chat</li>
                </NavLink>
                <NavLink
                    onClick={toggleBurgerMenu}
                    to="/show-my-friends"
                    activeClassName="burger-active"
                >
                    <img className="menu-icon" src="/friends.svg" />
                    <li>Friends</li>
                </NavLink>
                <NavLink
                    onClick={toggleBurgerMenu}
                    to="/find-users"
                    activeClassName="burger-active"
                >
                    <img className="menu-icon" src="/magnifier-black.svg" />
                    <li>Find People</li>
                </NavLink>
                <a onClick={toggleBurgerMenu} href="/logout">
                    <img className="menu-icon" src="/switch-off.svg" />
                    <li>Logout</li>
                </a>
            </ul>
        </nav>
    );
}
