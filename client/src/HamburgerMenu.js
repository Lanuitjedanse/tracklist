import { Link } from "react-router-dom";

export default function HamburgerMenu() {
    return (
        <nav className="hamburger-menu">
            <ul>
                <Link to="/">
                    <li>Home</li>
                </Link>
                <Link to="/find-users">
                    <li>Find People</li>
                </Link>
                <a href="/logout">
                    <li>Logout</li>
                </a>
            </ul>
        </nav>
    );
}
