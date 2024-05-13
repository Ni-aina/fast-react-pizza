import React from 'react';
import { Link } from 'react-router-dom';
import SearchOrder from './SearchOrder';
import UserName from '../features/user/UserName';

const Header = () => {
    return (
        <header className="
            flex
            items-center
            justify-between
            bg-yellow-500 
            px-4 py-3 
            sm:px-6 
            border-b 
            border-stone-200 
            uppercase
        ">
            <Link to="/" className="tracking-widest">
                Fast react pizza co.
            </Link>
            <SearchOrder />
            <UserName />
        </header>
    );
};

export default Header;