import { useContext } from "react";
import MessageInput from "../../components/MessageInput/MessageInput";
import MessageList from "../../components/MessageList/MessageList";
import "./ChatPage.css";
import { MessagesContext } from "../../context/MessagesContext";


const Chat = () => {
    const {messages, onSendMessage} = useContext(MessagesContext)
    return (
        <div className="chat-page">
            <MessageList messages={messages} /> 
            <MessageInput onSendMessage={onSendMessage} />
        </div>
    );
}
export default Chat;
