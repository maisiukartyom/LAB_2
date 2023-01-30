import Home from "./pages/home/Home";
import {
  BrowserRouter,
  Routes, 
  Route,
} from 'react-router-dom'
import Create from "./pages/create/Create";
import Detatails from "./pages/details/Details";
import Edit from "./pages/edit/Edit";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<Home />}/>
        <Route path="/create" element={<Create />}/>
        <Route path="/details/:id" element={<Detatails />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/edit/:id" element={<Edit />}/>
      </Routes>
    </ BrowserRouter>
  );
}

export default App;
