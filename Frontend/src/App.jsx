import Standings from "./pages/Standings.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router"
import Home from "./pages/Home.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import Login from "./pages/LoginPage.jsx";

const app = ()=>{
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/standings" element={<Standings/>}/>
          <Route path="/admin" element={<AdminPanel/>}/>
          <Route path="/log" element={<Login/>}/>
        </Routes>
      </Router>
    </>
  )
}
export default app