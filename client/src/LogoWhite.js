import { Link } from "react-router-dom";

export default function LogoWhite() {
    return (
        <Link to="/" className="logo-header">
            <img src="/vinyl-white.svg" alt="vinyl logo" />
        </Link>
    );
}
