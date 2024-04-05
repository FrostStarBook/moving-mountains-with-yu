import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Game from "./Game";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/game" element={<Game />} />
            </Routes>
        </Router>
    );
}

export default App;