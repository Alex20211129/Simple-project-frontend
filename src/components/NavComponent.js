import React, { useContext, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  Dropdown,DropdownItem, Button, Badge
} from "reactstrap";
import { Link } from 'react-router-dom';
import { Store } from "./store";


export default function NavComponent(props) {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart,userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('Token');
  };


  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);
    
  return (
    <div className="px-2">
      <Navbar light expand="md">
        <NavbarBrand tag={Link} to="/Simple-project-frontend" className="mr-auto">
        <img src="/images/logo.png" width="40" height="40" alt="logo"/>
          信大貿易
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink tag={Link} to="/Introduction">
                公司介紹
              </NavLink>
            </NavItem>
            <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle nav caret>
                    產品目錄
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem ><NavLink tag={Link} to={`Categories/IndustrialLubricants`}>工業用潤滑油</NavLink></DropdownItem>
                    <DropdownItem ><NavLink tag={Link} to={`Categories/AutomotiveLubricants`}>車用潤滑油</NavLink></DropdownItem>
                    <DropdownItem ><NavLink tag={Link} to={`Categories/MarineLubrication`}>船舶用潤滑油</NavLink></DropdownItem>    
                    <DropdownItem ><NavLink tag={Link} to={`Categories/FoodMachineryOil`}>食品機械用潤滑油</NavLink></DropdownItem>    
                    {/* <DropdownItem ><NavLink tag={Link} to={`Categories/IndustrialLubricants`}>潛盾工程防水油脂</NavLink></DropdownItem>     */}
                    <DropdownItem ><NavLink tag={Link} to={`Categories/MetalProcessingOil`}>金屬加工用油</NavLink></DropdownItem>    
                    <DropdownItem ><NavLink tag={Link} to={`Categories/Grease`}>潤滑油脂</NavLink></DropdownItem>    
                    {/* <DropdownItem ><NavLink tag={Link} to={`Categories/IndustrialLubricants`}>其他特殊品</NavLink></DropdownItem>     */}
                </DropdownMenu>
            </Dropdown>
            <NavItem>
              <NavLink tag={Link} to="ContactUs">
                與我聯繫
              </NavLink>
            </NavItem>
            {!userInfo ? (
              <Nav navbar>
                <NavItem>
                  <NavLink tag={Link} to="/login">
                    登錄
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/register">
                    註冊
                  </NavLink>
                </NavItem>
              </Nav>
            ) : (
            <Nav navbar>
              <NavItem>
                <NavLink tag={Button} onClick={signoutHandler}>
                  登出
                </NavLink>
                </NavItem>
                <Link to="/cart" className='nav-link'>
                  詢價單
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.length}
                    </Badge>)}
                </Link>
            </Nav>)}
            {userInfo && userInfo.role === "Admin" && (
              <NavItem style={{marginRight: '10px'}}>
                <NavLink tag={Link} to="/product/admin">
                  新增產品
                </NavLink>
              </NavItem>  
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}