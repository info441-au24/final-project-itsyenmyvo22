import React, { useState, useEffect, useCallback } from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [priceFilter, setPriceFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;

  // Function to fetch products with or without a query
  const fetchProducts = useCallback(async () => {
    const queryParameters = [];
    if (searchQuery) queryParameters.push(`query=${encodeURIComponent(searchQuery)}`);
    if (priceFilter) queryParameters.push(`price=${encodeURIComponent(priceFilter)}`);
    if (categoryFilter) queryParameters.push(`category=${encodeURIComponent(categoryFilter)}`);

    const url = `${apiUrl}/api/search?${queryParameters.join('&')}`;

    try {
      // const apiUrl = process.env.REACT_APP_API_URL; // Get API URL from environment variables
      // const apiUrl = "http://localhost:3001"
      const response = await fetch(url);
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
  },[apiUrl, searchQuery, priceFilter, categoryFilter]);

  // Load all products initially
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = () => {
    fetchProducts();
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

      <div className="filters-container">
        <select className="filter-input" value={priceFilter} onChange={e => setPriceFilter(e.target.value)}>
          <option value="">Select Price Range</option>
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
        </select>
        <select className="filter-input" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Moisturiser">Moisturiser</option>
          <option value="Serum">Serum</option>
          <option value="Oil">Oil</option>
          <option value="Mist">Mist</option>
          <option value="Balm">Balm</option>
          <option value="Mask">Mask</option>
          <option value="Peel">Peel</option>
          <option value="Eye Care">Eye Care</option>
          <option value="Cleanser">Cleanser</option>
          <option value="Toner">Toner</option>
          <option value="Exfoliator">Exfoliator</option>
          <option value="Bath Salts">Bath Salts</option>
          <option value="Body Wash">Body Wash</option>
          <option value="Bath Oil">Bath Oil</option>
        </select>
      </div>
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
