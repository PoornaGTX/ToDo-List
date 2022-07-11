import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EditToDo from "./pages/EditToDo";
import NotFoundPage from "./component/NotFoundPage";
import FrogetPassword from "./pages/FrogetPassword";
import PasswordRest from "./pages/PasswordRest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/update-profile" element={<Profile />} />
        <Route path="/edit-todo" element={<EditToDo />} />
        <Route path="/login/frogetpassword" element={<FrogetPassword />} />
        <Route path="reset-password/:id/:token" element={<PasswordRest />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
