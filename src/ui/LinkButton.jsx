import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LinkButton = ({ children, to }) => {

    const className="text-blue-500 hover:text-blue-600";
    const navigate = useNavigate();

    if (to === "-1")
        return(
            <button className={className} onClick={() => navigate(-1)}>{ children }</button>
        )

    return (
        <Link to={to} className={className}>{ children }</Link>
    );
};

export default LinkButton;