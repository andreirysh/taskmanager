import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './common/components/Header/Header';
import ContactUsModal from './common/components/ContactUsModal/ContactUsModal';
import BoardPage from './pages/BoardPage/BoardPage';
import MainPage from './pages/MainPage/MainPage';
import Login from './pages/AuthPage/components/Login/Login'
import Signup from './pages/AuthPage/components/Signup/Signup'
import { TasksPage } from "./pages/TasksPage/TasksPage";
import { ProtectedRoutes } from "./common/HOC/ProtectedRoutes";
import { AuthService } from "./pages/AuthPage/AuthService";
import { ProjectsPage } from "./pages/ProjectsPage/ProjectsPage";
import { CommonAlert } from "./common/components/CommonAlert/CommonAlert";

const App = () => {

  const user = AuthService.getUser();

  return (
    <div className="App">
      <CommonAlert />
      {!!user && <Header />}
      <ContactUsModal />
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/projects" element={<ProtectedRoutes children={<ProjectsPage />} />} />
        <Route path="/boards" element={<ProtectedRoutes children={<BoardPage />} />} />
        <Route path="/tasks" element={<ProtectedRoutes children={<TasksPage />} />} />
      </Routes>
    </div>
  );
};

export default App;
