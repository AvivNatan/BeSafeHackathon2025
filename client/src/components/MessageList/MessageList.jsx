import Message from "../Message/Message";
import "./MessageList.css"
import PropTypes from 'prop-types';

const MessageList = ({messages}) => {
    return (
        <div className="messages-container">
            {messages.map((message, index) => {
                return ( <Message 
                    key={index}
                    message={message.message}
                    timestamp={message.timestamp}
                    isUserMessage={message.isUserMessage}
                    isSuspicious={message.isSuspicious}/>
                );}
            )}
        </div>
    );
}; 

MessageList.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            message: PropTypes.string.isRequired,
            timestamp:PropTypes.instanceOf(Date).isRequired,
            isUserSender: PropTypes.bool.isRequired,
            isSuspicious: PropTypes.bool.isRequired,
        })
    ).isRequired,
};
export default MessageList;