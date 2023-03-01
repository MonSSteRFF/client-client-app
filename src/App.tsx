import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Client from './Pages/Client';
import HomePage from './Pages/HomePage';
import Server from './Pages/Server';

function App() {
  const routes = [
    {
      path: '/',
      element: HomePage,
    },
    {
      path: '/server',
      element: Server,
    },
    {
      path: '/client',
      element: Client,
    },
  ];

  return (
    <>
      <header></header>
      <main>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              element={<route.element />}
              path={route.path}
              index={route.path === '/'}
            />
          ))}
        </Routes>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
