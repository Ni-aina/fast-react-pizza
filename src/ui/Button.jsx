import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, disabled, to, type, onClick }) => {
    const base = "inline-bock text-sm bg-yellow-400 font-semibold uppercase tracking-wide"
    + " rounded-full text-stone-800 hover:bg-yellow-300 transition-colors"
    + " duration-300 focus:outline-none focus:ring focus:ring-yellow-300" 
    + " focus:ring-offset-2 disabled:cursor-not-allowed"

    const styles = {
        primary: base + " px-4 py-3 md:px-6 md:py-4",
        secondary: "inline-bock text-sm font-semibold uppercase tracking-wide border-2 border-stone-300"
        + " rounded-full text-stone-800 hover:bg-stone-200 transition-colors"
        + " duration-300 focus:outline-none focus:ring focus:ring-stone-300" 
        + " focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5",
        small: base + " px-4 py-2 md:px-5 md:py-2 text-small",
        round: base + " px-2.5 py-1 md:px-3.5 md:py-2 text-sm"
    }

    if (to)
        return (
            <Link to={to} className={styles[type]}>{ children }</Link>
        );

    if (onClick)
        return (
            <button 
                onClick={onClick}
                disabled={disabled}
                className={styles[type]}
              >
                { children }
              </button>
        );

    return (
        <button 
            disabled={disabled}
            className={styles[type]}
          >
            { children }
          </button>
    );
};

export default Button;