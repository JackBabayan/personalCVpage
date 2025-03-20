"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import useStore from '@/store/store';
import {
  Flex, Button, Input, Box, Spinner
} from "@chakra-ui/react";
import { SendIcon } from "@/styles/icon";
import styles from "./styles.module.scss";

export default function ChatAI() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);


  const { aboutMe, experiences, portfolio, projects, loading } = useStore();

  const buildContext = () => {
    if (!aboutMe || !experiences || !portfolio || !projects) {
      return "Контекст еще не загружен.";
    }

    return `
      About Me:
      ${aboutMe.description}
      ${aboutMe.ending}

      Work Experience:
      ${experiences.map(exp => `
      Position: ${exp.position}
      Location: ${exp.location}
      Dates: ${exp.dates}
      Description: ${exp.description}
      Projects: ${exp.projects.map(p => `${p.name} (${p.url})`).join("\n")}
      `).join("\n")}

      Portfolio:
      ${portfolio.map(tab => `
      Tab: ${tab.tab} (${tab.date})
      Projects: ${tab.projects.map(p => `
      - Project: ${p.name}
      Description: ${p.description}
      URL: ${p.url}
      Technologies: ${p.technologies.join(", ")}
      Image: ${p.image}`).join("\n")}
      `).join("\n")}
    `;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = { role: 'user', content: message };
    const updatedChat = [...chatHistory, newMessage];

    
    setChatHistory(updatedChat);
    setMessage('');
    setLoadingChat(true);
    
    try {
      const context = buildContext();
      const res = await axios.post('/api/chat', { message, context });
      const aiMessage = { role: 'assistant', content: res.data.reply };
      setChatHistory([...updatedChat, aiMessage]);
    } catch (error) {
      console.error('Ошибка запроса:', error);
    } finally {
      setLoadingChat(false);
    }
  };

  useEffect(() => {
    if (loading) {
      setLoadingChat(true);
    } else {
      setLoadingChat(false);
    }
  }, [loading]);

  return (
    <Box
      className={styles.chatContainer}
      borderWidth="1px"
      borderRadius="lg"
      padding={3}
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
    >
      <Box className={styles.chatMessages} flexGrow={1} overflowY="auto" mb={4}>
        {chatHistory.map((msg, index) => (
          <Box
            key={index}
            className={msg.role === 'user' ? styles.userMessage : styles.aiMessage}
            padding={2}
            borderRadius="md"
            mb={2}
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
            placeholder="Your question..."
            disabled={loadingChat}
          />
          <Button type="submit" colorScheme="teal" isDisabled={loadingChat}>
            {loadingChat ? <Spinner size="sm" /> : <SendIcon />}
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
