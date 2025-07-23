import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

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

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Simüle edilmiş emlak verisi
  const property = {
    id: id,
    title: 'Modern ve Lüks Daire',
    location: 'Kadıköy, İstanbul',
    price: '2.500.000 TL',
    rooms: '3+1',
    area: '120m²',
    floor: '5. Kat',
    age: '2 Yıl',
    heating: 'Doğalgaz',
    parking: 'Var',
    description: `Bu modern ve lüks daire, Kadıköy'ün en prestijli mahallelerinden birinde yer almaktadır. 
    Yeni yapılmış olan bu daire, modern mimari tasarımı ve kaliteli malzemeleri ile dikkat çekmektedir.
    
    Daire özellikleri:
    • 3 yatak odası ve 1 salon
    • Modern mutfak
    • 2 banyo
    • Balkon
    • Otopark
    • Asansör
    • 7/24 güvenlik
    
    Ulaşım açısından oldukça avantajlı bir konumda bulunan bu daire, 
    metro istasyonuna 5 dakika yürüme mesafesindedir. Ayrıca otobüs 
    durakları ve minibüs hatları da yakın mesafededir.`
  };

  return (
    <Container>
      <PropertyHeader>
        <PropertyImage>🏠</PropertyImage>
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