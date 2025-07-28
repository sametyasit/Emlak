import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { allProperties } from '../data/properties';
import { useAuth } from '../contexts/AuthContext';

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
  font-size: 1.2rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FilterSection = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
  border: 1px solid #e2e8f0;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

const FilterToggle = styled.button`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;
  }
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const AdvancedFiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #f1f5f9;
  animation: ${slideIn} 0.5s ease-out;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;
`;

const FilterInput = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

const PriceRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PriceInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const PriceSeparator = styled.span`
  color: #64748b;
  font-weight: 600;
  padding: 0 0.5rem;
`;

const ClearFiltersButton = styled.button`
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background: #e5e7eb;
    transform: translateY(-1px);
  }
`;

const ResultsSection = styled.div`
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ResultsCount = styled.div`
  font-size: 1.1rem;
  color: #64748b;
  font-weight: 500;
`;

const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

const PropertiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const PropertyCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #e2e8f0;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
`;

const PropertyImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #94a3b8;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px 12px 0 0;
  }

  .fallback-image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 3rem;
    color: #94a3b8;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: ${shimmer} 2s infinite;
  }
`;

const PropertyContent = styled.div`
  padding: 1.5rem;
`;

const PropertyTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const PropertyLocation = styled.p`
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PropertyDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const PropertyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;
`;

const PropertyPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #10b981;
`;

const PropertyType = styled.span`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const AdminActions = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const DeleteButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #dc2626;
    transform: scale(1.05);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const EmptyText = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #374151;
`;

const EmptySubtext = styled.p`
  font-size: 1.1rem;
  opacity: 0.7;
`;

const PropertyList: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [properties, setProperties] = useState<any[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  const [filters, setFilters] = useState({
    search: '',
    type: '',
    city: '',
    district: '',
    minPrice: '',
    maxPrice: '',
    rooms: '',
    minArea: '',
    maxArea: '',
    age: '',
    heating: '',
    parking: '',
    balcony: '',
    furnished: '',
    elevator: '',
    security: '',
    inComplex: '',
    siteInside: '',
    seaView: '',
    nearMetro: '',
    metroNearby: '',
    garden: '',
    pool: '',
    gym: '',
    petFriendly: '',
    loanEligible: ''
  });

  const getProperties = () => {
    try {
      const storedProperties = localStorage.getItem('properties');
      if (storedProperties) {
        return JSON.parse(storedProperties);
      }
    } catch (error) {
      console.error('Properties yüklenirken hata:', error);
    }
    return allProperties;
  };

  useEffect(() => {
    const props = getProperties();
    setProperties(props);
    setFilteredProperties(props);
  }, []);

  useEffect(() => {
    let filtered = [...properties];

    // Arama filtresi
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter((property: any) =>
        property.title?.toLowerCase().includes(searchTerm) ||
        property.location?.toLowerCase().includes(searchTerm) ||
        property.city?.toLowerCase().includes(searchTerm) ||
        property.district?.toLowerCase().includes(searchTerm) ||
        property.price?.toString().includes(searchTerm) ||
        property.rooms?.toLowerCase().includes(searchTerm)
      );
    }

    // İlan türü filtresi
    if (filters.type) {
      filtered = filtered.filter((property: any) => property.type === filters.type);
    }

    // Şehir filtresi
    if (filters.city) {
      filtered = filtered.filter((property: any) => 
        property.city?.toLowerCase() === filters.city.toLowerCase()
      );
    }

    // İlçe filtresi
    if (filters.district) {
      filtered = filtered.filter((property: any) => 
        property.district?.toLowerCase() === filters.district.toLowerCase()
      );
    }

    // Fiyat filtresi
    if (filters.minPrice) {
      filtered = filtered.filter((property: any) => property.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter((property: any) => property.price <= parseInt(filters.maxPrice));
    }

    // Oda sayısı filtresi
    if (filters.rooms) {
      filtered = filtered.filter((property: any) => property.rooms === filters.rooms);
    }

    // Metrekare filtresi
    if (filters.minArea) {
      filtered = filtered.filter((property: any) => property.area >= parseInt(filters.minArea));
    }
    if (filters.maxArea) {
      filtered = filtered.filter((property: any) => property.area <= parseInt(filters.maxArea));
    }

    // Gelişmiş filtreler
    if (filters.age) {
      filtered = filtered.filter((property: any) => property.buildingAge === filters.age);
    }

    if (filters.heating) {
      filtered = filtered.filter((property: any) => property.heating === filters.heating);
    }

    if (filters.parking) {
      filtered = filtered.filter((property: any) => property.parking === filters.parking);
    }

    if (filters.balcony) {
      filtered = filtered.filter((property: any) => property.balcony === filters.balcony);
    }

    if (filters.furnished) {
      filtered = filtered.filter((property: any) => property.furnished === filters.furnished);
    }

    if (filters.elevator) {
      filtered = filtered.filter((property: any) => property.elevator === filters.elevator);
    }

    if (filters.security) {
      filtered = filtered.filter((property: any) => property.security === filters.security);
    }

    if (filters.inComplex) {
      filtered = filtered.filter((property: any) => property.inComplex === filters.inComplex);
    }

    if (filters.seaView) {
      filtered = filtered.filter((property: any) => property.seaView === filters.seaView);
    }

    if (filters.nearMetro) {
      filtered = filtered.filter((property: any) => property.nearMetro === filters.nearMetro);
    }

    if (filters.garden) {
      filtered = filtered.filter((property: any) => property.garden === filters.garden);
    }

    if (filters.pool) {
      filtered = filtered.filter((property: any) => property.pool === filters.pool);
    }

    if (filters.gym) {
      filtered = filtered.filter((property: any) => property.gym === filters.gym);
    }

    if (filters.petFriendly) {
      filtered = filtered.filter((property: any) => property.petFriendly === filters.petFriendly);
    }

    if (filters.loanEligible) {
      filtered = filtered.filter((property: any) => property.loanEligible === filters.loanEligible);
    }

    setFilteredProperties(filtered);
     }, [properties, filters]);

  const handleDeleteProperty = (propertyId: number) => {
    if (showDeleteConfirm === propertyId) {
      // Silme işlemi
      const updatedProperties = properties.filter((p: any) => p.id !== propertyId);
      setProperties(updatedProperties);
      setFilteredProperties(updatedProperties);
      
      // LocalStorage'ı güncelle
      try {
        const storedProperties = localStorage.getItem('properties');
        if (storedProperties) {
          const parsed = JSON.parse(storedProperties);
          const filtered = parsed.filter((p: any) => p.id !== propertyId);
          localStorage.setItem('properties', JSON.stringify(filtered));
        }
      } catch (error) {
        console.error('Property silinirken hata:', error);
      }
      
      setShowDeleteConfirm(null);
    } else {
      setShowDeleteConfirm(propertyId);
    }
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      type: '',
      city: '',
      district: '',
      minPrice: '',
      maxPrice: '',
      rooms: '',
      minArea: '',
      maxArea: '',
      age: '',
      heating: '',
      parking: '',
      balcony: '',
      furnished: '',
      elevator: '',
      security: '',
      inComplex: '',
      siteInside: '',
      seaView: '',
      nearMetro: '',
      metroNearby: '',
      garden: '',
      pool: '',
      gym: '',
      petFriendly: '',
      loanEligible: ''
    });
  };

  // Sıralama işlemi
  const sortedProperties = React.useMemo(() => {
    let sorted = [...filteredProperties];
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a: any, b: any) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a: any, b: any) => b.price - a.price);
      case 'newest':
        return sorted.sort((a: any, b: any) => b.id - a.id);
      case 'oldest':
        return sorted.sort((a: any, b: any) => a.id - b.id);
      default:
        return sorted;
    }
  }, [filteredProperties, sortBy]);

  const getTypeComponent = (type: string) => {
    switch (type) {
      case 'Satılık':
        return <PropertyType>Satılık</PropertyType>;
      case 'Kiralık':
        return <PropertyType>Kiralık</PropertyType>;
      case 'Günlük Kiralık':
        return <PropertyType>Günlük Kiralık</PropertyType>;
      default:
        return <PropertyType>Proje</PropertyType>;
    }
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
            🔍 Filtreler
          </FilterTitle>
          <FilterToggle onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
            {showAdvancedFilters ? 'Basit Filtreler' : 'Gelişmiş Filtreler'}
          </FilterToggle>
        </FilterHeader>

        {/* Klasik Filtreler - Her zaman görünür */}
        <FilterGrid>
          <FilterGroup>
            <FilterLabel>Arama</FilterLabel>
            <FilterInput 
              type="text"
              placeholder="Ev, şehir veya ilçe adı ile arayın"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
            />
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>İlan Türü</FilterLabel>
            <FilterSelect 
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
            >
              <option value="">Tüm Türler</option>
              <option value="Satılık">Satılık</option>
              <option value="Kiralık">Kiralık</option>
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
            <FilterLabel>İlçe</FilterLabel>
            <FilterSelect 
              value={filters.district}
              onChange={(e) => setFilters({...filters, district: e.target.value})}
            >
              <option value="">Tüm İlçeler</option>
              <option value="kadikoy">Kadıköy</option>
              <option value="besiktas">Beşiktaş</option>
              <option value="sisli">Şişli</option>
              <option value="uskudar">Üsküdar</option>
              <option value="fatih">Fatih</option>
            </FilterSelect>
          </FilterGroup>
        </FilterGrid>

        {/* Gelişmiş Filtreler - Butona basınca açılır */}
        {showAdvancedFilters && (
          <AdvancedFiltersGrid>
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

            <FilterGroup>
              <FilterLabel>Oda Sayısı</FilterLabel>
              <FilterSelect 
                value={filters.rooms}
                onChange={(e) => setFilters({...filters, rooms: e.target.value})}
              >
                <option value="">Tüm Odalar</option>
                <option value="1+0">1+0</option>
                <option value="1+1">1+1</option>
                <option value="2+1">2+1</option>
                <option value="3+1">3+1</option>
                <option value="4+1">4+1</option>
                <option value="5+">5+</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Metrekare Aralığı</FilterLabel>
              <PriceRangeContainer>
                <PriceInput 
                  type="number"
                  placeholder="Min m²"
                  value={filters.minArea}
                  onChange={(e) => setFilters({...filters, minArea: e.target.value})}
                />
                <PriceSeparator>-</PriceSeparator>
                <PriceInput 
                  type="number"
                  placeholder="Max m²"
                  value={filters.maxArea}
                  onChange={(e) => setFilters({...filters, maxArea: e.target.value})}
                />
              </PriceRangeContainer>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Bina Yaşı</FilterLabel>
              <FilterSelect 
                value={filters.age}
                onChange={(e) => setFilters({...filters, age: e.target.value})}
              >
                <option value="">Tüm Yaşlar</option>
                <option value="0">Sıfır Bina</option>
                <option value="1">1 Yaşında</option>
                <option value="2-5">2-5 Yaşında</option>
                <option value="6-10">6-10 Yaşında</option>
                <option value="11-20">11-20 Yaşında</option>
                <option value="20+">20+ Yaşında</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Isıtma</FilterLabel>
              <FilterSelect 
                value={filters.heating}
                onChange={(e) => setFilters({...filters, heating: e.target.value})}
              >
                <option value="">Tüm Isıtma</option>
                <option value="Merkezi">Merkezi</option>
                <option value="Kombi">Kombi</option>
                <option value="Doğalgaz">Doğalgaz</option>
                <option value="Elektrik">Elektrik</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Otopark</FilterLabel>
              <FilterSelect 
                value={filters.parking}
                onChange={(e) => setFilters({...filters, parking: e.target.value})}
              >
                <option value="">Tüm Seçenekler</option>
                <option value="Var">Var</option>
                <option value="Yok">Yok</option>
                <option value="Ücretli">Ücretli</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Balkon</FilterLabel>
              <FilterSelect 
                value={filters.balcony}
                onChange={(e) => setFilters({...filters, balcony: e.target.value})}
              >
                <option value="">Tüm Seçenekler</option>
                <option value="Var">Var</option>
                <option value="Yok">Yok</option>
                <option value="Kapalı">Kapalı</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Eşyalı</FilterLabel>
              <FilterSelect 
                value={filters.furnished}
                onChange={(e) => setFilters({...filters, furnished: e.target.value})}
              >
                <option value="">Tüm Seçenekler</option>
                <option value="Evet">Evet</option>
                <option value="Hayır">Hayır</option>
                <option value="Yarı">Yarı Eşyalı</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Asansör</FilterLabel>
              <FilterSelect 
                value={filters.elevator}
                onChange={(e) => setFilters({...filters, elevator: e.target.value})}
              >
                <option value="">Asansör Seçin</option>
                <option value="Var">Var</option>
                <option value="Yok">Yok</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Güvenlik</FilterLabel>
              <FilterSelect 
                value={filters.security}
                onChange={(e) => setFilters({...filters, security: e.target.value})}
              >
                <option value="">Güvenlik Seçin</option>
                <option value="Var">Var</option>
                <option value="Yok">Yok</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Site İçinde</FilterLabel>
              <FilterSelect 
                value={filters.inComplex}
                onChange={(e) => setFilters({...filters, inComplex: e.target.value})}
              >
                <option value="">Site Durumu</option>
                <option value="Evet">Evet</option>
                <option value="Hayır">Hayır</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Deniz Manzarası</FilterLabel>
              <FilterSelect 
                value={filters.seaView}
                onChange={(e) => setFilters({...filters, seaView: e.target.value})}
              >
                <option value="">Manzara Seçin</option>
                <option value="Evet">Evet</option>
                <option value="Hayır">Hayır</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Metro Yakını</FilterLabel>
              <FilterSelect 
                value={filters.nearMetro}
                onChange={(e) => setFilters({...filters, nearMetro: e.target.value})}
              >
                <option value="">Metro Durumu</option>
                <option value="Evet">Evet</option>
                <option value="Hayır">Hayır</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Bahçe</FilterLabel>
              <FilterSelect 
                value={filters.garden}
                onChange={(e) => setFilters({...filters, garden: e.target.value})}
              >
                <option value="">Bahçe Seçin</option>
                <option value="Evet">Evet</option>
                <option value="Hayır">Hayır</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Havuz</FilterLabel>
              <FilterSelect 
                value={filters.pool}
                onChange={(e) => setFilters({...filters, pool: e.target.value})}
              >
                <option value="">Havuz Seçin</option>
                <option value="Evet">Evet</option>
                <option value="Hayır">Hayır</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Spor Salonu</FilterLabel>
              <FilterSelect 
                value={filters.gym}
                onChange={(e) => setFilters({...filters, gym: e.target.value})}
              >
                <option value="">Spor Salonu</option>
                <option value="Var">Var</option>
                <option value="Yok">Yok</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Evcil Hayvan</FilterLabel>
              <FilterSelect 
                value={filters.petFriendly}
                onChange={(e) => setFilters({...filters, petFriendly: e.target.value})}
              >
                <option value="">Evcil Hayvan</option>
                <option value="Evet">Kabul</option>
                <option value="Hayır">Kabul Etmez</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Kredi Uygunluğu</FilterLabel>
              <FilterSelect 
                value={filters.loanEligible}
                onChange={(e) => setFilters({...filters, loanEligible: e.target.value})}
              >
                <option value="">Kredi Durumu</option>
                <option value="Evet">Uygun</option>
                <option value="Hayır">Uygun Değil</option>
                <option value="Kısmi">Kısmi</option>
              </FilterSelect>
            </FilterGroup>
          </AdvancedFiltersGrid>
        )}

        <ClearFiltersButton onClick={clearFilters}>
          🗑️ Filtreleri Temizle
        </ClearFiltersButton>
      </FilterSection>

      <ResultsSection>
        <ResultsHeader>
          <ResultsCount>
            {sortedProperties.length} ilan bulundu
          </ResultsCount>
          <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">En Yeni</option>
            <option value="oldest">En Eski</option>
            <option value="price-low">Fiyat (Düşük-Yüksek)</option>
            <option value="price-high">Fiyat (Yüksek-Düşük)</option>
          </SortSelect>
        </ResultsHeader>

        {sortedProperties.length > 0 ? (
          <PropertiesGrid>
            {sortedProperties.map((property: any) => (
              <PropertyCard key={property.id} onClick={() => navigate(`/property/${property.id}`)}>
                {isAdmin && (
                  <AdminActions>
                    <DeleteButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProperty(property.id);
                      }}
                    >
                      {showDeleteConfirm === property.id ? 'Onayla' : 'Sil'}
                    </DeleteButton>
                  </AdminActions>
                )}
                
                <PropertyImage>
                  {property.image ? (
                    <img 
                      src={property.image} 
                      alt={property.title}
                      onError={(e) => {
                        const target = e.currentTarget as HTMLElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="fallback-image" style={{ display: property.image ? 'none' : 'flex' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏠</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{property.title}</div>
                    </div>
                  </div>
                </PropertyImage>
                <PropertyContent>
                  <PropertyTitle>{property.title}</PropertyTitle>
                  <PropertyLocation>
                    📍 {property.location}, {property.city}
                  </PropertyLocation>
                  <PropertyDetails>
                    <PropertyInfo>
                      🏠 {property.rooms} • 📏 {property.area}m²
                    </PropertyInfo>
                    {getTypeComponent(property.type)}
                  </PropertyDetails>
                  <PropertyPrice>
                    {property.price ? `${property.price.toLocaleString('tr-TR')} TL` : 'Fiyat belirtilmemiş'}
                  </PropertyPrice>
                </PropertyContent>
              </PropertyCard>
            ))}
          </PropertiesGrid>
        ) : (
          <EmptyState>
            <EmptyIcon>🔍</EmptyIcon>
            <EmptyText>İlan bulunamadı</EmptyText>
            <EmptySubtext>
              Arama kriterlerinizi değiştirerek tekrar deneyin
            </EmptySubtext>
          </EmptyState>
        )}
      </ResultsSection>
    </Container>
  );
};

export default PropertyList; 