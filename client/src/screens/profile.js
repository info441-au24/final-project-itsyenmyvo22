import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
    return (
        <div>
            <h1>This is the profile page</h1>
            <Link to="/uploadProduct">Go to upload product</Link>
        </div>
    );
};

export default Profile;