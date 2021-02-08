export default function Greetee(props) {
    // console.log("props in greetee: ", props);
    // ALWAYS console.log('props') to make sure you receive the info
    return <span>{props.firstName || "AWESOME_USER"}</span>;
}
