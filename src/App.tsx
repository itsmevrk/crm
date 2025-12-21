// import React from 'react';
// import Routes from './Routes';


// const App: React.FC = () => {
//   return (
//       <Routes />
//   );
// };

// export default App;

import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App

