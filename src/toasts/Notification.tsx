import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'
import { FC, useState } from 'react';

type Notification = {
    message: string | undefined;
    onClick: () => void;
}

const Notification: FC<Notification> = ({message, onClick}) => {

    function timeAgo(pastDate: Date): string {
    const now = new Date();
    const secondsAgo = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

    if (secondsAgo < 60) {
        return `${secondsAgo} seconds ago`;
    }

    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) {
        return `${minutesAgo} minutes ago`;
    }

    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) {
        return `${hoursAgo} hours ago`;
    }
  }
const date = new Date();


const [show, setShow] = useState(true);

  const toggleShow = () => setShow(!show);

  return (

    <ToastContainer position='bottom-end' className='position-fixed m-4' style={{ zIndex: 1 }}>
    <Toast show={show} onClose={toggleShow}>
      <Toast.Header>
        <strong className="me-auto">Notification</strong>
        <small>{timeAgo(date)}</small>
      </Toast.Header>
      <Toast.Body style={{ cursor: 'pointer' }} onClick={onClick}>{message}</Toast.Body>
    </Toast>
    </ToastContainer>
  );
}

export default Notification;