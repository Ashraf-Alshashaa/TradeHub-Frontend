import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { FC, useState } from 'react';

type NotificationProps = {
    message: string[];
    onClick: () => void;
}

const Notification: FC<NotificationProps> = ({ message, onClick }) => {

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

        const daysAgo = Math.floor(hoursAgo / 24);
        return `${daysAgo} days ago`;
    }

    const date = new Date();
    const [show, setShow] = useState(Array(message.length).fill(true));

    const toggleShow = (index: number) => {
        setShow(show.map((s, i) => (i === index ? !s : s)));
    };

    return (
        <ToastContainer position='bottom-end' className='position-fixed m-4' style={{ zIndex: 1 }}>
            {message.map((msg, index) => (
                <Toast key={index} show={show[index]} onClose={() => toggleShow(index)}>
                    <Toast.Header>
                        <strong className="me-auto">Notification</strong>
                        <small>{timeAgo(date)}</small>
                    </Toast.Header>
                    <Toast.Body style={{ cursor: 'pointer' }} onClick={onClick}>
                        {msg}
                    </Toast.Body>
                </Toast>
            ))}
        </ToastContainer>
    );
}

export default Notification;
