import ReactDOM from "react-dom";
import Welcome from "./welcome.js";

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <img className="logo" src="vinyl-black.svg" alt="vinyl logo" />;
}

ReactDOM.render(elem, document.querySelector("main"));
