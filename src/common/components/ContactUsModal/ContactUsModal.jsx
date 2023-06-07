import React, { useState } from 'react'
import { Modal, Form } from 'react-bootstrap';
import CommonButton from '../CommonButton/CommonButton';
import CommonInput from '../CommonInput/CommonInput';
import CommonTextArea from '../CommonTextArea/CommonTextArea';
import '../ContactUsModal/ContactUs.css'

const ContactUsModal = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const playButtonClickSound = () => {
    const audio = new Audio('https://res.cloudinary.com/dxsbqtt6y/video/upload/v1685037112/gp3adsdsrpvlt10nt132.mp3');
    audio.play();
  };

  const handleButtonClick = () => {
    handleShow();
    playButtonClickSound();
  }

  return (
    <>
      <CommonButton
        classname={'button__contact-us'}
        onClick={handleButtonClick}
        name={'Contact Us'}
        variant={'success'}
      />
      <Modal show={show} size='sm' onHide={handleClose}>
        <Modal.Header closeButton>
          Got Any Questions? Send Us A Request
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Your Email address</Form.Label>
              <CommonInput
                type={'email'}
                placeholder={"exapmle@example.com"}
              />
            </Form.Group>

            <CommonTextArea
              label={'Your Question'}
              rows={5}
            />

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <CommonButton
            variant={'secondary'}
            name="Close"
            onClick={handleClose}
          />
          <CommonButton
            variant={'primary'}
            type={'submit'}
            name="Send"
            onClick={handleClose}
          />
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ContactUsModal