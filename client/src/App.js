import './stylesheets/App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './Home.js'
import Profile from './screens/profile'
import Collection from './screens/collection'
import UploadProduct from './screens/uploadProduct';
import Product from './screens/product';

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
    <Router>
      <div>
        <nav className="navbar">
          <div className="navbar-left">
            <Link to="/" className="navbar-logo">Clé</Link>
          </div>

          <div className="nav-buttons">
            <Link to="/uploadProduct" className="nav-button">Upload Product</Link>
    
            {isLoggedIn ? (
              <>
                <Link to={`/profile/${user.userInfo.username}`} className="nav-button">Profile</Link>
                <a href="/signout" className="nav-button" id="authbutton" role="button">Sign Out</a>
              </>
              ) : (
                <a href="/signin" className="nav-button" id="authbutton" role="button">Sign In</a>
              )}
          </div> 
        </nav>

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
    </Router>
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
