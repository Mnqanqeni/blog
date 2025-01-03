import React, { useEffect, useState } from "react";
import HeadContainer from "../containers/HeadContainer";
import { useNavigate } from "react-router-dom";
import Logo  from "../Logo";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faX} from '@fortawesome/free-solid-svg-icons';


function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMobileView,setMobileView] = useState(window.innerWidth<440);
  const [isMenuOpen,setIsMenuOpen] = useState(false);
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Posts",
      slug: "/add-posts",
      active: authStatus,
    },
  ];

  useEffect(() => {
    const handleResize = () => setMobileView(window.innerWidth < 440);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  

  return (
    <header>
      <HeadContainer>
        <nav className="flex border border-red-200 fixed w-full px-4 top-0">
          <div className="">
            <Link to="/">
              <Logo/>
            </Link>
          </div>
          {isMobileView?(isMenuOpen?(<ul className="flex ml-auto flex-col absolute right-0 py-2 px-2 w-1/2 rounded-lg backdrop-blur-lg">
            <FontAwesomeIcon icon={faX} className="mb-3 text-4xl self-end" onClick={()=>(setIsMenuOpen(false))}/>
            {
              navItems.map((item)=>(item.active? (
              <li key={item.name}>
              <button onClick={()=>navigate(item.slug)} className={`inline-block py-2 duration-200 ${window.location.href==item.slug?":bg-blue-100":""} hover:bg-blue-100 rounded-full w-full text-lg`}>{item.name}</button>
                </li> 
            ):null))
            }
            {authStatus && (<li><LogoutBtn/></li>)}
          </ul>):<FontAwesomeIcon icon={faBars} className="ml-auto self-center px-4 text-4xl cursor-pointer" onClick={()=>(setIsMenuOpen(true))}/>)
          :
          (<ul className="flex ml-auto items-center ">
            {
              navItems.map((item)=>(item.active? (
              <li key={item.name}>
                <button onClick={()=>navigate(item.slug)} className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">{item.name}</button>
                </li> 
            ):null))
            }
            {authStatus && (<li><LogoutBtn/></li>)}
          </ul>)}
          
        </nav>
      </HeadContainer>
    </header>
  );
}

export default Header;
