import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from '/src/assets/Heading.svg'
import LogoutBtn from '../Login/LogoutBtn';


function MyNavBar(props) {

let Links = [
  {name: "HOME", link:"/"},
  {name: "PROFILE", link:"/"}
]

  return (
    
    //div1: creates navbar shadow div2: creates uniformed spacing and color 
   <div className = 'shadow-md w-full fixed top-0 left-0'>
    <div className = 'md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
      
      <div  >
      <a href = '/'>
      
         <img 
              
              src={Logo}
              height="150"
              className="d-lg-inline-block"
              alt="Groupies Logo"  />   
       </a>
      </div>
    <a className= 'font-bold text-2xl cursor-pointer flex items-center underline decoration-transparent transition duration-300 ease-in-out hover:decoration-inherit' href ='/'>
      Link
    </a>
    <ul className ='md:flex md:items-center'>
    {
    Links.map((link)=>(
      //spaces out link text
      <li key ={link.name} className ='md:ml-8 text-xl '>
        
        <a href={link.link} className='hover:text-pink-800 duration-500' >{link.name}</a>
      </li>

    ))}
    <LogoutBtn/>
    </ul>
    </div>

   </div>
  );
};

export default MyNavBar;