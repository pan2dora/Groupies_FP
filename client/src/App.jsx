import "./App.css";
import MyNavBar from "./components/Navbar/Navbar";
import {Route,Routes,} from "react-router-dom";
import Home from "./components/Routes/Home";
import Profile from "./components/Routes/Profile";
import About from "./components/Routes/About";


// const router = createBrowserRouter(
//   createRoutesFromElements(
   
//    <Route path="/" element={<MyNavBar/>}>
//        <Route path="/home" element={<Home />} />
//       <Route path="/user-profile" element={<Profile />} />
     
//     </Route>
  
    
//   )
// );

function App() {
  return (
    <>
    <div className="w-screen h-screen bg-yellow-50"></div>
     <MyNavBar/>
     <Routes>

    <Route path="/" element = {<Home/>}/>
    <Route path="/profile" element = {<Profile/>}/>
    <Route path="/about" element = {<About/>}/>
    <Route path="/home" element = {<Home/>}/>
     </Routes>
    </>
  );
}

export default App;
