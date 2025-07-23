import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
`;

const PageHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
`;

const MessagesLayout = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 2rem;
  height: 600px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const ConversationsList = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ConversationsHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
`;

const ConversationsTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  margin-top: 1rem;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ConversationItem = styled.div<{ active?: boolean }>`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.active ? '#f1f5f9' : 'white'};
  
  &:hover {
    background: #f8fafc;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const ConversationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const UserName = styled.div`
  font-weight: 600;
  color: #1e293b;
`;

const ConversationTime = styled.span`
  color: #64748b;
  font-size: 0.8rem;
`;

const LastMessage = styled.div`
  color: #64748b;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UnreadBadge = styled.span`
  background: #667eea;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
  margin-left: 0.5rem;
`;

const ChatArea = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const ChatUserName = styled.div`
  font-weight: 600;
  color: #1e293b;
`;

const UserStatus = styled.div`
  color: #64748b;
  font-size: 0.9rem;
`;

const ChatActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  background: #e2e8f0;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #cbd5e1;
    color: #1e293b;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div<{ isOwn?: boolean }>`
  display: flex;
  justify-content: ${props => props.isOwn ? 'flex-end' : 'flex-start'};
  margin-bottom: 1rem;
`;

const MessageBubble = styled.div<{ isOwn?: boolean }>`
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 18px;
  background: ${props => props.isOwn ? '#667eea' : '#f1f5f9'};
  color: ${props => props.isOwn ? 'white' : '#1e293b'};
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    ${props => props.isOwn ? 'right: -8px' : 'left: -8px'};
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-top-color: ${props => props.isOwn ? '#667eea' : '#f1f5f9'};
    border-bottom: 0;
    transform: rotate(${props => props.isOwn ? '45deg' : '-45deg'});
  }
`;

const MessageText = styled.div`
  line-height: 1.4;
`;

const MessageTime = styled.div<{ isOwn?: boolean }>`
  font-size: 0.8rem;
  opacity: 0.7;
  margin-top: 0.25rem;
  text-align: ${props => props.isOwn ? 'right' : 'left'};
`;

const MessageInput = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 1rem;
  align-items: flex-end;
`;

const Input = styled.textarea`
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  resize: none;
  min-height: 40px;
  max-height: 120px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SendButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #5a67d8;
  }
  
  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #64748b;
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #1e293b;
`;

const EmptyText = styled.p`
  font-size: 1rem;
`;

const MessagesPage: React.FC = () => {
  const [conversations] = useState([
    {
      id: 1,
      user: {
        name: 'Ahmet Yılmaz',
        email: 'ahmet@example.com',
        avatar: 'AY'
      },
      lastMessage: 'Merhaba, eviniz hala satılık mı?',
      time: '2 saat önce',
      unread: 2
    },
    {
      id: 2,
      user: {
        name: 'Fatma Demir',
        email: 'fatma@example.com',
        avatar: 'FD'
      },
      lastMessage: 'Randevu saatini değiştirebilir miyiz?',
      time: '1 gün önce',
      unread: 0
    },
    {
      id: 3,
      user: {
        name: 'Mehmet Kaya',
        email: 'mehmet@example.com',
        avatar: 'MK'
      },
      lastMessage: 'Fiyatta pazarlık yapabilir miyiz?',
      time: '3 gün önce',
      unread: 1
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messages, setMessages] = useState<{[key: number]: any[]}>({
    1: [
      {
        id: 1,
        text: 'Merhaba, eviniz hala satılık mı?',
        time: '14:30',
        isOwn: false
      },
      {
        id: 2,
        text: 'Evet, hala satılık. Detayları görmek ister misiniz?',
        time: '14:32',
        isOwn: true
      },
      {
        id: 3,
        text: 'Evet, lütfen. Fiyat ne kadar?',
        time: '14:35',
        isOwn: false
      }
    ],
    2: [
      {
        id: 1,
        text: 'Merhaba, randevu saatini değiştirebilir miyiz?',
        time: '09:15',
        isOwn: false
      },
      {
        id: 2,
        text: 'Tabii, hangi saat uygun?',
        time: '09:20',
        isOwn: true
      }
    ],
    3: [
      {
        id: 1,
        text: 'Fiyatta pazarlık yapabilir miyiz?',
        time: '16:45',
        isOwn: false
      }
    ]
  });

  const [newMessage, setNewMessage] = useState('');

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const currentMessages = selectedConversation ? messages[selectedConversation] || [] : [];

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    setMessages(prev => ({
      ...prev,
      [selectedConversation]: [...(prev[selectedConversation] || []), message]
    }));

    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container>
      <PageHeader>
        <PageTitle>💬 Mesajlar</PageTitle>
        <PageSubtitle>Kullanıcılarla iletişim kurun</PageSubtitle>
      </PageHeader>

      <MessagesLayout>
        <ConversationsList>
          <ConversationsHeader>
            <ConversationsTitle>Konuşmalar</ConversationsTitle>
            <SearchInput placeholder="Kullanıcı ara..." />
          </ConversationsHeader>
          
          {conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              active={selectedConversation === conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <ConversationHeader>
                <UserName>{conversation.user.name}</UserName>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ConversationTime>{conversation.time}</ConversationTime>
                  {conversation.unread > 0 && (
                    <UnreadBadge>{conversation.unread}</UnreadBadge>
                  )}
                </div>
              </ConversationHeader>
              <LastMessage>{conversation.lastMessage}</LastMessage>
            </ConversationItem>
          ))}
        </ConversationsList>

        <ChatArea>
          {selectedConversation ? (
            <>
              <ChatHeader>
                <UserAvatar>{selectedConv?.user.avatar}</UserAvatar>
                <UserInfo>
                  <ChatUserName>{selectedConv?.user.name}</ChatUserName>
                  <UserStatus>Çevrimiçi</UserStatus>
                </UserInfo>
                <ChatActions>
                  <ActionButton title="Arama">📞</ActionButton>
                  <ActionButton title="Video Arama">📹</ActionButton>
                  <ActionButton title="Daha Fazla">⋯</ActionButton>
                </ChatActions>
              </ChatHeader>

              <MessagesContainer>
                {currentMessages.map((message) => (
                  <Message key={message.id} isOwn={message.isOwn}>
                    <MessageBubble isOwn={message.isOwn}>
                      <MessageText>{message.text}</MessageText>
                      <MessageTime isOwn={message.isOwn}>{message.time}</MessageTime>
                    </MessageBubble>
                  </Message>
                ))}
              </MessagesContainer>

              <MessageInput>
                <Input
                  placeholder="Mesajınızı yazın..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <SendButton
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  Gönder
                </SendButton>
              </MessageInput>
            </>
          ) : (
            <EmptyState>
              <EmptyIcon>💬</EmptyIcon>
              <EmptyTitle>Mesaj Seçin</EmptyTitle>
              <EmptyText>
                Sol taraftan bir konuşma seçerek mesajlaşmaya başlayın
              </EmptyText>
            </EmptyState>
          )}
        </ChatArea>
      </MessagesLayout>
    </Container>
  );
};

export default MessagesPage; 