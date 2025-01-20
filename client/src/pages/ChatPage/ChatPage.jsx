import { useContext } from "react";
import MessageInput from "../../components/MessageInput/MessageInput";
import MessageList from "../../components/MessageList/MessageList";
import "./ChatPage.css";
import { MessagesContext } from "../../context/MessagesContext";
import { useEffect } from 'react';


const Chat = () => {
    useEffect(() => {
        window.scrollTo(0, 80);
      }, []);
    
    const {messages, onSendMessage} = useContext(MessagesContext)
    return (
        <div className="chat-page">
            <MessageList messages={messages} /> 
            <MessageInput onSendMessage={onSendMessage} />
        </div>
    );
}
export default Chat;
