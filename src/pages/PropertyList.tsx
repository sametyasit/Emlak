import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { allProperties } from '../data/properties';

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
  const navigate = useNavigate();
  const properties = allProperties;

  return (
    <Container>
      <Title>🏠 Emlak İlanları</Title>
      <PropertyGrid>
        {properties.map((property) => (
          <PropertyCard key={property.id} onClick={() => navigate(`/property/${property.id}`)} style={{cursor: 'pointer'}}>
            <PropertyImage style={{backgroundImage: `url(${property.image})`, backgroundSize: 'cover', backgroundPosition: 'center', color: 'transparent'}}>
              <span role="img" aria-label="ev">🏠</span>
            </PropertyImage>
            <PropertyContent>
              <PropertyTitle>{property.title}</PropertyTitle>
              <PropertyLocation>📍 {property.location}</PropertyLocation>
              <PropertyPrice>{typeof property.price === 'number' ? property.price.toLocaleString('tr-TR') + ' TL' : property.price}</PropertyPrice>
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