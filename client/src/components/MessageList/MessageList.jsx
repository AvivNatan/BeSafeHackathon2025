import Message from "../Message/Message";
import "./MessageList.css"
import PropTypes from 'prop-types';

const MessageList = ({messages}) => {
    return (
        <div className="messages-container">
            {messages.map((message, index) => {
                return ( <Message 
                    key={index}
                    text={message.text}
                    isUserSender={message.isUserSender}
                    isSuspicious={message.isSuspicious}/>
                );}
            )}
        </div>
    );
}; 

MessageList.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            isUserSender: PropTypes.bool.isRequired,
            isSuspicious: PropTypes.bool.isRequired,
        })
    ).isRequired,
};
export default MessageList;