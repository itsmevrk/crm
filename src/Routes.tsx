// src/Routes.tsx
import React from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';

const Routes: React.FC = () => {
  const routeConfig: RouteObject[] = [
   
  ];

  const routes = useRoutes(routeConfig);
  return routes;
};

export default Routes;