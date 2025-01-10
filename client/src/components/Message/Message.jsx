import "./Message.css";
import PropTypes from 'prop-types';

const Message = ({text, isUserSender, isSuspicious}) => {  //props message={text, isUserSender, isSuspicious}

    const msgSenderClass = isUserSender == true ? "userMsg" : "serverMsg"
    const msgSuspiciousClassForServer = isUserSender ? "" : (isSuspicious ? "suspiciousMsg" : "safeMsg");
    return(
        <div className={`message ${msgSenderClass} ${msgSuspiciousClassForServer}`}>
             {text}
        </div>
    );
};

Message.propTypes = {
    text: PropTypes.string.isRequired,
    isUserSender: PropTypes.bool.isRequired,
    isSuspicious: PropTypes.bool.isRequired
};

export default Message;
