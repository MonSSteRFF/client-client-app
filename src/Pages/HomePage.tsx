import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <ul>
        <li>
          <Link to={'/server'}>Создать сервер</Link>
        </li>
        <li>
          <Link to={'/client'}>Подключится</Link>
        </li>
      </ul>
    </>
  );
};

export default HomePage;
