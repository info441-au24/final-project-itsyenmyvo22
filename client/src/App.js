import './assets/stylesheets/App.css';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Home from './screens/Home/Home';
import Profile from './screens/Profile/profile';
import Collection from './screens/Collection/collection';
import UploadProduct from './screens/UploadProduct/uploadProduct';
import Product from './screens/Product/product';

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

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;

/////////////////////////////////////

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './Home'; // Import your Home component

// function App() {
//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route path="/" element={<Home />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
