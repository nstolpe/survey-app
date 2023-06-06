import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Results from 'Components/pages/Results';
import Survey from 'Components/pages/Survey';

const root = createRoot(document.getElementById('root') as HTMLElement);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Survey />,
  },
  {
    path: 'results',
    element: <Results />,
  },
]);

root.render(<RouterProvider router={router} />);
