import React, { useState } from 'react';
import { IconMessageChatbot } from '@tabler/icons-react';
import Chat from './Chat'; // Importa el componente Chat

const ChatButton = ({ userName }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleChatClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                className="fixed bottom-4 right-4 bg-cyan-700 hover:bg-cyan-800 p-3 rounded-full shadow-lg"
                onClick={handleChatClick}
            >
                <IconMessageChatbot className='text-white h-7 w-7' stroke={2} />
            </button>
            {isOpen && <Chat userName={userName} />}
        </>
    );
};

export default ChatButton;