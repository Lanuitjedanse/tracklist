// "dumb" /presentational are alternative for function component
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./Login";
import Logo from "./Logo";
import ResetPassword from "./resetpassword";

export default function Welcome() {
    return (
        <div className="super-container">
            <div className="welcome-box">
                <Logo />
                <h2 className="brand-title">Tracklist</h2>
                <p className="reg-text">
                    The new social network for music lovers
                </p>
            </div>
            <HashRouter>
                <Route exact path="/" component={Registration} />
                <Route path="/login" component={Login} />
                <Route path="/password/reset/start" component={ResetPassword} />
            </HashRouter>
        </div>
    );
}
