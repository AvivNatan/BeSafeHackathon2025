import { createContext, useState, useEffect, useContext } from "react";
import api from '../services/api';
import PropTypes from 'prop-types';
import { UserContext } from './UserContext';

const MessagesContext = createContext();

const MessagesProvider = ({ children }) => {
  
    const { userId } = useContext(UserContext);

    // const userId = "aviv@gmail.com" // just for now
    const [messages, setMessages] = useState([]);

    // when userID change i need to fetch the history messages and show them 
    useEffect(() => {
        window.scrollTo(0, 0);
        getMessagesHistory();
    }, [userId]);

    // function to fetch the history massages of the user
    const getMessagesHistory = async () => {
        try {
            const response = await api.get(`/api/messages/history/${userId}`);
           
            if(response.data.MessageHistory && Object.keys(response.data.MessageHistory).length > 0)
            {
                const formattedMessages = Object.values(response.data.MessageHistory)
                .flatMap(msgGroup => 
                    msgGroup.map(msg => ({
                        userId: msg.userId,
                        message: msg.message,
                        timestamp: msg.timestamp,
                        isUserMessage: msg.isUserMessage,
                        isSuspicious: msg.isSuspicious ?? null
                    }))
                ).reverse();
                setMessages(formattedMessages);
            }
        } catch (error) {
            console.error('Error fetching the messages history', error);
        }
    };

    const onSendMessage = async (message) => {
       
            const timestamp = new Date();
            const newUserMessage = { userId, message,timestamp, isUserMessage: true} //create userMsg object, isSuspicious=null
            setMessages(prevMessages => [...prevMessages, newUserMessage]); // add the new userMsg
            const serverResponse = await api.post('/api/messages/send',newUserMessage);
            setMessages(prevMessages => [...prevMessages, serverResponse.data.websiteResponse]); // add the new serverMsg

    };

    return (
        <MessagesContext.Provider value={{ messages, onSendMessage }}>
            {children}
        </MessagesContext.Provider>
    );

};

MessagesProvider.propTypes = {
    children: PropTypes.node.isRequired
};
export { MessagesContext, MessagesProvider };

