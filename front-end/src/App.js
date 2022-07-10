import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EditToDo from "./pages/EditToDo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/update-profile" element={<Profile />} />
        <Route path="/edit-todo" element={<EditToDo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
