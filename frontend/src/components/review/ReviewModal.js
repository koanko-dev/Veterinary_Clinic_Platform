import React from 'react';
import Modal from '../UI/Modal';

const ReviewModal = ({onClose, review}) => {
    return (
        <Modal onClose={onClose}>
            ReviewModal
            <p>{review.title}</p>
            <p>{review.content}</p>
        </Modal>
    );
};

export default ReviewModal;