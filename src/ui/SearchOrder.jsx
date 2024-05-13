import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchOrder = () => {
    const [query, setQuery] = useState();
    const navigate = useNavigate();
    const handleSubmit = (e)=> {
        e.preventDefault();
        if (!query) return;
            navigate(`/order/${query}`);
    }
    return (
        <form onSubmit={handleSubmit}>
            <input 
                placeholder='Search order #'
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="
                    w-28 px-4 py-2 
                    sm:w-64
                    rounded-full 
                    placeholder:text-stone-400
                    sm:focus:w-72
                    focus:outline-none
                    focus:ring
                    focus:ring-yellow-200
                    transition-all
                    duration-300
                "
            />
        </form>
    );
};

export default SearchOrder;