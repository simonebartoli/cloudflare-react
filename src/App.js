import logo from "./logo.svg";
import "./App.css";
import {useEffect, useState} from "react";

async function getData() {
    const response = await fetch("https://cloudflare-backend.bartolisimone.workers.dev/api/posts");
    return await response.json();
}


function App() {
    const [data, setData] = useState("")

    useEffect(() => {
        const getDat = async () => {
          const data = await getData()
          setData(data)
        }
        getDat()
    }, []);

    return (
        <div className="App">
          {data}
        </div>
    );
}

export default App;
