import React, { useEffect, useRef, useState } from 'react';
import {
  useGetIdentity,
  useDataProvider,
  useNotify,
} from 'react-admin';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  CircularProgress,
} from '@mui/material';

export const VendorChat = () => {
  const { data: user } = useGetIdentity();
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data } = await dataProvider.getList('messages', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'createdAt', order: 'ASC' },
        filter: { vendorId: user.vendorId },
      });
      setMessages(data);
    } catch (err) {
      notify('Failed to load messages', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      await dataProvider.create('messages', {
        data: {
          senderId: user.id,
          vendorId: user.vendorId,
          receiverId: 'admin',
          content: newMessage,
          isFromAdmin: false,
        },
      });
      setNewMessage('');
      fetchMessages();
    } catch (err) {
      notify('Failed to send message', { type: 'error' });
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Paper
      elevation={3}
      sx={{
        margin: '2rem auto',
        display: 'flex',
        flexDirection: 'column',
        height: '80vh',
      }}
    >
      <Box px={2} py={1} borderBottom="1px solid #ccc">
        <Typography variant="h6">Chat with Admin</Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2,
          py: 1,
          backgroundColor: '#f9f9f9',
        }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                display: 'flex',
                justifyContent: msg.isFromAdmin ? 'flex-start' : 'flex-end',
                mb: 1,
              }}
            >
              <Box
                sx={{
                  backgroundColor: msg.isFromAdmin ? '#e0e0e0' : '#1976d2',
                  color: msg.isFromAdmin ? 'black' : 'white',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  maxWidth: '70%',
                  wordBreak: 'break-word',
                }}
              >
                {msg.content}
              </Box>
            </Box>
          ))
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Divider />
      <Box
        sx={{
          display: 'flex',
          p: 2,
          gap: 1,
          borderTop: '1px solid #ccc',
        }}
      >
        <TextField
          fullWidth
          placeholder="Type your message..."
          variant="outlined"
          size="small"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button variant="contained" onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Paper>
  );
};
