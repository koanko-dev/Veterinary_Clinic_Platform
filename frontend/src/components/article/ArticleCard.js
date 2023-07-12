import React from 'react';

const ArticleCard = ({id, title, clinicName, category, created_at, onClink}) => {
    return (
        <section onClick={() => onClink(id)}>
            <h3>{title}</h3>
            <span>{clinicName}/{category}/{created_at}</span>
        </section>
    );
};

export default ArticleCard;