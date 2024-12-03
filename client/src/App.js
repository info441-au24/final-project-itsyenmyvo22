import './stylesheets/App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home.js'
import Profile from './screens/profile'
import Collection from './screens/collection.js'
import UploadProduct from './screens/uploadProduct';
import Product from './screens/product';

const handleSignIn = async () => {
  try {
    const response = await fetch(`/signin`, {
      method: 'GET'
    });
    if (response.ok) {
      console.log('Signed in successfully');
    } else {
        console.error('Failed to sign in');
    }
  } catch (error) {
      console.error('Error:', error);
  }
};

const handleSignOut = async () => {
  try {
    const response = await fetch(`/signout`, {
      method: 'GET'
    });
    if (response.ok) {
      console.log('Signed out successfully');
    } else {
        console.error('Failed to sign out');
    }
  } catch (error) {
      console.error('Error:', error);
  }
};

const App = () => {

  return (
    <Router>
      <div>
        <nav className="navbar">
          <div className="navbar-left">
            <Link to="/" className="navbar-logo">Clé</Link>
          </div>

          <div className="nav-buttons">
            <Link to="/uploadProduct" className="nav-button">Upload Product</Link>
            <Link to="/profile" className="nav-button">Profile</Link>
            <a onClick={handleSignIn} className="nav-button" id="authbutton" role="button">Sign In</a>
            <a onClick={handleSignOut} className="nav-button" id="authbutton" role="button">Sign Out</a>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/uploadProduct" element={<UploadProduct />} />
          <Route path="/product/:productID" element={<Product />} />
          <Route path="/search" element={<Home />} />
          {/* <Route path="*" element={<h1>404 - Not Found</h1>} /> */}
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
