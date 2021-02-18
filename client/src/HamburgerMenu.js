import { Link } from "react-router-dom";

export default function HamburgerMenu({ toggleBurgerMenu }) {
    // console.log("props.toggleBurgerMenu: ", props.toggleBurgerMenu);
    return (
        <nav>
            <ul className="hamburger-menu">
                <Link onClick={toggleBurgerMenu} to="/">
                    <li>Home</li>
                </Link>
                <Link onClick={toggleBurgerMenu} to="/show-my-friends">
                    <li>Friends</li>
                </Link>
                <Link onClick={toggleBurgerMenu} to="/find-users">
                    <li>Find People</li>
                </Link>
                <a onClick={toggleBurgerMenu} href="/logout">
                    <li>Logout</li>
                </a>
            </ul>
        </nav>
    );
}
