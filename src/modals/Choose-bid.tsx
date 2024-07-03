import { useState, useEffect, FC } from "react";
import CustomButton from "../components/button/Button";
import { Modal, Alert } from "react-bootstrap";
import RadioButton from "../components/radio-button/Radio-button";
import { ChooseBidProps } from "./types";
import { AppDispatch } from "../app/store";
import { chooseBuyer } from "../features/bids/bidSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChooseBid: FC<ChooseBidProps> = ({ bidsData }) => {
  const [show, setShow] = useState(false);
  const [bids, setBids] = useState<ChooseBidProps["bidsData"]>([]);
  const [winnerId, setWinnerId] = useState<number>();
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    setBids(bidsData);
  }, [bidsData]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    if (winnerId) {
      dispatch(chooseBuyer(winnerId));
      handleClose();
      navigate("/profile", { replace: true });
    } else {
      setError("Please choose a bid");
    }
  };

  return (
    <>
      <CustomButton
        text="Choose Bid"
        onClick={handleShow}
        buttonType="primary"
        disabled={bids.length === 0}
      >
        Choose Bid
      </CustomButton>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>Choose Winner</Modal.Header>
        <Modal.Body>
          {bids.map((bid, index) => (
            <RadioButton
              key={index}
              bidder_name={bid.username as string}
              bid={bid.price}
              group_name="bids"
              onClick={() => {
                setWinnerId(bid.id), setError(null);
              }}
            />
          ))}
        </Modal.Body>
        {error && (
          <Alert key={"danger"} variant={"danger"}>
            {error}
          </Alert>
        )}
        <Modal.Footer>
          <CustomButton text="Save" onClick={handleSave} buttonType="primary" />
          <CustomButton
            text="Cancel"
            onClick={handleClose}
            buttonType="secondary"
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChooseBid;
