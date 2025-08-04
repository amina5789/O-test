import React from 'react';
import Home from './pages/Home/Home';
import { SelectedFileProvider } from './context/SelectedFileContext';

const App: React.FC = () => {
  return (
    <SelectedFileProvider>
      <Home />
    </SelectedFileProvider>
  );
};

export default App;
