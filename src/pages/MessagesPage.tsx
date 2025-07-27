import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const MessagesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
`;

const PageTitle = styled.h1`
  color: #1e293b;
  margin-bottom: 20px;
  font-size: 2rem;
  text-align: center;
  font-weight: 700;
`;

const ChatContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  height: 100%;
  overflow: hidden;
  border: 1px solid #e2e8f0;
`;

const ConversationsList = styled.div`
  width: 350px;
  border-right: 1px solid #e2e8f0;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
`;

const ConversationsHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
`;

const ConversationsTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
`;

const ConversationItem = styled.div<{ isActive?: boolean }>`
  padding: 15px 20px;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  background: ${props => props.isActive ? 'rgba(16, 185, 129, 0.1)' : 'white'};
  transition: all 0.2s ease;
  border-left: ${props => props.isActive ? '4px solid #10b981' : '4px solid transparent'};

  &:hover {
    background: ${props => props.isActive ? 'rgba(16, 185, 129, 0.15)' : '#f1f5f9'};
  }
`;

const ConversationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ConversationName = styled.div`
  font-weight: 600;
  color: #1e293b;
  font-size: 1rem;
`;

const ConversationTime = styled.div`
  font-size: 0.8rem;
  color: #64748b;
`;

const ConversationPreview = styled.div`
  color: #64748b;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
`;

const UnreadBadge = styled.div`
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
  margin-left: 8px;
`;

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
`;

const ChatHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
  background: white;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-weight: 600;
  color: #1e293b;
  font-size: 1.1rem;
  margin-bottom: 2px;
`;

const UserRole = styled.div`
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 2px;
`;

const UserStatus = styled.div<{ isOnline?: boolean }>`
  color: ${props => props.isOnline ? '#10b981' : '#64748b'};
  font-size: 0.8rem;
  font-weight: 500;
  
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.isOnline ? '#10b981' : '#64748b'};
    margin-right: 6px;
  }
`;

const MessagesArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const MessageBubble = styled.div<{ isAdmin?: boolean }>`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  position: relative;
  align-self: ${props => props.isAdmin ? 'flex-end' : 'flex-start'};
  background: ${props => props.isAdmin ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'white'};
  color: ${props => props.isAdmin ? 'white' : '#1e293b'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: ${props => props.isAdmin ? 'none' : '1px solid #e2e8f0'};
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    ${props => props.isAdmin ? 'right: -8px' : 'left: -8px'};
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-${props => props.isAdmin ? 'left' : 'right'}-color: ${props => props.isAdmin ? '#10b981' : 'white'};
  }
`;

const MessageText = styled.div`
  font-size: 0.95rem;
  line-height: 1.4;
  word-wrap: break-word;
`;

const MessageTime = styled.div`
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 4px;
  text-align: right;
`;

const MessageInputArea = styled.div`
  padding: 20px;
  border-top: 1px solid #e2e8f0;
  background: white;
  display: flex;
  gap: 12px;
  align-items: flex-end;
`;

const MessageInput = styled.textarea`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 24px;
  font-size: 0.95rem;
  resize: none;
  min-height: 44px;
  max-height: 120px;
  font-family: inherit;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
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
  opacity: 0.5;
`;

const EmptyText = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const EmptySubtext = styled.div`
  font-size: 0.9rem;
  opacity: 0.7;
`;

const MessagesPage: React.FC = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      role: 'Emlak Danışmanı',
      isOnline: true,
      avatar: 'AY',
      lastMessage: 'Merhaba! Size nasıl yardımcı olabilirim?',
      lastTime: '14:30',
      unreadCount: 0,
      messages: [
        {
          id: 1,
          text: 'Merhaba! Size nasıl yardımcı olabilirim?',
          time: '14:30',
          isAdmin: false
        },
        {
          id: 2,
          text: 'Merhaba! Kadıköy\'de 3+1 daire arıyorum.',
          time: '14:32',
          isAdmin: true
        },
        {
          id: 3,
          text: 'Tabii! Size birkaç seçenek gösterebilirim. Bütçeniz nedir?',
          time: '14:35',
          isAdmin: false
        },
        {
          id: 4,
          text: '2-3 milyon TL arası düşünüyorum.',
          time: '14:37',
          isAdmin: true
        }
      ]
    },
    {
      id: 2,
      name: 'Fatma Demir',
      role: 'Müşteri',
      isOnline: false,
      avatar: 'FD',
      lastMessage: 'Randevu saatini onaylıyorum.',
      lastTime: '12:15',
      unreadCount: 2,
      messages: [
        {
          id: 1,
          text: 'Merhaba, evinizi görmek istiyorum.',
          time: '12:00',
          isAdmin: true
        },
        {
          id: 2,
          text: 'Tabii, yarın saat 15:00\'da müsait misiniz?',
          time: '12:10',
          isAdmin: false
        },
        {
          id: 3,
          text: 'Randevu saatini onaylıyorum.',
          time: '12:15',
          isAdmin: true
        }
      ]
    },
    {
      id: 3,
      name: 'Mehmet Kaya',
      role: 'Müşteri',
      isOnline: true,
      avatar: 'MK',
      lastMessage: 'Fiyat konusunda pazarlık yapabiliriz.',
      lastTime: '09:45',
      unreadCount: 0,
      messages: [
        {
          id: 1,
          text: 'Merhaba, bu ev hala satılık mı?',
          time: '09:30',
          isAdmin: true
        },
        {
          id: 2,
          text: 'Evet, hala satılık. Fiyat konusunda pazarlık yapabiliriz.',
          time: '09:45',
          isAdmin: false
        }
      ]
    }
  ]);

  const [activeConversation, setActiveConversation] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation, conversations]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation) {
        const newMsg = {
          id: Date.now(),
          text: newMessage.trim(),
          time: new Date().toLocaleTimeString('tr-TR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          isAdmin: true
        };

        return {
          ...conv,
          lastMessage: newMessage.trim(),
          lastTime: newMsg.time,
          unreadCount: 0,
          messages: [...conv.messages, newMsg]
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleConversationClick = (conversationId: number) => {
    setActiveConversation(conversationId);
    
    // Okunmamış mesajları sıfırla
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId 
        ? { ...conv, unreadCount: 0 }
        : conv
    ));
  };

  const currentConversation = conversations.find(conv => conv.id === activeConversation);

  return (
    <MessagesContainer>
      <PageTitle>💬 Mesajlarım</PageTitle>
      
      <ChatContainer>
        <ConversationsList>
          <ConversationsHeader>
            <ConversationsTitle>Konuşmalar</ConversationsTitle>
          </ConversationsHeader>
          
          {conversations.map(conversation => (
            <ConversationItem
              key={conversation.id}
              isActive={conversation.id === activeConversation}
              onClick={() => handleConversationClick(conversation.id)}
            >
              <ConversationHeader>
                <ConversationName>{conversation.name}</ConversationName>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {conversation.unreadCount > 0 && (
                    <UnreadBadge>{conversation.unreadCount}</UnreadBadge>
                  )}
                  <ConversationTime>{conversation.lastTime}</ConversationTime>
                </div>
              </ConversationHeader>
              <ConversationPreview>{conversation.lastMessage}</ConversationPreview>
            </ConversationItem>
          ))}
        </ConversationsList>

        <ChatArea>
          {currentConversation ? (
            <>
              <ChatHeader>
                <UserAvatar>{currentConversation.avatar}</UserAvatar>
                <UserInfo>
                  <UserName>{currentConversation.name}</UserName>
                  <UserRole>{currentConversation.role}</UserRole>
                  <UserStatus isOnline={currentConversation.isOnline}>
                    {currentConversation.isOnline ? 'Çevrimiçi' : 'Çevrimdışı'}
                  </UserStatus>
                </UserInfo>
              </ChatHeader>

              <MessagesArea>
                {currentConversation.messages.map(message => (
                  <MessageBubble key={message.id} isAdmin={message.isAdmin}>
                    <MessageText>{message.text}</MessageText>
                    <MessageTime>{message.time}</MessageTime>
                  </MessageBubble>
                ))}
                <div ref={messagesEndRef} />
              </MessagesArea>

              <MessageInputArea>
                <MessageInput
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Mesajınızı yazın..."
                  rows={1}
                />
                <SendButton 
                  onClick={handleSendMessage}
                  disabled={newMessage.trim() === ''}
                >
                  ➤
                </SendButton>
              </MessageInputArea>
            </>
          ) : (
            <EmptyState>
              <EmptyIcon>💬</EmptyIcon>
              <EmptyText>Mesaj seçilmedi</EmptyText>
              <EmptySubtext>Sol taraftan bir konuşma seçin</EmptySubtext>
            </EmptyState>
          )}
        </ChatArea>
      </ChatContainer>
    </MessagesContainer>
  );
};

export default MessagesPage; 