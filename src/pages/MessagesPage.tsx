import React, { useState } from 'react';
import styled from 'styled-components';

const MessagesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
  color: var(--text-primary);
`;

const PageTitle = styled.h1`
  color: #333;
  margin-bottom: 20px;
  font-size: 2rem;
  text-align: center;
`;

const ChatContainer = styled.div`
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  display: flex;
  height: 100%;
  overflow: hidden;
  border: 1px solid var(--border-color);
`;

const ConversationsList = styled.div`
  width: 300px;
  border-right: 1px solid var(--border-color);
  background: var(--bg-secondary);
`;

const ConversationsHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  background: #8B5CF6;
  color: white;
`;

const ConversationsTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

const ConversationItem = styled.div<{ isActive?: boolean }>`
  padding: 15px 20px;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  background: ${props => props.isActive ? '#e0e7ff' : 'var(--card-bg)'};
  transition: background 0.2s;

  &:hover {
    background: ${props => props.isActive ? '#e0e7ff' : 'var(--bg-secondary)'};
  }
`;

const ConversationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const ConversationName = styled.div`
  font-weight: bold;
  color: #333;
  font-size: 0.95rem;
`;

const ConversationTime = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const ConversationPreview = styled.div`
  color: #666;
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ChatAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #8B5CF6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const ChatInfo = styled.div`
  flex: 1;
`;

const ChatName = styled.div`
  font-weight: bold;
  color: #333;
`;

const ChatStatus = styled.div`
  font-size: 0.85rem;
  color: #666;
`;

const MessagesArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: var(--bg-primary);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Message = styled.div<{ isOwn?: boolean }>`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  align-self: ${props => props.isOwn ? 'flex-end' : 'flex-start'};
  background: ${props => props.isOwn ? '#8B5CF6' : 'var(--card-bg)'};
  color: ${props => props.isOwn ? 'white' : 'var(--text-primary)'};
  box-shadow: var(--shadow);
  word-wrap: break-word;
  border: 1px solid var(--border-color);
`;

const MessageTime = styled.div<{ isOwn?: boolean }>`
  font-size: 0.75rem;
  color: ${props => props.isOwn ? 'rgba(255, 255, 255, 0.7)' : '#666'};
  margin-top: 5px;
  text-align: ${props => props.isOwn ? 'right' : 'left'};
`;

const MessageInput = styled.div`
  padding: 20px;
  border-top: 1px solid var(--border-color);
  background: var(--card-bg);
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 25px;
  font-size: 0.95rem;
  outline: none;

  &:focus {
    border-color: #8B5CF6;
  }
`;

const SendButton = styled.button`
  background: #8B5CF6;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;

  &:hover {
    background: #7C3AED;
  }
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
`;

const MessagesPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [newMessage, setNewMessage] = useState('');

  // Örnek konuşma verileri
  const conversations = [
    {
      id: 0,
      name: 'Ahmet Yılmaz',
      role: 'Emlak Danışmanı',
      avatar: 'AY',
      lastMessage: 'Merhaba! Size nasıl yardımcı olabilirim?',
      time: '14:30',
      messages: [
        { id: 1, text: 'Merhaba! Size nasıl yardımcı olabilirim?', time: '14:30', isOwn: false },
        { id: 2, text: 'Merhaba! Kadıköy\'de 3+1 daire arıyorum.', time: '14:32', isOwn: true },
        { id: 3, text: 'Tabii! Size birkaç seçenek gösterebilirim. Bütçeniz nedir?', time: '14:35', isOwn: false },
        { id: 4, text: '2-3 milyon TL arası düşünüyorum.', time: '14:37', isOwn: true }
      ]
    },
    {
      id: 1,
      name: 'Fatma Demir',
      role: 'Emlak Danışmanı',
      avatar: 'FD',
      lastMessage: 'Randevu saatini onaylıyorum.',
      time: '12:15',
      messages: [
        { id: 1, text: 'Merhaba! Beşiktaş\'taki villayı görmek istiyorum.', time: '12:00', isOwn: true },
        { id: 2, text: 'Tabii! Yarın saat 15:00\'da uygun mu?', time: '12:05', isOwn: false },
        { id: 3, text: 'Evet, uygun. Teşekkürler!', time: '12:10', isOwn: true },
        { id: 4, text: 'Randevu saatini onaylıyorum.', time: '12:15', isOwn: false }
      ]
    },
    {
      id: 2,
      name: 'Mehmet Kaya',
      role: 'Emlak Danışmanı',
      avatar: 'MK',
      lastMessage: 'Fiyat konusunda pazarlık yapabiliriz.',
      time: '09:45',
      messages: [
        { id: 1, text: 'Merhaba! Şişli\'deki dairenin fiyatı biraz yüksek.', time: '09:30', isOwn: true },
        { id: 2, text: 'Fiyat konusunda pazarlık yapabiliriz.', time: '09:45', isOwn: false }
      ]
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const conversation = conversations[selectedConversation];
      const newMsg = {
        id: conversation.messages.length + 1,
        text: newMessage,
        time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      
      // Gerçek uygulamada bu state güncellemesi yapılır
      console.log('Yeni mesaj gönderildi:', newMsg);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <MessagesContainer>
      <PageTitle>💬 Mesajlarım</PageTitle>
      
      <ChatContainer>
        <ConversationsList>
          <ConversationsHeader>
            <ConversationsTitle>Konuşmalar</ConversationsTitle>
          </ConversationsHeader>
          
          {conversations.map((conversation) => (
            <ConversationItem 
              key={conversation.id}
              isActive={selectedConversation === conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <ConversationHeader>
                <ConversationName>{conversation.name}</ConversationName>
                <ConversationTime>{conversation.time}</ConversationTime>
              </ConversationHeader>
              <ConversationPreview>{conversation.lastMessage}</ConversationPreview>
            </ConversationItem>
          ))}
        </ConversationsList>

        <ChatArea>
          {selectedConversation !== null ? (
            <>
              <ChatHeader>
                <ChatAvatar>{conversations[selectedConversation].avatar}</ChatAvatar>
                <ChatInfo>
                  <ChatName>{conversations[selectedConversation].name}</ChatName>
                  <ChatStatus>{conversations[selectedConversation].role} • Çevrimiçi</ChatStatus>
                </ChatInfo>
              </ChatHeader>

              <MessagesArea>
                {conversations[selectedConversation].messages.map((message) => (
                  <Message key={message.id} isOwn={message.isOwn}>
                    {message.text}
                    <MessageTime isOwn={message.isOwn}>{message.time}</MessageTime>
                  </Message>
                ))}
              </MessagesArea>

              <MessageInput>
                <Input
                  type="text"
                  placeholder="Mesajınızı yazın..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <SendButton onClick={handleSendMessage}>
                  ➤
                </SendButton>
              </MessageInput>
            </>
          ) : (
            <EmptyState>
              <EmptyIcon>💬</EmptyIcon>
              <h3>Mesaj seçin</h3>
              <p>Bir konuşma seçerek mesajlaşmaya başlayın.</p>
            </EmptyState>
          )}
        </ChatArea>
      </ChatContainer>
    </MessagesContainer>
  );
};

export default MessagesPage; 