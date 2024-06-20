import { useState } from 'react';
import CustomButton from '../button/Button';
import Modal from 'react-bootstrap/Modal';
import RadioButton from '../radio-button/Radio-button';


const names = ['user1', 'user2', 'user3', 'user4', ]
const bids = [12.3 , 14, 23, 30]

function ChooseWinner() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isWinner = () => {alert('Winner!');
  };

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
            Choose Winner
        </Modal.Header>
        <Modal.Body>
           <RadioButton bidder_name='user1' bid={23.3} group_name='one' onClick={isWinner}/>
           <RadioButton bidder_name='user2' bid={28.3} group_name='one' onClick={isWinner}/>
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