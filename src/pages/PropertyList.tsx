import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
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

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  color: #1e293b;
  min-height: 100vh;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 1rem 10px;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem 5px;
  }
  
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

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;
  position: relative;
  letter-spacing: -0.02em;
  
  span {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #10b981 0%, #059669 100%);
    border-radius: 2px;
  }
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 400;
`;

const FilterSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 3rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.1);
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 0 10px 2rem 10px;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    margin: 0 5px 1.5rem 5px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #10b981 0%, #059669 100%);
    border-radius: 20px 20px 0 0;
  }
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

const FilterTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterToggle = styled.button`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
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

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.8rem;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.3rem;
`;

const FilterSelect = styled.select`
  padding: 0.8rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 0.95rem;
  background: #ffffff;
  color: #374151;
  outline: none;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  
  option {
    font-weight: 500;
  }
`;

const FilterInput = styled.input`
  padding: 0.8rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 0.95rem;
  background: #ffffff;
  color: #374151;
  outline: none;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &[type=number] {
    -moz-appearance: textfield;
  }
`;

const PriceRangeContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const PriceInput = styled(FilterInput)`
  flex: 1;
`;

const PriceSeparator = styled.span`
  color: #6b7280;
  font-weight: 600;
`;

const AdvancedFilters = styled.div<{ isOpen: boolean }>`
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.4s ease;
  border-top: 1px solid #e5e7eb;
  padding-top: 2rem;
  margin-top: 2rem;
`;

const AdvancedFiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`;

const FilterButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : '#ffffff'};
  color: ${props => props.active ? 'white' : '#374151'};
  border: 2px solid ${props => props.active ? '#10b981' : '#e5e7eb'};
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' : '#f9fafb'};
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.15);
  }
`;

const FilterActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.8rem;
  }
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  background: ${props => props.variant === 'primary' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent'};
  color: ${props => props.variant === 'primary' ? 'white' : '#374151'};
  border: 2px solid ${props => props.variant === 'primary' ? '#10b981' : '#e5e7eb'};
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
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
    background: ${props => props.variant === 'primary' ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' : '#f9fafb'};
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.15);
    
    &::before {
      left: 100%;
    }
  }
`;

const ResultsInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
  animation: ${slideIn} 0.6s ease-out;
`;

const ResultsCount = styled.p`
  font-size: 1rem;
  color: #6b7280;
  font-weight: 500;
`;

const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.9rem;
  background: #ffffff;
  color: #374151;
  outline: none;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #10b981;
  }
`;

const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 2.5rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const PropertyCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(16, 185, 129, 0.1);
  position: relative;
  backdrop-filter: blur(10px);
  animation: ${fadeInUp} 0.8s ease-out;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #10b981 0%, #059669 100%);
    transform: scaleX(0);
    transition: transform 0.4s ease;
    z-index: 1;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(16, 185, 129, 0.15);
    background: rgba(255, 255, 255, 1);
    border-color: #10b981;
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const PropertyImage = styled.div`
  height: 240px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, transparent 50%);
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
  color: #1e293b;
  margin-bottom: 0.8rem;
  line-height: 1.3;
`;

const PropertyLocation = styled.p`
  color: #6b7280;
  margin-bottom: 1.2rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PropertyPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: #10b981;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PropertyDetails = styled.div`
  display: flex;
  justify-content: space-between;
  color: #6b7280;
  font-size: 0.95rem;
  font-weight: 500;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const StatusBadge = styled.span<{ type: 'sale' | 'rent' }>`
  background: ${props => props.type === 'sale' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #f59e0b, #d97706)'};
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const NoResults = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #1e293b;
  }
  
  p {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const PropertyList: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState({
    city: '',
    district: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    rooms: '',
    area: '',
    floor: '',
    age: '',
    heating: '',
    parking: '',
    balcony: '',
    furnished: '',
    // Yeni eklenen gelişmiş filtreler
    buildingAge: '',
    elevator: '',
    security: '',
    siteInside: '',
    seaView: '',
    metroNearby: '',
    garden: '',
    pool: '',
    gym: '',
    petFriendly: '',
    creditAvailable: ''
  });
  
  const properties = allProperties;

  const filteredProperties = properties.filter(property => {
    // Basic filter
    if (filter === 'sale' && property.type !== 'Satılık') return false;
    if (filter === 'rent' && property.type !== 'Kiralık') return false;
    
    // Advanced filters
    if (filters.city && !property.location.toLowerCase().includes(filters.city.toLowerCase())) return false;
    if (filters.minPrice && property.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && property.price > Number(filters.maxPrice)) return false;
    if (filters.rooms && !property.rooms.includes(filters.rooms)) return false;
    
    return true;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return b.id - a.id;
      case 'oldest':
        return a.id - b.id;
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setFilters({
      city: '',
      district: '',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      rooms: '',
      area: '',
      floor: '',
      age: '',
      heating: '',
      parking: '',
      balcony: '',
      furnished: '',
      // Yeni eklenen gelişmiş filtreler
      buildingAge: '',
      elevator: '',
      security: '',
      siteInside: '',
      seaView: '',
      metroNearby: '',
      garden: '',
      pool: '',
      gym: '',
      petFriendly: '',
      creditAvailable: ''
    });
    setFilter('all');
  };

  return (
    <Container>
      <HeaderSection>
        <Title>🏠 Emlak <span>İlanları</span></Title>
        <Subtitle>
          Hayalinizdeki evi bulun - Binlerce ilan arasından size en uygun olanını seçin
        </Subtitle>
      </HeaderSection>

      <FilterSection>
        <FilterHeader>
          <FilterTitle>
            🔍 Gelişmiş Filtreler
          </FilterTitle>
          <FilterToggle onClick={() => setShowAdvanced(!showAdvanced)}>
            {showAdvanced ? 'Basit Filtreler' : 'Gelişmiş Filtreler'}
          </FilterToggle>
        </FilterHeader>

        <FilterGrid>
          <FilterGroup>
            <FilterLabel>Durum</FilterLabel>
            <FilterSelect 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Tüm İlanlar ({properties.length})</option>
              <option value="sale">Satılık ({properties.filter(p => p.type === 'Satılık').length})</option>
              <option value="rent">Kiralık ({properties.filter(p => p.type === 'Kiralık').length})</option>
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Şehir</FilterLabel>
            <FilterSelect 
              value={filters.city}
              onChange={(e) => setFilters({...filters, city: e.target.value})}
            >
              <option value="">Tüm Şehirler</option>
              <option value="istanbul">İstanbul</option>
              <option value="ankara">Ankara</option>
              <option value="izmir">İzmir</option>
              <option value="bursa">Bursa</option>
              <option value="antalya">Antalya</option>
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Konut Tipi</FilterLabel>
            <FilterSelect 
              value={filters.propertyType}
              onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
            >
              <option value="">Tüm Tipler</option>
              <option value="daire">Daire</option>
              <option value="villa">Villa</option>
              <option value="müstakil">Müstakil Ev</option>
              <option value="rezidans">Rezidans</option>
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Oda Sayısı</FilterLabel>
            <FilterSelect 
              value={filters.rooms}
              onChange={(e) => setFilters({...filters, rooms: e.target.value})}
            >
              <option value="">Tüm Odalar</option>
              <option value="1+1">1+1</option>
              <option value="2+1">2+1</option>
              <option value="3+1">3+1</option>
              <option value="4+1">4+1</option>
              <option value="5+">5+</option>
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Fiyat Aralığı</FilterLabel>
            <PriceRangeContainer>
              <PriceInput 
                type="number"
                placeholder="Min TL"
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
              />
              <PriceSeparator>-</PriceSeparator>
              <PriceInput 
                type="number"
                placeholder="Max TL"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
              />
            </PriceRangeContainer>
          </FilterGroup>
        </FilterGrid>

        <AdvancedFilters isOpen={showAdvanced}>
          <AdvancedFiltersGrid>
            <FilterGroup>
              <FilterLabel>Metrekare</FilterLabel>
              <FilterSelect 
                value={filters.area}
                onChange={(e) => setFilters({...filters, area: e.target.value})}
              >
                <option value="">Tüm Alanlar</option>
                <option value="0-50">0-50 m²</option>
                <option value="50-100">50-100 m²</option>
                <option value="100-150">100-150 m²</option>
                <option value="150-200">150-200 m²</option>
                <option value="200+">200+ m²</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Kat</FilterLabel>
              <FilterSelect 
                value={filters.floor}
                onChange={(e) => setFilters({...filters, floor: e.target.value})}
              >
                <option value="">Tüm Katlar</option>
                <option value="zemin">Zemin</option>
                <option value="1-3">1-3. Kat</option>
                <option value="4-7">4-7. Kat</option>
                <option value="8-15">8-15. Kat</option>
                <option value="15+">15+ Kat</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Bina Yaşı</FilterLabel>
              <FilterSelect 
                value={filters.age}
                onChange={(e) => setFilters({...filters, age: e.target.value})}
              >
                <option value="">Tüm Yaşlar</option>
                <option value="0-1">0-1 Yaş</option>
                <option value="1-5">1-5 Yaş</option>
                <option value="5-10">5-10 Yaş</option>
                <option value="10-20">10-20 Yaş</option>
                <option value="20+">20+ Yaş</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Isıtma</FilterLabel>
              <FilterSelect 
                value={filters.heating}
                onChange={(e) => setFilters({...filters, heating: e.target.value})}
              >
                <option value="">Tüm Isıtma</option>
                <option value="merkezi">Merkezi</option>
                <option value="kombi">Kombi</option>
                <option value="dogalgaz">Doğalgaz</option>
                <option value="elektrik">Elektrik</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Otopark</FilterLabel>
              <FilterSelect 
                value={filters.parking}
                onChange={(e) => setFilters({...filters, parking: e.target.value})}
              >
                <option value="">Tüm Seçenekler</option>
                <option value="var">Var</option>
                <option value="yok">Yok</option>
                <option value="ücretli">Ücretli</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Balkon</FilterLabel>
              <FilterSelect 
                value={filters.balcony}
                onChange={(e) => setFilters({...filters, balcony: e.target.value})}
              >
                <option value="">Tüm Seçenekler</option>
                <option value="var">Var</option>
                <option value="yok">Yok</option>
                <option value="kapalı">Kapalı</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Eşyalı</FilterLabel>
              <FilterSelect 
                value={filters.furnished}
                onChange={(e) => setFilters({...filters, furnished: e.target.value})}
              >
                <option value="">Tüm Seçenekler</option>
                <option value="evet">Evet</option>
                <option value="hayır">Hayır</option>
                <option value="yarı">Yarı Eşyalı</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Emlak Yaşı</FilterLabel>
              <FilterSelect 
                value={filters.buildingAge}
                onChange={(e) => setFilters({...filters, buildingAge: e.target.value})}
              >
                <option value="">Yaş Seçin</option>
                <option value="0-1">0-1 Yaş</option>
                <option value="1-5">1-5 Yaş</option>
                <option value="5-10">5-10 Yaş</option>
                <option value="10-20">10-20 Yaş</option>
                <option value="20+">20+ Yaş</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Asansör</FilterLabel>
              <FilterSelect 
                value={filters.elevator}
                onChange={(e) => setFilters({...filters, elevator: e.target.value})}
              >
                <option value="">Asansör Seçin</option>
                <option value="var">Var</option>
                <option value="yok">Yok</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Güvenlik</FilterLabel>
              <FilterSelect 
                value={filters.security}
                onChange={(e) => setFilters({...filters, security: e.target.value})}
              >
                <option value="">Güvenlik Seçin</option>
                <option value="var">Var</option>
                <option value="yok">Yok</option>
                <option value="24-saat">24 Saat</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Site İçinde</FilterLabel>
              <FilterSelect 
                value={filters.siteInside}
                onChange={(e) => setFilters({...filters, siteInside: e.target.value})}
              >
                <option value="">Site Durumu</option>
                <option value="evet">Evet</option>
                <option value="hayır">Hayır</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Deniz Manzarası</FilterLabel>
              <FilterSelect 
                value={filters.seaView}
                onChange={(e) => setFilters({...filters, seaView: e.target.value})}
              >
                <option value="">Manzara Seçin</option>
                <option value="evet">Var</option>
                <option value="hayır">Yok</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Metro Yakını</FilterLabel>
              <FilterSelect 
                value={filters.metroNearby}
                onChange={(e) => setFilters({...filters, metroNearby: e.target.value})}
              >
                <option value="">Metro Durumu</option>
                <option value="evet">Var</option>
                <option value="hayır">Yok</option>
                <option value="yakın">Yakın</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Bahçe</FilterLabel>
              <FilterSelect 
                value={filters.garden}
                onChange={(e) => setFilters({...filters, garden: e.target.value})}
              >
                <option value="">Bahçe Seçin</option>
                <option value="var">Var</option>
                <option value="yok">Yok</option>
                <option value="ortak">Ortak</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Havuz</FilterLabel>
              <FilterSelect 
                value={filters.pool}
                onChange={(e) => setFilters({...filters, pool: e.target.value})}
              >
                <option value="">Havuz Seçin</option>
                <option value="var">Var</option>
                <option value="yok">Yok</option>
                <option value="kapalı">Kapalı</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Spor Salonu</FilterLabel>
              <FilterSelect 
                value={filters.gym}
                onChange={(e) => setFilters({...filters, gym: e.target.value})}
              >
                <option value="">Spor Salonu</option>
                <option value="var">Var</option>
                <option value="yok">Yok</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Evcil Hayvan</FilterLabel>
              <FilterSelect 
                value={filters.petFriendly}
                onChange={(e) => setFilters({...filters, petFriendly: e.target.value})}
              >
                <option value="">Evcil Hayvan</option>
                <option value="evet">Kabul</option>
                <option value="hayır">Kabul Etmez</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Kredi Uygunluğu</FilterLabel>
              <FilterSelect 
                value={filters.creditAvailable}
                onChange={(e) => setFilters({...filters, creditAvailable: e.target.value})}
              >
                <option value="">Kredi Durumu</option>
                <option value="evet">Uygun</option>
                <option value="hayır">Uygun Değil</option>
                <option value="kısmi">Kısmi</option>
              </FilterSelect>
            </FilterGroup>
          </AdvancedFiltersGrid>
        </AdvancedFilters>

        <FilterActions>
          <ActionButton variant="primary" onClick={() => {}}>
            🔍 Filtrele ({filteredProperties.length} sonuç)
          </ActionButton>
          <ActionButton variant="secondary" onClick={clearFilters}>
            🗑️ Filtreleri Temizle
          </ActionButton>
        </FilterActions>
      </FilterSection>

      <ResultsInfo>
        <ResultsCount>
          {filteredProperties.length} ilan bulundu
        </ResultsCount>
        <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">En Yeni</option>
          <option value="oldest">En Eski</option>
          <option value="price-low">Fiyat (Düşük-Yüksek)</option>
          <option value="price-high">Fiyat (Yüksek-Düşük)</option>
        </SortSelect>
      </ResultsInfo>

      {sortedProperties.length === 0 ? (
        <NoResults>
          <h3>😔 Aradığınız kriterlere uygun ilan bulunamadı</h3>
          <p>Filtrelerinizi değiştirerek daha fazla sonuç görebilirsiniz.</p>
        </NoResults>
      ) : (
        <PropertyGrid>
          {sortedProperties.map((property) => (
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
      )}
    </Container>
  );
};

export default PropertyList; 