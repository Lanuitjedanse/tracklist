// "dumb" /presentational are alternative for function component
import { HashRouter, Route } from "react-router-dom";
import Registration from "./Registration";
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
                    I am baby chia trust fund cred kale chips chartreuse celiac
                    irony schlitz. Shaman beard kitsch, farm-to-table cray
                    yuccie pour-over meh. Occupy helvetica gluten-free deep v
                    mlkshk wolf. Pickled irony man bun quinoa sustainable
                    leggings chartreuse, fixie jean shorts.
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
