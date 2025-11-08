import React from 'react';

const Card = ({ title, data, highlightClass = 'data-highlight', children }) => {
    return (
        <div className="card">
            {title && <h3>{title}</h3>}
            {data && <p className={highlightClass}>{data}</p>}
            {children}
        </div>
    );
};

export default Card;
