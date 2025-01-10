import { createContext, useState,useEffect } from "react";
import api from '../services/api';
import PropTypes from 'prop-types';

const MessagesContext = createContext();

const MessagesProvider = ({children})=> {

    const userID= "user1" // just for now
    const [messages, setMessages] = useState([]);
    
    // when userID change i need to fetch the history messages and show them 
    useEffect(() => {
        getMessagesHistory();
    }, [userID]);
    
    // function to fetch the history massages of the user
     const getMessagesHistory = async () => {
        try {
            const response = await api.get('/ducks/messages'); //change this according ?userID=${userID}
            setMessages(response.data.messages);
        } catch (error) {
            console.error('Error fetching the messages history', error);
        }
    };

    const onSendMessage = async (text) => {
        const newUserMessage = {text, isUserSender: true, isSuspicious: null, userID} //create userMsg object
        setMessages(prevMessages => [...prevMessages, newUserMessage]); // add the new userMsg
           
        const serverResponseData = await sendMessageToServerForAnalyze(text); //send to server to get response

        const newServerMessage = {text: serverResponseData.text, isUserSender: false, //create serverMsg object
            isSuspicious: serverResponseData.isSuspicious, userID}
       setMessages(prevMessages => [...prevMessages, newServerMessage]); // add the new serverMsg

       await saveMessageInHistory(newUserMessage);
       await saveMessageInHistory(newServerMessage); // meybe not separated
    };

    const saveMessageInHistory = async (message) => {
        try{
            await api.post('/ducks/saveMessage', message)  // here add the endpoint to save msg to the historyDB 
        }
        catch (error) {
            console.error('Error saving the message in history', error);
        }

    };

    const sendMessageToServerForAnalyze = async (textMsg) => {
        try{
            const serverResponse = await api.post('/ducks',textMsg);
            const data = await serverResponse.json();
            return data; 
        }
        catch (error){ 
            return { text: "Error analyzing message:" + error.message, isSuspicious: true };  // if cant analyzing will send a error msg and show it
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
export {MessagesContext, MessagesProvider};