import React from 'react';
import { Link } from 'react-router-dom';

const HeaderNavButton = ({ title, link }) => {
  return (
    <Link to={link} className="nav-link">
      {title}
    </Link>
  );
};

export default HeaderNavButton;
