import { FC, useState } from 'react';
import Toast from 'react-bootstrap/Toast';

type NotificationProps = {
    message: string;
    onClick: () => void;
    show: boolean;
};

const Notification: FC<NotificationProps> = ({ message, onClick, show }) => {

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

    const [showToast, setShowToast] = useState(show);

    const toggleShow = () => {
        setShowToast(!showToast);
    };

    return (
        <Toast show={showToast} onClose={toggleShow}>
            <Toast.Header>
                <strong className="me-auto">Notification</strong>
                <small>{timeAgo(date)}</small>
            </Toast.Header>
            <Toast.Body style={{ cursor: 'pointer' }} onClick={onClick}>
                {message}
            </Toast.Body>
        </Toast>
    );
};

export default Notification;
