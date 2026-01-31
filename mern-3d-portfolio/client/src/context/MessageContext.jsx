import { createContext, useState, useContext, useCallback } from 'react';
import axios from '../api/axios';
import toast from 'react-hot-toast';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchMessages = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/messages');
            setMessages(res.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error('Failed to load messages');
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteMessage = async (id) => {
        try {
            await axios.delete(`/api/messages/${id}`);
            setMessages(messages.filter(m => m._id !== id));
            toast.success('Message deleted');
        } catch (error) {
            toast.error('Failed to delete message');
        }
    };

    const markAsRead = async (id) => {
        try {
            const res = await axios.put(`/api/messages/${id}/read`);
            setMessages(messages.map(m => m._id === id ? res.data : m));
        } catch (error) {
            toast.error('Failed to update message');
        }
    };

    const sendMessage = async (data) => {
        try {
            await axios.post('/api/messages', data);
            return true;
        } catch (error) {
            return false;
        }
    };

    return (
        <MessageContext.Provider value={{
            messages,
            loading,
            fetchMessages,
            deleteMessage,
            markAsRead,
            sendMessage
        }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessages = () => useContext(MessageContext);
