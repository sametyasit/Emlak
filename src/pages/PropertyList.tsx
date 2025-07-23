import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 2rem;
  text-align: center;
`;

const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const PropertyCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const PropertyImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
`;

const PropertyContent = styled.div`
  padding: 1.5rem;
`;

const PropertyTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const PropertyLocation = styled.p`
  color: #64748b;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const PropertyPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 1rem;
`;

const PropertyDetails = styled.div`
  display: flex;
  justify-content: space-between;
  color: #64748b;
  font-size: 0.9rem;
`;

const PropertyList: React.FC = () => {
  const properties = [
    {
      id: 1,
      title: 'Modern Daire',
      location: 'Kadıköy, İstanbul',
      price: '2.500.000 TL',
      rooms: '3+1',
      area: '120m²',
      type: 'Satılık'
    },
    {
      id: 2,
      title: 'Lüks Villa',
      location: 'Beşiktaş, İstanbul',
      price: '8.500.000 TL',
      rooms: '5+2',
      area: '280m²',
      type: 'Satılık'
    },
    {
      id: 3,
      title: 'Güzel Kiralık Daire',
      location: 'Şişli, İstanbul',
      price: '15.000 TL/ay',
      rooms: '2+1',
      area: '85m²',
      type: 'Kiralık'
    },
    {
      id: 4,
      title: 'Bahçeli Müstakil Ev',
      location: 'Çankaya, Ankara',
      price: '3.200.000 TL',
      rooms: '4+1',
      area: '180m²',
      type: 'Satılık'
    },
    {
      id: 5,
      title: 'Deniz Manzaralı Daire',
      location: 'Konak, İzmir',
      price: '22.000 TL/ay',
      rooms: '3+1',
      area: '140m²',
      type: 'Kiralık'
    },
    {
      id: 6,
      title: 'Yeni Yapı Daire',
      location: 'Nilüfer, Bursa',
      price: '1.800.000 TL',
      rooms: '2+1',
      area: '95m²',
      type: 'Satılık'
    }
  ];

  return (
    <Container>
      <Title>🏠 Emlak İlanları</Title>
      <PropertyGrid>
        {properties.map((property) => (
          <PropertyCard key={property.id}>
            <PropertyImage>🏠</PropertyImage>
            <PropertyContent>
              <PropertyTitle>{property.title}</PropertyTitle>
              <PropertyLocation>📍 {property.location}</PropertyLocation>
              <PropertyPrice>{property.price}</PropertyPrice>
              <PropertyDetails>
                <span>🛏️ {property.rooms}</span>
                <span>📐 {property.area}</span>
                <span>🏷️ {property.type}</span>
              </PropertyDetails>
            </PropertyContent>
          </PropertyCard>
        ))}
      </PropertyGrid>
    </Container>
  );
};

export default PropertyList; 