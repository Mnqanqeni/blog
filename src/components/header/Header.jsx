import React from "react";
import Container from "../container/Container";
import { useNavigate } from "react-router-dom";
import Logo  from "../Logo";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

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

  
  return (
    <header>
      <Container>
        
        <nav className="flex border border-red-200">
          <div className="mr-4">
            <Link to="/">
              <Logo/>
            </Link>
          </div>
          <ul className="flex ml-auto ">
            {
              navItems.map((item)=>(item.active? (
              <li key={item.name}>
                <button onClick={()=>navigate(item.slug)} className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">{item.name}</button>
                {console.log(item)}
                </li> 
            ):null))
            }
            {authStatus && (<li><LogoutBtn/></li>)}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;