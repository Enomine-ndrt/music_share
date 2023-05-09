import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import AudioPlayer from './components/AudioPlayer';
import Artist from './pages/Artist/Artist';
import Albums from './pages/Albums/Albums';
import Register from './pages/RegisterArtist/Register';
import RegisterAlbum from './pages/RegisterAlbum/RegisterAlbum';
import  {Provider} from "react-redux";
import  {Store} from "./redux/store";


  function App() {
  return (
    <Router>
        <Provider store={Store}>
            <Routes>
                <Route exact path="/" element={<Artist />} />
                <Route exact path="/albums" element={<Albums />} />
                <Route exact path="/player" element={<AudioPlayer />} />
                <Route exact path="/Register" element={<Register />} />
                <Route exact path="/RegisterAlbum" element={<RegisterAlbum />} />
            </Routes>
        </Provider>
  </Router>
  )
}

export default App;
