import React from 'react';
import { createRoot } from 'react-dom/client';
import ScrumPokerPage from './ScrumPokerPage';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<ScrumPokerPage />);