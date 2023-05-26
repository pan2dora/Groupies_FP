import "./App.css";
import MyNavBar from "./components/Navbar/Navbar";
import {Route,Routes} from "react-router-dom";
import Home from "./components/Routes/Home";
import Profile from "./components/Routes/Profile";
import About from "./components/Routes/About";
import Group from "./components/Routes/Groups/Group";
import CreateGroup from "./components/Routes/Groups/CreateGroup";
import 'semantic-ui-css/semantic.min.css'
import UserSignup from "./components/Routes/Users/UserSignup";




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
   <header>
    <MyNavBar/>
   </header>

  

     <Routes>
    
    <Route path="/" element = {<Home/>}/>
    <Route path="/profile" element = {<Profile/>}/>
    <Route path="/about" element = {<About/>}/>
    <Route path="/group" element = {<Group/>}/>
    <Route path="/group/:groupId" element = {<Group/>}/>
   <Route path = "/signup" element = {<UserSignup/>}/>
    <Route path="/create" element = {<CreateGroup/>}/>
 
 
     </Routes>
   
    
   </> 
  );
}

export default App;

