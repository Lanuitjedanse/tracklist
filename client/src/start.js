import ReactDOM from "react-dom";
import Welcome from "./Welcome";
import Logo from "./Logo";

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <Logo />;
}

ReactDOM.render(elem, document.querySelector("main"));
