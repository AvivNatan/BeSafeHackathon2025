import "./Message.css";
import PropTypes from 'prop-types';

const Message = ({message, isUserMessage,timestamp, isSuspicious}) => { 

    const msgSenderClass = isUserMessage == true ? "userMsg" : "serverMsg"
    const msgSuspiciousClassForServer = isUserMessage ? "" : (isSuspicious ? "suspiciousMsg" : "safeMsg");
    return(
        <div className={`message ${msgSenderClass} ${msgSuspiciousClassForServer}`}>
            <p className="message-text">{message}</p>
            <span className="message-timestamp">
                {timestamp instanceof Date ? timestamp.toLocaleString() : new Date(timestamp).toLocaleString()}
            </span>
        </div>
    );
};

Message.propTypes = {
    message: PropTypes.string.isRequired,
    isUserMessage: PropTypes.bool.isRequired,
    timestamp: PropTypes.instanceOf(Date).isRequired,
    isSuspicious: PropTypes.bool
};

export default Message;
