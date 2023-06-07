import React from 'react';
import Modal from 'react-bootstrap/Modal';
import CommonButton from '../CommonButton/CommonButton';

const CommonDeleteModal = ({ show, onHide, handleDeleteModalClose, modalname, modaltitle, handleDeleteTask, loading }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">{modaltitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <p>{modalname}</p>
      </Modal.Body>
      <Modal.Footer>
        <CommonButton variant="secondary" onClick={handleDeleteModalClose} name={'Cancel'} />
        <CommonButton loading={loading} variant="danger" onClick={handleDeleteTask} name={'Delete'} />
      </Modal.Footer>
    </Modal>
  );
};

export default CommonDeleteModal;