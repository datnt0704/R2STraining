/** @format */

import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { ListPosts, Example, Login, PostDetail, Root } from './pages';
import { ListPostContext } from './context/ListPostContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <ListPosts />,
      },
      {
        path: 'post/:postId',
        element: <PostDetail />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
