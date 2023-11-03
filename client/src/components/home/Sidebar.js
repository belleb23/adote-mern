import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Sidebar() {
  return (
    <Nav className="flex-column sidebar">
      <NavDropdown title="Menu" id="sidebar-dropdown">
        <NavDropdown.Item href="#section1">Seção 1</NavDropdown.Item>
        <NavDropdown.Item href="#section2">Seção 2</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#section3">Seção 3</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
}

export default Sidebar;
