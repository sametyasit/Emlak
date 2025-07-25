import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { allProperties } from '../data/properties';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
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
    background: radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.08) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  background: var(--gradient-secondary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: var(--gradient-secondary);
    border-radius: 2px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FilterSection = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--gradient-secondary);
    border-radius: 20px 20px 0 0;
  }
`;

const FilterTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? 'var(--accent-color)' : 'var(--bg-secondary)'};
  color: ${props => props.active ? 'white' : 'var(--text-primary)'};
  border: 2px solid ${props => props.active ? 'var(--accent-color)' : 'var(--border-color)'};
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: ${props => props.active ? 'var(--accent-hover)' : 'var(--card-hover)'};
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.15);
  }
`;

const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  position: relative;
  z-index: 1;
`;

const PropertyCard = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--border-color);
  position: relative;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-secondary);
    transform: scaleX(0);
    transition: transform 0.4s ease;
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 25px 50px rgba(139, 92, 246, 0.15);
    background: var(--card-hover);
    border-color: var(--accent-color);
    
    &::before {
      transform: scaleX(1);
    }
    
    &::after {
      opacity: 1;
    }
  }
`;

const PropertyImage = styled.div`
  height: 220px;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, transparent 50%);
  }
`;

const PropertyContent = styled.div`
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

const PropertyTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.8rem;
  line-height: 1.3;
`;

const PropertyLocation = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1.2rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PropertyPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--accent-color);
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PropertyDetails = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const StatusBadge = styled.span<{ type: 'sale' | 'rent' }>`
  background: ${props => props.type === 'sale' ? 'linear-gradient(135deg, #10B981, #059669)' : 'linear-gradient(135deg, #F59E0B, #D97706)'};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
`;

const PropertyList: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const properties = allProperties;

  const filteredProperties = filter === 'all' 
    ? properties 
    : properties.filter(property => 
        filter === 'sale' ? property.type === 'Satılık' : property.type === 'Kiralık'
      );

  return (
    <Container>
      <HeaderSection>
        <Title>🏠 Emlak İlanları</Title>
        <Subtitle>
          Hayalinizdeki evi bulun - Binlerce ilan arasından size en uygun olanını seçin
        </Subtitle>
      </HeaderSection>

      <FilterSection>
        <FilterTitle>🔍 Filtrele</FilterTitle>
        <FilterGrid>
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            Tüm İlanlar ({properties.length})
          </FilterButton>
          <FilterButton 
            active={filter === 'sale'} 
            onClick={() => setFilter('sale')}
          >
            Satılık ({properties.filter(p => p.type === 'Satılık').length})
          </FilterButton>
          <FilterButton 
            active={filter === 'rent'} 
            onClick={() => setFilter('rent')}
          >
            Kiralık ({properties.filter(p => p.type === 'Kiralık').length})
          </FilterButton>
        </FilterGrid>
      </FilterSection>

      <PropertyGrid>
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} onClick={() => navigate(`/property/${property.id}`)}>
            <PropertyImage style={{
              backgroundImage: `url(${property.image})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center', 
              color: 'transparent'
            }}>
              <span role="img" aria-label="ev">🏠</span>
            </PropertyImage>
            <StatusBadge type={property.type === 'Satılık' ? 'sale' : 'rent'}>
              {property.type}
            </StatusBadge>
            <PropertyContent>
              <PropertyTitle>{property.title}</PropertyTitle>
              <PropertyLocation>
                📍 {property.location}
              </PropertyLocation>
              <PropertyPrice>
                💰 {typeof property.price === 'number' ? property.price.toLocaleString('tr-TR') + ' TL' : property.price}
              </PropertyPrice>
              <PropertyDetails>
                <DetailItem>
                  🛏️ {property.rooms}
                </DetailItem>
                <DetailItem>
                  📐 {property.area}
                </DetailItem>
                <DetailItem>
                  🏷️ {property.type}
                </DetailItem>
              </PropertyDetails>
            </PropertyContent>
          </PropertyCard>
        ))}
      </PropertyGrid>
    </Container>
  );
};

export default PropertyList; 