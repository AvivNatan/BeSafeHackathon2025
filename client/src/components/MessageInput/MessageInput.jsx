import { useState } from "react";
import "./MessageInput.css"
import FirstButton from "../common/FirstButton/FirstButton";

//Props onSendMessage is function to start when user hit send button 
//This function need to send the msg to server 
const MessageInput = (onSendMessage ) => { 
    const [messageInput, setMessageInput] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    const handleMessageInputChange = (e) => { 
        setMessageInput(e.target.value); // update the messageInput according to the input
    };

    const handleSendMessageInput = async () =>{
        if(messageInput.trim()) // check if new Messageinput not empty
        {
            setIsDisabled(true);
            await onSendMessage(messageInput); // send to the server the new msg
            setMessageInput(""); // delete the msg from the input
            setIsDisabled(false);
        }
        // if not meybe show error
    };

    return (
        <div className="msgInput-container">
            <input
                type="text"
                className="input-container"
                value={messageInput}
                onChange={handleMessageInputChange}
                placeholder="type message here..." 
                disabled={isDisabled} // the input text will be disable according to state
            />
             <FirstButton onClick={handleSendMessageInput} disabled={isDisabled}>Send</FirstButton>
        </div>
    );
};

export default MessageInput;
