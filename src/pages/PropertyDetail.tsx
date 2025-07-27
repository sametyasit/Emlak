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

const PropertyDescription = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
`;

const DescriptionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const DescriptionText = styled.p`
  color: #64748b;
  line-height: 1.6;
  font-size: 1.1rem;
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
  margin-left: 1rem;
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
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 1rem;
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
  const [images, setImages] = useState(property ? [property.image] : []);
  const [modalOpen, setModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  
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
      setImages((prev) => [...prev, url]);
      setCurrentImage(images.length); // yeni eklenen fotoğrafı göster
    }
  };

  // Modal galeri ileri/geri
  const nextImage = () => setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevImage = () => setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <Container>
      <Notification show={showNotification}>
        <h4>{isFavorite ? '❤️' : '💚'} Bildirim</h4>
        <p>{notificationMessage}</p>
      </Notification>

      <PropertyHeader>
        <div style={{position: 'relative'}}>
          <PropertyImage style={{
            backgroundImage: `url(${images[currentImage]})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            color: 'transparent', 
            transition: 'background-image 0.3s', 
            objectFit: 'cover', 
            position: 'relative'
          }}>
            {/* Büyütme butonu */}
            <button
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: 'rgba(255,255,255,0.8)',
                border: 'none',
                borderRadius: '50%',
                width: 32,
                height: 32,
                fontSize: '1.1rem',
                cursor: 'pointer',
                zIndex: 3
              }}
              onClick={() => setModalOpen(true)}
              aria-label="Büyüt"
            >
              🔍
            </button>
            <span role="img" aria-label="ev">🏠</span>
          </PropertyImage>
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
                onClick={prevImage}
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
                onClick={nextImage}
                aria-label="Sonraki fotoğraf"
              >
                ›
              </button>
            </>
          )}
          {/* Admin ise fotoğraf ekle kutusu */}
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
                      setImages(images.filter((_, index) => index !== currentImage));
                      setCurrentImage(0);
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

      <PropertyDescription>
        <DescriptionTitle>📋 İlan Detayları</DescriptionTitle>
        <DescriptionText>
          Bu {property.type.toLowerCase()} ilanı {property.location} konumunda yer almaktadır. 
          {property.rooms} oda düzeninde, {property.area} alanında bulunan bu emlak, 
          {property.type === 'Satılık' ? ' satın almak' : ' kiralamak'} için ideal bir seçenektir.
          <br /><br />
          Detaylı bilgi ve görüntüleme için lütfen bizimle iletişime geçin.
        </DescriptionText>
        <ButtonGroup>
          <ContactButton onClick={() => window.location.href = '/contact'}>
            📞 İletişime Geç
          </ContactButton>
          <MapButton onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${property.location}`, '_blank')}>
            🗺️ Haritada Gör
          </MapButton>
        </ButtonGroup>
      </PropertyDescription>
    </Container>
  );
};

export default PropertyDetail; 