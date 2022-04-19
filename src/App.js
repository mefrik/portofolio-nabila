import './App.css';
import React from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from './Page/Home';
import Login from './Page/Login';
import Dashboard from '../src/Component/Dashboard/Dashboard';
import Comic from './Page/MyArts/Comic/ArtsComic'
import NFT from './Page/MyArts/NFT/ArtsNFT';
import Gallery3D from './Page/MyArts/3D/Arts3D';
import DetailProject from './Page/Project/DetailProject';


function App() {
  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard/*' element={<Dashboard />} />
          <Route path='/comic' element={<Comic />} />
          <Route path='/nft' element={<NFT />} />
          <Route path='/3d' element={<Gallery3D />} />
          <Route path='/project/:id' element={<DetailProject />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
