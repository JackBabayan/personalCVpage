"use client";
import { useState } from 'react';
import axios from 'axios';
import {
  Flex, Button, Input, Box, Spinner
} from "@chakra-ui/react";

import styles from "./styles.module.scss";

export default function ChatAI() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = { role: 'user', content: message };
    const updatedChat = [...chatHistory, newMessage];

    setChatHistory(updatedChat);
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post('/api/chat', { message }); 
      const aiMessage = { role: 'assistant', content: res.data.reply };
      setChatHistory([...updatedChat, aiMessage]);
    } catch (error) {
      console.error('Ошибка запроса:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={styles.chatContainer}>
      <Box className={styles.chatMessages}>
        {chatHistory.map((msg, index) => (
          <Box
            key={index}
            className={msg.role === 'user' ? styles.userMessage : styles.aiMessage}
          >
            {msg.content}
          </Box>
        ))}
      </Box>

      <form onSubmit={handleSubmit} className={styles.chatForm}>
        <Flex gap={2}>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Напиши что-то..."
            disabled={loading}
          />
          <Button type="submit" colorScheme="teal" isDisabled={loading}>
            {loading ? <Spinner size="sm" /> : "Отправить"}
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
