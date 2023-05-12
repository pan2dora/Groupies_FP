import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from '/src/assets/Heading.svg'


function MyNavBar(props) {

  return (
   <div className = 'shaswo-md w-full fixed top-0 left-0'>
    <div className = 'md:flex bg-white py-4 md:px-10 px-7'>
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
      profile
    </a>
    </div>

   </div>
  );
};

export default MyNavBar;