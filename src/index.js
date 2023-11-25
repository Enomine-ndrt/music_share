import React from 'react';
import ReactDOM from 'react-dom/client';
import AudioPlayer from './components/AudioPlayer';
import App from './App';
//import  {Provider} from "react-redux";
//import  {Store} from "./redux/store";
import './styles/index.css';
import './styles/customize-progress-bar.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

