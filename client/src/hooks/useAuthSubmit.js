import axios from "./Axios";
import { useState } from "react";

export default function useAuthSubmit(url, values) {
    const [error, setError] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(url, values)
            .then(({ data }) => {
                data.success ? location.replace("/") : setError(true);
            })
            .catch((err) => {
                console.log(`there was an error in axios post ${url}`, err);
                setError(true);
            });
    };
    return [error, handleSubmit];
}
