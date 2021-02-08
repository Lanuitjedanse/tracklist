import Greetee from "./greetee.js";
import Counter from "./counter.js";

export default function HelloWorld() {
    const name = "Lucie";
    return (
        <div className="name">
            <div>
                Hello <Greetee firstName={name} />
            </div>
            <div>
                Hello <Greetee firstName="Adobo" />
            </div>
            <div>
                Hello <Greetee />
            </div>
            <Counter />
        </div>
    );
}
