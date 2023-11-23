import React, { Component } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

class Header extends Component {
  render() {
    return (
      <header>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">Robôs Admin.</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Logs</Nav.Link>
                <NavDropdown title="Opções" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Primeira</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Segunda
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Terceira
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Quarta Opção
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

export default Header;
