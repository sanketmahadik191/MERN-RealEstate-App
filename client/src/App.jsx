import { BrowserRouter, Route,Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
   <BrowserRouter>
    <Header></Header>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/sign-in" element={<Signin />}></Route>
      <Route path="/sign-up" element={<Signup />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />}></Route>
      </Route>
    </Routes>
    </BrowserRouter> 
  );
}

export default App;
