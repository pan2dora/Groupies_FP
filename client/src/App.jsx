import "./App.css";
import MyNavBar from "./components/Navbar/Navbar";
import {Route,Routes,BrowserRouter} from "react-router-dom";
import Home from "./components/Routes/Home";
import Profile from "./components/Routes/Profile";
import About from "./components/Routes/About";
import Group from "./components/Routes/Groups/Group";
import GroupList from "./components/Routes/Groups/GroupsList";
import Auth0ProviderWithNavigate from "./components/Auth0/Auth0Provider";


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
    <Route path="/groups" element = {<GroupList/>}/>
 
     </Routes>
   
    
   </> 
  );
}

export default App;

