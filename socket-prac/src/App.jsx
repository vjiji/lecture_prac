import { BrowserRouter, Route, Routes } from "react-router-dom";
import Room1 from "./Room1";
import Room2 from "./Room2";
import Buttons from "./Buttons";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Buttons />} />
        <Route path="/room1" element={<Room1 />} />
        <Route path="/room2" element={<Room2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
