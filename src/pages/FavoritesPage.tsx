import React, { useState } from 'react';
import styled from 'styled-components';
import { allProperties } from '../data/properties';

const FavoritesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
`;

const PageTitle = styled.h1`
  color: #333;
  margin-bottom: 30px;
  font-size: 2rem;
  text-align: center;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
`;

const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const PropertyCard = styled.div`
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  border: 1px solid var(--border-color);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const PropertyImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PropertyInfo = styled.div`
  padding: 20px;
`;

const PropertyTitle = styled.h3`
  margin: 0 0 10px 0;
  color: var(--text-primary);
  font-size: 1.2rem;
`;

const PropertyLocation = styled.p`
  color: var(--text-secondary);
  margin: 0 0 10px 0;
  font-size: 0.9rem;
`;

const PropertyPrice = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #8B5CF6;
  margin-bottom: 10px;
`;

const PropertyDetails = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const RemoveButton = styled.button`
  background: #ff4757;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 10px;
  width: 100%;

  &:hover {
    background: #ff3742;
  }
`;

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState(allProperties.slice(0, 6)); // İlk 6 ilanı favori olarak göster

  const removeFromFavorites = (propertyId: number) => {
    setFavorites(favorites.filter(property => property.id !== propertyId));
  };

  return (
    <FavoritesContainer>
      <PageTitle>❤️ Favori İlanlarım</PageTitle>
      
      {favorites.length === 0 ? (
        <EmptyState>
          <EmptyIcon>💔</EmptyIcon>
          <h3>Henüz favori ilanınız yok</h3>
          <p>Beğendiğiniz ilanları favorilere ekleyerek buradan takip edebilirsiniz.</p>
        </EmptyState>
      ) : (
        <PropertyGrid>
          {favorites.map((property) => (
            <PropertyCard key={property.id}>
              <PropertyImage src={property.image} alt={property.title} />
              <PropertyInfo>
                <PropertyTitle>{property.title}</PropertyTitle>
                <PropertyLocation>{property.location}</PropertyLocation>
                <PropertyPrice>{property.price.toLocaleString()} ₺</PropertyPrice>
                <PropertyDetails>
                  <span>{property.rooms}</span>
                  <span>{property.area}</span>
                  <span>{property.type}</span>
                </PropertyDetails>
                <RemoveButton onClick={() => removeFromFavorites(property.id)}>
                  Favorilerden Çıkar
                </RemoveButton>
              </PropertyInfo>
            </PropertyCard>
          ))}
        </PropertyGrid>
      )}
    </FavoritesContainer>
  );
};

export default FavoritesPage; 