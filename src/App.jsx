import './App.css'
import { BrowserRouter, Router, Routes, useRoutes } from "react-router-dom";
import routes from "./routes/routes.jsx";

function App() {
    const element = useRoutes(routes);
    return (
                <div className="App">
                    {element}
                </div>
    )
}

export default App
