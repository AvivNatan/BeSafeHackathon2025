import { createContext, useState, useEffect } from "react";
import api from '../services/api';
import PropTypes from 'prop-types';

const MessagesContext = createContext();

const MessagesProvider = ({ children }) => {
  

    const userId = "aviv@gmail.com" // just for now
    const [messages, setMessages] = useState([]);

    // when userID change i need to fetch the history messages and show them 
    useEffect(() => {
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
        //try {
            const timestamp = new Date();
            const newUserMessage = { userId, message,timestamp, isUserMessage: true} //create userMsg object, isSuspicious=null
            setMessages(prevMessages => [...prevMessages, newUserMessage]); // add the new userMsg
            const serverResponse = await api.post('/api/messages/send',newUserMessage);
            setMessages(prevMessages => [...prevMessages, serverResponse.data.websiteResponse]); // add the new serverMsg
       // }
       // catch (error) {
      //      console.error('Error fetching server Response', error.message);
       // }

       




        /*
        const serverResponseData = await sendMessageToServerForAnalyze(text); //send to server to get response
        const newServerMessage = {
            userId:serverResponse.websiteResponse.userId,
            message:serverResponse.websiteResponse.message,
            timestamp:serverResponse.websiteResponse.timestamp,
            isUserMessage: serverResponse.websiteResponse.isUserMessage, //create serverMsg object
            isSuspicious: serverResponse.websiteResponse.isSuspicious
        }

        await saveMessageInHistory(newUserMessage);
        await saveMessageInHistory(newServerMessage); // meybe not separated
        */
    };


/*
    const saveMessageInHistory = async (message) => {
        try {
            await api.post('/ducks/saveMessage', message)  // here add the endpoint to save msg to the historyDB 
        }
        catch (error) {
            console.error('Error saving the message in history', error);
        }

    };

    const sendMessageToServerForAnalyze = async (textMsg) => {
        try {
            const serverResponse = await api.post('/ducks', textMsg);
            const data = await serverResponse.json();
            return data;
        }
        catch (error) {
            return { text: "Error analyzing message:" + error.message, isSuspicious: true };  // if cant analyzing will send a error msg and show it
        }
    };
*/
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

//claudes code:
/*import { createContext, useState, useEffect } from "react";
import api from '../services/api';  // This is your axiosInstance
import PropTypes from 'prop-types';

const MessagesContext = createContext();

const MessagesProvider = ({children})=> {
    const userID = "user1" // just for now
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        getMessagesHistory();
    }, [userID]);
    
    const getMessagesHistory = async () => {
        try {
            // Using your API routes
            const response = await api.get(`/history/${userID}`);
            const formattedMessages = response.data.MessageHistory.flatMap(msgGroup => 
                msgGroup.map(msg => ({
                    text: msg.message,
                    isUserSender: msg.isUserMessage,
                    isSuspicious: msg.analysisResult?.isSuspicious ?? null,
                    userID: msg.userId
                }))
            );
            setMessages(formattedMessages);
        } catch (error) {
            console.error('Error fetching the messages history', error);
        }
    };

    const onSendMessage = async (text) => {
        // Create message object for frontend display
        const newUserMessage = {
            text,
            isUserSender: true,
            isSuspicious: null,
            userID
        }
        
        // Optimistically add message to UI
        setMessages(prevMessages => [...prevMessages, newUserMessage]);

        try {
            // Send to your backend endpoint
            const response = await api.post('/send', {
                userId: userID,
                message: text
            });

            const { userMessage, websiteResponse } = response.data;

            // Transform website response to frontend format
            const formattedServerMessage = {
                text: websiteResponse.message,
                isUserSender: false,
                isSuspicious: websiteResponse.analysisResult?.isSuspicious ?? null,
                userID
            }

            // Update with server response
            setMessages(prevMessages => {
                // Remove optimistic message and add confirmed messages
                const withoutOptimistic = prevMessages.slice(0, -1);
                return [...withoutOptimistic, 
                    {
                        text: userMessage.message,
                        isUserSender: true,
                        isSuspicious: userMessage.analysisResult?.isSuspicious ?? null,
                        userID: userMessage.userId
                    },
                    formattedServerMessage
                ];
            });

        } catch (error) {
            console.error('Error sending message:', error);
            // Remove optimistic update and show error
            setMessages(prevMessages => {
                const withoutOptimistic = prevMessages.slice(0, -1);
                return [...withoutOptimistic, {
                    text: "Error sending message. Please try again.",
                    isUserSender: false,
                    isSuspicious: true,
                    userID
                }];
            });
        }
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

The flow is now:

User sends message
Frontend immediately displays the user message
Backend:

Receives message
Analyzes it
Saves both user message and response
Returns both with analysis results


Frontend:

Receives the response
Displays the server's response message
Messages are colored based on suspiciousness



The frontend maintains its display format while the backend handles all the processing and storage. The transformation between backend and frontend formats happens in the MessagesProvider component.*/