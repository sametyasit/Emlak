import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
`;

const PropertyHeader = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const PropertyImage = styled.div`
  height: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 5rem;
  margin-bottom: 2rem;
`;

const PropertyTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const PropertyLocation = styled.p`
  font-size: 1.2rem;
  color: #64748b;
  margin-bottom: 1rem;
`;

const PropertyPrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 2rem;
`;

const PropertyDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const DetailItem = styled.div`
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  
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
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  background: #667eea;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;
  
  &:hover {
    background: #5a67d8;
    transform: translateY(-2px);
  }
`;

const propertyData = [
  {
    id: '1',
    title: 'Modern Daire',
    location: 'Kadıköy, İstanbul',
    price: '2.500.000 TL',
    rooms: '3+1',
    area: '120m²',
    floor: '5. Kat',
    age: '2 Yıl',
    heating: 'Doğalgaz',
    parking: 'Var',
    type: 'Satılık',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80'
    ],
    description: `Bu modern ve lüks daire, Kadıköy'ün en prestijli mahallelerinden birinde yer almaktadır.\nYeni yapılmış olan bu daire, modern mimari tasarımı ve kaliteli malzemeleri ile dikkat çekmektedir.\n\nDaire özellikleri:\n• 3 yatak odası ve 1 salon\n• Modern mutfak\n• 2 banyo\n• Balkon\n• Otopark\n• Asansör\n• 7/24 güvenlik\n\nUlaşım açısından oldukça avantajlı bir konumda bulunan bu daire,\nmetro istasyonuna 5 dakika yürüme mesafesindedir. Ayrıca otobüs\ndurakları ve minibüs hatları da yakın mesafededir.`
  },
  {
    id: '2',
    title: 'Lüks Villa',
    location: 'Beşiktaş, İstanbul',
    price: '8.500.000 TL',
    rooms: '5+2',
    area: '280m²',
    floor: '2 Katlı',
    age: '5 Yıl',
    heating: 'Merkezi',
    parking: 'Kapalı Garaj',
    type: 'Satılık',
    images: [
      'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80'
    ],
    description: `Boğaz manzaralı, özel havuzlu lüks villa. Geniş bahçe, akıllı ev sistemi ve üst düzey güvenlik.`
  },
  {
    id: '3',
    title: 'Güzel Kiralık Daire',
    location: 'Şişli, İstanbul',
    price: '15.000 TL/ay',
    rooms: '2+1',
    area: '85m²',
    floor: '3. Kat',
    age: '3 Yıl',
    heating: 'Kombi',
    parking: 'Yok',
    type: 'Kiralık',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    description: `Şişli'nin merkezinde, metroya yakın, yeni tadilatlı kiralık daire.`
  },
  {
    id: '4',
    title: 'Bahçeli Müstakil Ev',
    location: 'Çankaya, Ankara',
    price: '3.200.000 TL',
    rooms: '4+1',
    area: '180m²',
    floor: 'Bahçeli',
    age: '10 Yıl',
    heating: 'Soba',
    parking: 'Açık Otopark',
    type: 'Satılık',
    images: [
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80'
    ],
    description: `Geniş bahçeli, çocuk oyun alanlı, aileler için ideal müstakil ev.`
  },
  {
    id: '5',
    title: 'Deniz Manzaralı Daire',
    location: 'Konak, İzmir',
    price: '22.000 TL/ay',
    rooms: '3+1',
    area: '140m²',
    floor: '7. Kat',
    age: '4 Yıl',
    heating: 'Merkezi',
    parking: 'Var',
    type: 'Kiralık',
    images: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80'
    ],
    description: `Eşsiz deniz manzarası, geniş balkon, site içinde, güvenlikli.`
  },
  {
    id: '6',
    title: 'Yeni Yapı Daire',
    location: 'Nilüfer, Bursa',
    price: '1.800.000 TL',
    rooms: '2+1',
    area: '95m²',
    floor: '4. Kat',
    age: '0',
    heating: 'Merkezi',
    parking: 'Var',
    type: 'Satılık',
    images: [
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    description: `Yeni teslim, site içinde, sosyal alanlara yakın modern daire.`
  }
];

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAdmin } = useAuth();
  const property = propertyData.find((p) => p.id === id);
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState(property ? property.images : []);
  const [modalOpen, setModalOpen] = useState(false);
  if (!property) return <div>İlan bulunamadı.</div>;

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
      <PropertyHeader>
        <div style={{position: 'relative'}}>
          <PropertyImage style={{backgroundImage: `url(${images[currentImage]})`, backgroundSize: 'cover', backgroundPosition: 'center', color: 'transparent', transition: 'background-image 0.3s', objectFit: 'cover', position: 'relative'}}>
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
                  border: '2px dashed #667eea',
                  borderRadius: 10,
                  cursor: 'pointer',
                }}>
                  <input type="file" accept="image/*" style={{display: 'none'}} onChange={handleAddImage} />
                  <span style={{fontSize: 20, color: '#667eea'}}>+</span>
                </label>
                <button
                  style={{
                    width: 48,
                    height: 48,
                    background: '#f8fafc',
                    border: '2px dashed #e53e3e',
                    borderRadius: 10,
                    color: '#e53e3e',
                    fontSize: 22,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: images.length > 0 ? 'inline-flex' : 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClick={() => {
                    if (window.confirm('Bu fotoğrafı silmek istediğinize emin misiniz?')) {
                      setImages(prev => prev.filter((_, idx) => idx !== currentImage));
                      setCurrentImage(prev => prev === 0 ? 0 : prev - 1);
                    }
                  }}
                  aria-label="Fotoğrafı Sil"
                >
                  -
                </button>
              </div>
            </>
          )}
        </div>

        {/* Modal (büyütülmüş galeri) */}
        {modalOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.85)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}>
            <button
              style={{
                position: 'absolute',
                top: 32,
                right: 32,
                background: 'rgba(255,255,255,0.8)',
                border: 'none',
                borderRadius: '50%',
                width: 48,
                height: 48,
                fontSize: '2rem',
                cursor: 'pointer',
                zIndex: 1100
              }}
              onClick={() => setModalOpen(false)}
              aria-label="Kapat"
            >
              ✕
            </button>
            <div style={{position: 'relative', width: '80vw', maxWidth: 900, height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <img
                src={images[currentImage]}
                alt={`Emlak fotoğrafı ${currentImage+1}`}
                style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16, background: '#fff'}}
              />
              {/* Modal silme butonu kaldırıldı */}
              {images.length > 1 && (
                <>
                  <button
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      transform: 'translateY(-50%)',
                      background: 'rgba(255,255,255,0.7)',
                      border: 'none',
                      borderRadius: '50%',
                      width: 48,
                      height: 48,
                      fontSize: '2rem',
                      cursor: 'pointer',
                      zIndex: 1101
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
                      right: 0,
                      transform: 'translateY(-50%)',
                      background: 'rgba(255,255,255,0.7)',
                      border: 'none',
                      borderRadius: '50%',
                      width: 48,
                      height: 48,
                      fontSize: '2rem',
                      cursor: 'pointer',
                      zIndex: 1101
                    }}
                    onClick={nextImage}
                    aria-label="Sonraki fotoğraf"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        <PropertyTitle>{property.title}</PropertyTitle>
        <PropertyLocation>📍 {property.location}</PropertyLocation>
        <PropertyPrice>{property.price}</PropertyPrice>
        
        <PropertyDetails>
          <DetailItem>
            <h4>Oda Sayısı</h4>
            <p>🛏️ {property.rooms}</p>
          </DetailItem>
          <DetailItem>
            <h4>Metrekare</h4>
            <p>📐 {property.area}</p>
          </DetailItem>
          <DetailItem>
            <h4>Kat</h4>
            <p>🏢 {property.floor}</p>
          </DetailItem>
          <DetailItem>
            <h4>Bina Yaşı</h4>
            <p>📅 {property.age}</p>
          </DetailItem>
          <DetailItem>
            <h4>Isıtma</h4>
            <p>🔥 {property.heating}</p>
          </DetailItem>
          <DetailItem>
            <h4>Otopark</h4>
            <p>🚗 {property.parking}</p>
          </DetailItem>
        </PropertyDetails>
        
        <ContactButton>
          📞 İletişime Geç
        </ContactButton>
      </PropertyHeader>

      <PropertyDescription>
        <DescriptionTitle>Emlak Açıklaması</DescriptionTitle>
        <DescriptionText>
          {property.description}
        </DescriptionText>
      </PropertyDescription>
    </Container>
  );
};

export default PropertyDetail; 