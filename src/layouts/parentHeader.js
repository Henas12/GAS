import React  from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import { ReactComponent as LogoWhite } from "../assets/images/logos/xtremelogowhite.svg";
import user1 from "../assets/images/users/user1.jpg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const {user, logoutUser} = useContext(AuthContext)
  return (
    <Navbar color="primary" dark expand="md" className="bg-gradient">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          <LogoWhite />
       
        </NavbarBrand>
        <Button
          color="primary"
          className=" d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link to="/parent/home" className="nav-link" style={{color:"white",paddingLeft:"30px", fontSize:'20px', textDecoration: 'none', // Remove underline by default
             transition: 'text-decoration 0.3s ease'}}
         
             onMouseOver={(e) => {
              e.currentTarget.style.color = 'lightgray';
              e.currentTarget.style.textDecoration = 'underline';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.textDecoration = 'none';
            }}>
              Home
            </Link>
          </NavItem>
          
          <NavItem>
            <Link to="/parent/unread"
            className="nav-link" style={{color:"white",paddingLeft:"30px", fontSize:'20px', textDecoration: 'none', // Remove underline by default
            transition: 'text-decoration 0.3s ease'}}
        
            onMouseOver={(e) => {
             e.currentTarget.style.color = 'lightgray';
             e.currentTarget.style.textDecoration = 'underline';
           }}
           onMouseOut={(e) => {
             e.currentTarget.style.color = 'white';
             e.currentTarget.style.textDecoration = 'none';
           }}>
             Unread Contact Book
            </Link>
          </NavItem>

          
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            
            <DropdownItem onClick={()=> navigate('/profile')}>Edit Profile</DropdownItem>
            <DropdownItem>Inbox</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={logoutUser} >Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
