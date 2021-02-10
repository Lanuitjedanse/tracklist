import ReactDOM from "react-dom";
import Welcome from "./Welcome";
// import Logo from "./Logo";
import App from "./App";

let elem;

// const elem = location.pathname ? <Welcome/> : <Logo/>;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    // elem = <Logo />;
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
