import * as React from 'react';
import { render } from 'react-dom';
import { DragDropContextProvider } from 'react-dnd';
import Html5Backend from 'react-dnd-html5-backend';
import App from './app';
import Board from './board';

const root = document.getElementById('root');

render((
  <DragDropContextProvider backend={Html5Backend}>
    <App />
  </DragDropContextProvider>
), root);
