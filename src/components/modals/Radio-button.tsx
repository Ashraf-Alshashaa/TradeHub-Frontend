import { useState } from 'react';
import CustomButton from '../button/Button';
import Modal from 'react-bootstrap/Modal';

function ChooseWinner() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <CustomButton text="Choose Winner" onClick={handleShow} buttonType='primary'>
        Launch static backdrop modal
      </CustomButton>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Do not even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <CustomButton text="Save" onClick={handleClose} buttonType='primary'/>
          <CustomButton text="Cancel" onClick={handleClose} buttonType='secondary' >Understood</CustomButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChooseWinner;