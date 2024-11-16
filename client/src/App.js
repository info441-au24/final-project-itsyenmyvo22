import logo from './logo.svg';
import './stylesheets/App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './screens/home'
import Profile from './screens/profile'
import UploadProduct from './screens/uploadProduct';
import Product from './screens/product';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/uploadProduct" element={<UploadProduct />} />
        <Route path="/product" element={<Product />} />
      </Routes>
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
