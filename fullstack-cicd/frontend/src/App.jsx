import { useEffect, useState } from "react";

function App() {
    const [message, setMessage] = useState("Loading...");

    useEffect(() => {
        fetch("http://localhost:5000/api/message")
            .then((response) => response.json())
            .then((data) => {
                setMessage(data.message);
            })
            .catch((error) => {
                console.error("Error:", error);
                setMessage("Backend connection failed");
            });
    }, []);

    return (
        <div>
            <h1>Full Stack CI/CD Application</h1>
            <p>{message}</p>
        </div>
    );
}

export default App;