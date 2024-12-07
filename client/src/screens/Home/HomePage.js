import React, { useState, useEffect } from 'react';
import ProductPreview from './ProductPreview';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [priceFilter, setPriceFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [priceFilter, categoryFilter]);

  const fetchProducts = async () => {

    const queryParameters = [];
    if (searchQuery) queryParameters.push(`query=${encodeURIComponent(searchQuery)}`);
    if (priceFilter) queryParameters.push(`price=${encodeURIComponent(priceFilter)}`);
    if (categoryFilter) queryParameters.push(`category=${encodeURIComponent(categoryFilter)}`);

    try {
      const response = await fetch(`/api/v1/posts/search?${queryParameters.join('&')}`);
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
  const handleSearch = (e) => {
    e.preventDefault()
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
        {Array.isArray(results) && results.map(product => (
          <ProductPreview product={product}/>
        ))}
      </div>
    </div>
  );
};

export default Home;
