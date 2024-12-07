import './assets/stylesheets/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Home from './screens/Home/HomePage';
import Profile from './screens/Profile/ProfilePage';
import Collection from './screens/Collection/CollectionPage';
import UploadProduct from './screens/UploadProduct/UploadProductPage';
import Product from './screens/Product/ProductPage';

function PrivateRoute({ element, isLoggedIn }) {
  return isLoggedIn ? element : <Navigate to="/" />;
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [user, setUser] = useState({status: "loggedout"});

  useEffect(() => {
    const loadIdentity = async () => {
      try {
        const response = await fetch('/api/v1/users/myIdentity');
        const identityInfo = await response.json();
        if (identityInfo.status === 'loggedin') {
          setIsLoggedIn(true);
          setUser(identityInfo);
        } else {
          setUser(null)
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error loading identity:', error);
        setIsLoggedIn(false);
      }
    };
    loadIdentity();
  }, []);

  return (
      <div>
        <NavBar user={user}/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:username" element={<PrivateRoute element={<Profile user={user} />} isLoggedIn={isLoggedIn} />}/>          
          <Route path="/collection/:collectionID" element={<PrivateRoute element={<Collection user={user} />} isLoggedIn={isLoggedIn } />}/> 
          <Route path="/uploadProduct" element={<UploadProduct />} />
          <Route path="/product/:productID" element={<Product user={user}/>} />
          <Route path="/search" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
  );
};

export default App;