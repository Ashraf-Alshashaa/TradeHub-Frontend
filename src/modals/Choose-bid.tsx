import { useState, useEffect } from 'react';
import CustomButton from '../components/button/Button';
import Modal from 'react-bootstrap/Modal';
import RadioButton from '../components/radio-button/Radio-button';


const initialBids = [
  { bidder_name: 'user1', bid: 12.3 },
  { bidder_name: 'user2', bid: 14 },
  { bidder_name: 'user3', bid: 23 },
  { bidder_name: 'user4', bid: 30 }
];

function ChooseBid() {
  const [show, setShow] = useState(false);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    //HERE WE DISPATCH
    setBids(initialBids);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    //PUT REQUEST TO BID STATE
    console.log("Save clicked");
    handleClose();
  };

  const isWinner = (bidderName) => {
    // I just added here so we see who is chosen.
    console.log(`${bidderName} chosen as winner`);
  };

  return (
    <>
      <CustomButton text="Choose Bid" onClick={handleShow} buttonType='primary'>
        Choose Bid
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
          {bids.map((bid, index) => (
            <RadioButton
              key={index}
              bidder_name={bid.bidder_name}
              bid={bid.bid}
              group_name='bids'
              onClick={() => isWinner(bid.bidder_name)}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <CustomButton text="Save" onClick={handleSave} buttonType='primary'/>
          <CustomButton text="Cancel" onClick={handleClose} buttonType='secondary'/>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChooseBid;
