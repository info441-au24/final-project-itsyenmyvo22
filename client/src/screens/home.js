// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const Home = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get query parameter from the URL
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const query = params.get('query');
//     if (query) {
//       setSearchQuery(query); // Set the query to the input field
//       fetchPosts(query); // Fetch posts based on the query
//     }
//   }, [location]);

//   // Handle change in the search input
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Fetch posts based on the search query
//   const fetchPosts = async (query) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`/api/v1/posts/search?query=${encodeURIComponent(query)}`);
//       const data = await response.json();
//       if (response.ok) {
//         setPosts(data);
//       } else {
//         setPosts([]);
//       }
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle form submission (update URL and fetch posts)
//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (!searchQuery) return;
//     // Update the URL with the search query
//     navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
//   };

//   return (
//     <div>
//       <h1>Search Products</h1>
//       <form onSubmit={handleSearchSubmit}>
//         <input
//           type="text"
//           placeholder="Search by product name"
//           value={searchQuery}
//           onChange={handleSearchChange}
//         />
//         <button type="submit">Search</button>
//       </form>

//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div>
//           {posts.length > 0 ? (
//             posts.map((post) => (
//               <div key={post._id} className="post">
//                 <h2>{post.name}</h2>
//                 <p>Category: {post.category}</p>
//                 <p>Price: ${post.price}</p>
//               </div>
//             ))
//           ) : (
//             <div>No posts found</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;
