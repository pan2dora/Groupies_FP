
import Logo from "/src/assets/Heading.svg";
import Button from "../Login/Button";
import { useState } from "react";

function MyNavBar(props) {
  let Links = [
    { name: "Explore", link: "/groups" },
    { name: "Create", link: "/" },
    { name: "About", link: "/about" }
  ];

  let [open, setOpen] = useState(false);
  return (
    //div1: creates navbar shadow div2: creates uniformed spacing and color
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white  md:px-10 px-7 ">
        <div>
          <a href="/">
            <img
              src={Logo}
              height="150"
             
              alt="Groupies Logo"
            />
          </a>
        </div>
        {/* <a
          className="font-bold text-2xl cursor-pointer flex items-center underline decoration-transparent transition duration-300 ease-in-out hover:decoration-inherit"
          href="/"
        >
          Link
        </a> */}
     

        <div  onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
          <ion-icon name={open ? 'close':'menu'}></ion-icon>
        </div>
        <ul className={`md:flex md:items-center md:pb-0 pb-12 py-10 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 opacity-100' : 'top-[-490px] '} md:opacity-100 opacity-0`}>
          {
          Links.map((link) => (
            //spaces out link text
            <li key={link.name}  className=" text-small md:my-0 my-7  bg-white-600 hover: w-1/2 rounded text-black fw-20  md:ml-9 hover:bg-orange-100 duration-500 ">
              <a href={link.link} className="hover:text-pink-800 duration-500">
                {link.name}
              </a>
                  
            </li>
          ))}
          <Button>Logout</Button> 
        </ul>
  
      </div>
      
    </div>
  );
}

export default MyNavBar;
