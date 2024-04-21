import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Students",
    href: "/students",
    icon: "bi bi-people-fill",
  },
 


  {
    title: "Guardians",
    href: "/guardians",
    icon: "bi bi-person",
  },
  {
    title: "Register Student",
    href: "/student_registration",
    icon: "bi bi-person-add",
  },

  {
    title: "Attendance",
    href: "/attendance",
    icon: "bi bi-people",
  },

  {
    title: "Parents",
    href: "/parents",
    icon: "bi bi-person",
  },
  {
    title: "Teacher",
    href: "/teachers",
    icon: "bi bi-person",
  },

  {
    title: "Authenticator",
    href: "/authenticators",
    icon: "bi bi-person",
  },

  
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
   
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <span className="ms-auto d-lg-none">
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
         
        </Nav>
      </div>
    </div>
    
  );
};

export default Sidebar;
