// "dumb" /presentational are alternative for function component
import Registration from "./registration.js";
export default function Welcome() {
    return (
        <div className="welcome-box main-container">
            <h1>Welcome to Tracklist</h1>
            <img className="logo" src="vinyl-black.svg" alt="vinyl logo" />
            <Registration />
        </div>
    );
}
