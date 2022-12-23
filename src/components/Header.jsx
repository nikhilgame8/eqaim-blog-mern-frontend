import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { BiHome, BiNotepad } from 'react-icons/bi';
import { AiOutlineFileAdd } from 'react-icons/ai';
const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Link className="navbar-brand" to="/">Eqaim Blog</Link>
          <Nav className="me-auto">
            <Link className="nav-link" to="/"><BiHome /> Home</Link>
            <Link className="nav-link" to="/newblog"><BiNotepad /> Publish New Blog</Link>
            <Link className="nav-link" to="/blogpost"><AiOutlineFileAdd /> New Blog</Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default Header
