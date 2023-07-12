import React from 'react';

const ReviewCard = ({username, title, rating, created_at, content, onShow}) => {

    return (
        <section onClick={onShow}>
            <h3>{title}</h3>
            <span>{username}/{rating}/{created_at}</span>
            <p>{content}</p>
        </section>
    );
};

export default ReviewCard;