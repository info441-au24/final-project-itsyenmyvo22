import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  // Function to fetch products with or without a query
  const fetchProducts = async (query = '') => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL; // Get API URL from environment variables
      const response = await fetch(`${apiUrl}/api/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (Array.isArray(data) && data.length === 0) {
        setNoResults(true);
        setResults([]);
      } else if (Array.isArray(data)) {
        setResults(data);
        setNoResults(false);
      } else {
        throw new Error('Received non-array data');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
      setNoResults(true);
    }
  };

  // Load all products initially
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = () => {
    fetchProducts(searchQuery);
  };

  return (
    <div className="search-container">
      <h1>Search Products</h1>
      <input
        type="text"
        className="search-input"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Enter product name..."
      />
      <button className="search-button" onClick={handleSearch}>Search</button>
      <div className="results-container">
        {noResults && <p>No results found.</p>}
        {Array.isArray(results) && results.map(post => (
          <div key={post._id} className="card">
            <img src={post.url} alt={post.name} className="product-image" />
            <Link to={`product/${post._id}`}><h4>{post.name}</h4></Link>
            <p>Category: {post.category}</p>
            <p>Price: {post.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
