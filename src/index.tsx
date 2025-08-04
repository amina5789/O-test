import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { FolderProvider } from './context/FolderContext';
import { SelectedFileProvider } from './context/SelectedFileContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <SelectedFileProvider>
      <FolderProvider>
        <App />
      </FolderProvider>
    </SelectedFileProvider>
);
