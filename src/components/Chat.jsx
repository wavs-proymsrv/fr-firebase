/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { IconX, IconSend2, IconMessageChatbot } from '@tabler/icons-react';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL
// const socket = io(SOCKET_URL);

const Chat = ({ userName }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);

    // useEffect(() => {
    //     socket.on('message', receiveMessage);

    //     return () => {
    //         socket.off('message', receiveMessage);
    //     };
    // }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newMessage = {
            body: message,
            from: userName
        };

        const ownMessage = {
            body: message,
            from: 'Tu'
        };

        setMessages([...messages, ownMessage]);
        // socket.emit('message', newMessage);

        setMessage('');
    };

    const receiveMessage = (message) => {
        console.log(message)
        if(message.from!==userName){
            setMessages((state) => [...state, message]);
        }
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <>
            {!isChatOpen && (
                <button
                    className="fixed bottom-4 right-4 bg-cyan-700 hover:bg-cyan-800 p-3 rounded-full shadow-lg"
                    onClick={toggleChat}
                >
                    <IconMessageChatbot className='text-white h-7 w-7' stroke={2} />
                </button>
            )}
            {isChatOpen && (
                <div className="fixed bottom-0 right-0 p-4 bg-slate-100 border-l border-t mr-4 mb-4 rounded-lg border-slate-200 shadow-lg w-80 h-96 flex flex-col justify-between">
                    <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-2">
                        <h2 className="text-lg font-semibold">Chat</h2>
                        <button onClick={toggleChat}>
                            <IconX className="text-gray-600 hover:text-red-600" stroke={2} />
                        </button>
                    </div>
                    <div className="overflow-y-auto flex-1 p-2">
                        <ul className="space-y-2 flex flex-col">
                            {messages.map((message, i) => (
                                <li
                                    key={i}
                                    className={`p-2 rounded-lg ${message.from === 'Tu' ? 'bg-cyan-700 text-white self-end w-3/4' : 'bg-gray-200 text-black self-start w-3/4'}`}
                                >
                                    <span className={`block text-xs ${message.from === 'Tu' ? 'text-cyan-200' : 'block text-xs text-gray-500'}`}>{message.from}</span>
                                    <span className="block">{message.body}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <form onSubmit={handleSubmit} className="flex items-center">
                        <input
                            type="text"
                            className="flex-1 border border-gray-300 rounded p-2"
                            placeholder="Escribe un mensaje..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button
                            className="bg-cyan-700 hover:bg-cyan-800 text-white rounded p-2 ml-2"
                            type="submit"
                        >
                            <IconSend2 stroke={2} />
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default Chat;
