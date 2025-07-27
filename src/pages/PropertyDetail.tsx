import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { allProperties } from '../data/properties';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  color: #1e293b;
  min-height: 100vh;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: 100%;
    background: radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.03) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;

const PropertyHeader = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
`;

const PropertyImage = styled.div`
  height: 400px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 5rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const ImageNavigation = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 3;
`;

const ImageDot = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    transform: scale(1.2);
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  z-index: 3;
`;

const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: ${fadeIn} 0.3s ease;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: -50px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ModalNavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 20px 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-50%) scale(1.1);
  }
  
  &.prev {
    left: 20px;
  }
  
  &.next {
    right: 20px;
  }
  
  @media (max-width: 768px) {
    padding: 15px 10px;
    font-size: 1.5rem;
    
    &.prev {
      left: 10px;
    }
    
    &.next {
      right: 10px;
    }
  }
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const PropertyTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

const FavoriteButton = styled.button<{ isFavorite: boolean }>`
  background: ${props => props.isFavorite 
    ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' 
    : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
  };
  color: ${props => props.isFavorite ? 'white' : '#6b7280'};
  border: 2px solid ${props => props.isFavorite ? '#ef4444' : '#d1d5db'};
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const Notification = styled.div<{ show: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transform: translateX(${props => props.show ? '0' : '400px'});
  transition: transform 0.3s ease;
  max-width: 300px;
  
  h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
  }
  
  p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

const PropertyLocation = styled.p`
  font-size: 1.2rem;
  color: #64748b;
  margin-bottom: 1rem;
`;

const PropertyPrice = styled.div`
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: #10b981;
  margin-bottom: 2rem;
`;

const PropertyDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const DetailItem = styled.div`
  background: rgba(16, 185, 129, 0.05);
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(16, 185, 129, 0.1);
  
  h4 {
    color: #64748b;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #1e293b;
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

const TabContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
  margin-bottom: 2rem;
`;

const TabButtons = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(16, 185, 129, 0.1);
  overflow-x: auto;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const TabButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent'};
  color: ${props => props.active ? 'white' : '#64748b'};
  border: none;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'rgba(16, 185, 129, 0.05)'};
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
`;

const TabContent = styled.div`
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const FeatureCard = styled.div`
  background: rgba(16, 185, 129, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(16, 185, 129, 0.1);
  
  h3 {
    color: #1e293b;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  p {
    color: #64748b;
    font-size: 1rem;
    margin: 0;
  }
`;

const FeaturesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const FeatureTag = styled.span`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const ContactInfo = styled.div`
  background: rgba(16, 185, 129, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(16, 185, 129, 0.1);
  margin-bottom: 1.5rem;
  
  h3 {
    color: #1e293b;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  p {
    color: #64748b;
    font-size: 1rem;
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const ContactButton = styled.button`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
    
    &::before {
      left: 100%;
    }
  }
`;

const MapButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
    
    &::before {
      left: 100%;
    }
  }
`;

const NoProperty = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
  
  h2 {
    font-size: 2rem;
    color: #1e293b;
    margin-bottom: 1rem;
  }
  
  p {
    color: #64748b;
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAdmin, isAuthenticated } = useAuth();
  const property = allProperties.find((p) => p.id.toString() === id);
  const [currentImage, setCurrentImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState<string | null>(null);
  
  if (!property) {
    return (
      <Container>
        <NoProperty>
          <h2>😔 İlan Bulunamadı</h2>
          <p>Aradığınız ilan mevcut değil veya kaldırılmış olabilir.</p>
          <ContactButton onClick={() => window.history.back()}>
            Geri Dön
          </ContactButton>
        </NoProperty>
      </Container>
    );
  }

  // Güvenli images array oluşturma
  const images = React.useMemo(() => {
    try {
      // Önce property.images kontrolü
      if (property.images && Array.isArray(property.images) && property.images.length > 0) {
        return property.images.filter(img => img && typeof img === 'string');
      }
      
      // Sonra property.image kontrolü
      if (property.image && typeof property.image === 'string') {
        return [property.image];
      }
      
      // Varsayılan resim
      return ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'];
    } catch (err) {
      console.error('Images array error:', err);
      return ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'];
    }
  }, [property]);

  // currentImage'ın geçerli olup olmadığını kontrol et
  const safeCurrentImage = Math.min(currentImage, images.length - 1);

  // currentImage'ı güvenli hale getir
  React.useEffect(() => {
    if (currentImage >= images.length) {
      setCurrentImage(0);
    }
  }, [currentImage, images.length]);

  // Error boundary
  if (error) {
    return (
      <Container>
        <NoProperty>
          <h2>😔 Bir Hata Oluştu</h2>
          <p>{error}</p>
          <ContactButton onClick={() => window.location.reload()}>
            Sayfayı Yenile
          </ContactButton>
        </NoProperty>
      </Container>
    );
  }

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      setNotificationMessage('Favorilere eklemek için giriş yapmalısınız!');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }

    setIsFavorite(!isFavorite);
    setNotificationMessage(isFavorite ? 'Favorilerden çıkarıldı!' : 'Favorilere eklendi!');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  // Fotoğraf ekleme (admin)
  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      // Bu özelliği daha sonra geliştirebiliriz
      console.log('Yeni fotoğraf eklendi:', url);
    }
  };

  // Modal galeri ileri/geri
  const nextImage = () => setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevImage = () => setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  // Modal kapatma
  const closeModal = () => setModalOpen(false);

  // Klavye ile modal kontrolü
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!modalOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [modalOpen, currentImage, images.length]);

  const renderOverviewTab = () => {
    try {
      return (
        <div>
          <FeaturesGrid>
            <FeatureCard>
              <h3>🏗️ Bina Bilgileri</h3>
              <p><strong>Bina Yaşı:</strong> {property.buildingAge || 'Belirtilmemiş'}</p>
              <p><strong>Kat:</strong> {property.floor || 'Belirtilmemiş'}</p>
              <p><strong>Isıtma:</strong> {property.heating || 'Belirtilmemiş'}</p>
              <p><strong>Asansör:</strong> {property.elevator || 'Belirtilmemiş'}</p>
            </FeatureCard>
            
            <FeatureCard>
              <h3>🚗 Otopark & Güvenlik</h3>
              <p><strong>Otopark:</strong> {property.parking || 'Belirtilmemiş'}</p>
              <p><strong>Güvenlik:</strong> {property.security || 'Belirtilmemiş'}</p>
              <p><strong>Site İçinde:</strong> {property.inComplex || 'Belirtilmemiş'}</p>
            </FeatureCard>
            
            <FeatureCard>
              <h3>🏠 Konfor Özellikleri</h3>
              <p><strong>Balkon:</strong> {property.balcony || 'Belirtilmemiş'}</p>
              <p><strong>Eşyalı:</strong> {property.furnished || 'Belirtilmemiş'}</p>
              <p><strong>Evcil Hayvan:</strong> {property.petFriendly || 'Belirtilmemiş'}</p>
              <p><strong>Kredi Uygunluğu:</strong> {property.loanEligible || 'Belirtilmemiş'}</p>
            </FeatureCard>
            
            <FeatureCard>
              <h3>🌊 Manzara & Konum</h3>
              <p><strong>Deniz Manzarası:</strong> {property.seaView || 'Belirtilmemiş'}</p>
              <p><strong>Metro Yakını:</strong> {property.nearMetro || 'Belirtilmemiş'}</p>
              <p><strong>Bahçe:</strong> {property.garden || 'Belirtilmemiş'}</p>
              <p><strong>Havuz:</strong> {property.pool || 'Belirtilmemiş'}</p>
            </FeatureCard>
            
            <FeatureCard>
              <h3>🏋️ Sosyal Tesisler</h3>
              <p><strong>Spor Salonu:</strong> {property.gym || 'Belirtilmemiş'}</p>
              <p><strong>Havuz:</strong> {property.pool || 'Belirtilmemiş'}</p>
              <p><strong>Bahçe:</strong> {property.garden || 'Belirtilmemiş'}</p>
            </FeatureCard>
          </FeaturesGrid>
          
          <div>
            <h3 style={{ color: '#1e293b', fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>
              ✨ Öne Çıkan Özellikler
            </h3>
            <FeaturesList>
              {(property.features || []).map((feature, index) => (
                <FeatureTag key={index}>{feature}</FeatureTag>
              ))}
            </FeaturesList>
          </div>
        </div>
      );
    } catch (err) {
      console.error('Overview tab error:', err);
      setError('Genel bakış bilgileri yüklenirken hata oluştu.');
      return null;
    }
  };

  const renderDescriptionTab = () => {
    try {
      return (
        <div>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#1e293b', fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>
              📋 İlan Açıklaması
            </h3>
            <p style={{ color: '#64748b', lineHeight: '1.8', fontSize: '1.1rem' }}>
              {property.description || 'Bu ilan için henüz detaylı açıklama eklenmemiş.'}
            </p>
          </div>
          
          <ContactInfo>
            <h3>📞 İletişim Bilgileri</h3>
            <p><strong>📱 Telefon:</strong> {property.contactPhone || 'Belirtilmemiş'}</p>
            <p><strong>✉️ E-posta:</strong> {property.contactEmail || 'Belirtilmemiş'}</p>
            <p><strong>📅 İlan Tarihi:</strong> {property.listedDate || 'Belirtilmemiş'}</p>
            <p><strong>🔄 Son Güncelleme:</strong> {property.lastUpdated || 'Belirtilmemiş'}</p>
          </ContactInfo>
        </div>
      );
    } catch (err) {
      console.error('Description tab error:', err);
      setError('Açıklama bilgileri yüklenirken hata oluştu.');
      return null;
    }
  };

  const renderLocationTab = () => {
    try {
      return (
        <div>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#1e293b', fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>
              📍 Konum Bilgileri
            </h3>
            <FeaturesGrid>
              <FeatureCard>
                <h3>🏙️ Şehir & İlçe</h3>
                <p><strong>Şehir:</strong> {property.city || 'Belirtilmemiş'}</p>
                <p><strong>İlçe:</strong> {property.district || 'Belirtilmemiş'}</p>
                <p><strong>Mahalle:</strong> {property.neighborhood || 'Belirtilmemiş'}</p>
              </FeatureCard>
              
              <FeatureCard>
                <h3>🚇 Ulaşım</h3>
                <p><strong>Metro Yakınlığı:</strong> {property.nearMetro || 'Belirtilmemiş'}</p>
                <p><strong>Merkezi Konum:</strong> {(property.features || []).includes('Merkezi Konum') ? 'Evet' : 'Hayır'}</p>
              </FeatureCard>
              
              <FeatureCard>
                <h3>🏫 Yakınlık</h3>
                <p><strong>Üniversite Yakını:</strong> {(property.features || []).includes('Üniversite Yakını') ? 'Evet' : 'Hayır'}</p>
                <p><strong>Deniz Manzarası:</strong> {property.seaView || 'Belirtilmemiş'}</p>
              </FeatureCard>
            </FeaturesGrid>
          </div>
          
          <ButtonGroup>
            <MapButton onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${property.location}`, '_blank')}>
              🗺️ Haritada Gör
            </MapButton>
            <ContactButton onClick={() => window.location.href = '/contact'}>
              📞 İletişime Geç
            </ContactButton>
          </ButtonGroup>
        </div>
      );
    } catch (err) {
      console.error('Location tab error:', err);
      setError('Konum bilgileri yüklenirken hata oluştu.');
      return null;
    }
  };

  return (
    <Container>
      <Notification show={showNotification}>
        <h4>{isFavorite ? '❤️' : '💚'} Bildirim</h4>
        <p>{notificationMessage}</p>
      </Notification>

      <PropertyHeader>
        <div style={{position: 'relative'}}>
          <PropertyImage 
            style={{
              backgroundImage: `url(${images[safeCurrentImage]})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center', 
              color: 'transparent', 
              transition: 'background-image 0.3s', 
              objectFit: 'cover', 
              position: 'relative'
            }}
            onClick={() => setModalOpen(true)}
          >
            <ImageCounter>
              {safeCurrentImage + 1} / {images.length}
            </ImageCounter>
            
            {images.length > 1 && (
              <>
                <button
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '10px',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.7)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    zIndex: 2
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  aria-label="Önceki fotoğraf"
                >
                  ‹
                </button>
                <button
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.7)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    zIndex: 2
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  aria-label="Sonraki fotoğraf"
                >
                  ›
                </button>
              </>
            )}
            
            <ImageNavigation>
              {images.map((_, index) => (
                <ImageDot
                  key={index}
                  active={index === safeCurrentImage}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImage(index);
                  }}
                />
              ))}
            </ImageNavigation>
          </PropertyImage>
          
          {isAdmin && (
            <>
              <div style={{display: 'flex', justifyContent: 'center', marginTop: 16, gap: 8}}>
                <label style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  background: '#f8fafc',
                  border: '2px dashed #10b981',
                  borderRadius: 10,
                  cursor: 'pointer',
                }}>
                  <input type="file" accept="image/*" style={{display: 'none'}} onChange={handleAddImage} />
                  <span style={{fontSize: 20, color: '#10b981'}}>+</span>
                </label>
                <button
                  style={{
                    width: 48,
                    height: 48,
                    background: '#f8fafc',
                    border: '2px dashed #e53e3e',
                    borderRadius: 10,
                    cursor: 'pointer',
                    fontSize: 20,
                    color: '#e53e3e'
                  }}
                  onClick={() => {
                    if (images.length > 1) {
                      // Bu özelliği daha sonra geliştirebiliriz
                      console.log('Fotoğraf silme özelliği');
                    }
                  }}
                >
                  -
                </button>
              </div>
            </>
          )}
        </div>

        <TitleSection>
          <PropertyTitle>{property.title}</PropertyTitle>
          <FavoriteButton 
            isFavorite={isFavorite} 
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </FavoriteButton>
        </TitleSection>

        <PropertyLocation>📍 {property.location}</PropertyLocation>
        <PropertyPrice>
          💰 {typeof property.price === 'number' ? property.price.toLocaleString('tr-TR') + ' TL' : property.price}
        </PropertyPrice>

        <PropertyDetails>
          <DetailItem>
            <h4>Oda Sayısı</h4>
            <p>🛏️ {property.rooms}</p>
          </DetailItem>
          <DetailItem>
            <h4>Alan</h4>
            <p>📐 {property.area}</p>
          </DetailItem>
          <DetailItem>
            <h4>Durum</h4>
            <p>🏷️ {property.type}</p>
          </DetailItem>
          <DetailItem>
            <h4>Şehir</h4>
            <p>🏙️ {property.city}</p>
          </DetailItem>
          <DetailItem>
            <h4>İlçe</h4>
            <p>📍 {property.district}</p>
          </DetailItem>
          <DetailItem>
            <h4>Mahalle</h4>
            <p>🏘️ {property.neighborhood}</p>
          </DetailItem>
        </PropertyDetails>
      </PropertyHeader>

      <TabContainer>
        <TabButtons>
          <TabButton 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
          >
            📋 Genel Bakış
          </TabButton>
          <TabButton 
            active={activeTab === 'description'} 
            onClick={() => setActiveTab('description')}
          >
            📝 Açıklama & İletişim
          </TabButton>
          <TabButton 
            active={activeTab === 'location'} 
            onClick={() => setActiveTab('location')}
          >
            📍 Konum & Ulaşım
          </TabButton>
        </TabButtons>
        
        <TabContent>
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'description' && renderDescriptionTab()}
          {activeTab === 'location' && renderLocationTab()}
        </TabContent>
      </TabContainer>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClick={closeModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalCloseButton onClick={closeModal}>×</ModalCloseButton>
          
          {images.length > 1 && (
            <>
              <ModalNavigationButton className="prev" onClick={prevImage}>
                ‹
              </ModalNavigationButton>
              <ModalNavigationButton className="next" onClick={nextImage}>
                ›
              </ModalNavigationButton>
            </>
          )}
          
          <ModalImage src={images[safeCurrentImage]} alt={`${property.title} - Fotoğraf ${safeCurrentImage + 1}`} />
          
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '0.9rem'
          }}>
            {safeCurrentImage + 1} / {images.length}
          </div>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default PropertyDetail; 