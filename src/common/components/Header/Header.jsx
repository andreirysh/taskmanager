import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import HeaderNavButton from '../HeaderNavButton/HeaderNavButton';
import CreateTaskModal from '../../../pages/TasksPage/components/CreateTaskModal/CreateTaskModal';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import CommonButton from '../CommonButton/CommonButton';
import data from '../../../data/data.json';
import { AuthService } from "../../../pages/AuthPage/AuthService";
import './Header.css'

const Header = () => {


  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [teams, setTeams] = useState(data);
  const location = useLocation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleTeamSelection = (team) => {
    console.log('Выбрана команда:', team);
  };

  const isTasksPage = location.pathname === '/tasks';

  const logout = () => {
    AuthService.logout()
    navigate('/main')
  }

  return (
    <>
      <Navbar bg="light" expand="lg" className="main--header--container">
        <Container fluid>
          <Navbar.Brand>
            <Navbar.Brand>Task Manager</Navbar.Brand>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0">
              <HeaderNavButton title={'Tasks'} link={'/tasks'} />
              <HeaderNavButton title={'Projects'} link={'/projects'} />
              <HeaderNavButton title={'Boards'} link={'/boards'} />
              <NavDropdown title="Teams" id="navbarScrollingDropdown">
                {teams.map((team, index) => (
                  <NavDropdown.Item
                    key={index}
                    onClick={() => handleTeamSelection(team)}
                  >
                    {team.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              {isTasksPage && (
                <CommonButton
                  variant={'primary'}
                  name={'Create'}
                  type={'submit'}
                  onClick={handleShow}
                />
              )}
            </Nav>
            <CommonButton variant={'primary'} name={'Log out'} type={'submit'} onClick={logout} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
      <CreateTaskModal show={show} handleClose={handleClose} />
    </>
  );
};

export default Header;
