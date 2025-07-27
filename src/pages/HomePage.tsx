import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { allProperties } from '../data/properties';
import { turkeyCities, allCities, propertyTypes, propertyStatus } from '../data/turkeyData';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
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

const HeroSection = styled.section`
  background: linear-gradient(135deg, #f8fffe 0%, #f0fdf4 100%);
  color: #1f2937;
  padding: 6rem 0 4rem;
  text-align: center;
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
  animation: ${fadeInUp} 1s ease-out;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.1;
  color: #1f2937;
  letter-spacing: -0.02em;
  
  span {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  margin-bottom: 2.5rem;
  color: #6b7280;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
  font-weight: 400;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const SearchSection = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 3;
  border: 1px solid #e5e7eb;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, #10b981, #059669);
    border-radius: 20px;
    z-index: -1;
    opacity: 0.1;
  }
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.2rem;
  align-items: end;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SearchGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  animation: ${slideIn} 0.6s ease-out;
`;

const SearchLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.2rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SearchSelect = styled.select`
  padding: 0.8rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 0.9rem;
  background: #ffffff;
  color: #374151;
  outline: none;
  transition: all 0.2s ease;
  font-weight: 500;
  
  &:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  
  option {
    background: #ffffff;
    color: #374151;
    font-weight: 500;
  }
`;

const SearchInput = styled.input`
  padding: 0.8rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 0.9rem;
  background: #ffffff;
  color: #374151;
  outline: none;
  transition: all 0.2s ease;
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

const SearchButton = styled.button`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  grid-column: span 1;
  
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
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const FeaturesSection = styled.section`
  padding: 8rem 0;
  background: #ffffff;
  position: relative;
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #1f2937;
  text-align: center;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  
  span {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #6b7280;
  text-align: center;
  margin-bottom: 5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
  font-weight: 400;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
`;

const FeatureCard = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid #f3f4f6;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.8s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #10b981, #059669);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: #10b981;
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
    border-radius: 50%;
    z-index: -1;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #6b7280;
  line-height: 1.7;
  font-size: 1rem;
  font-weight: 400;
`;

const StatsSection = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  color: #1f2937;
  position: relative;
  border-top: 1px solid #e5e7eb;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2310b981' fill-opacity='0.05'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20zm0 0c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z'/%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 4rem;
  text-align: center;
`;

const StatItem = styled.div`
  animation: ${fadeInUp} 0.8s ease-out;
  
  h3 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 800;
    margin-bottom: 0.5rem;
    color: #10b981;
    letter-spacing: -0.02em;
  }
  
  p {
    font-size: 1.2rem;
    color: #6b7280;
    font-weight: 500;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 1.2rem 2.5rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 4rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
    
    &::before {
      left: 100%;
    }
  }
`;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    city: '',
    district: '',
    neighborhood: '',
    type: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    rooms: '',
    floor: '',
    age: '',
    heating: '',
    parking: ''
  });

  const [availableDistricts, setAvailableDistricts] = useState<Array<{id: number, name: string, neighborhoods: Array<{id: number, name: string}>}>>([]);
  const [availableNeighborhoods, setAvailableNeighborhoods] = useState<Array<{id: number, name: string}>>([]);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // İl seçildiğinde ilçeleri güncelle
  useEffect(() => {
    if (searchData.city) {
      const selectedCity = turkeyCities.find(city => city.name === searchData.city);
      if (selectedCity) {
        setAvailableDistricts(selectedCity.districts);
        setSearchData(prev => ({ ...prev, district: '', neighborhood: '' }));
        setAvailableNeighborhoods([]);
      }
    } else {
      setAvailableDistricts([]);
      setAvailableNeighborhoods([]);
    }
  }, [searchData.city]);

  // İlçe seçildiğinde mahalleleri güncelle
  useEffect(() => {
    if (searchData.district) {
      const selectedDistrict = availableDistricts.find(district => district.name === searchData.district);
      if (selectedDistrict) {
        setAvailableNeighborhoods(selectedDistrict.neighborhoods);
        setSearchData(prev => ({ ...prev, neighborhood: '' }));
      }
    } else {
      setAvailableNeighborhoods([]);
    }
  }, [searchData.district, availableDistricts]);

  // Fiyat validasyonu
  useEffect(() => {
    const newErrors: {[key: string]: string} = {};
    
    if (searchData.minPrice && searchData.maxPrice) {
      const minPrice = parseInt(searchData.minPrice);
      const maxPrice = parseInt(searchData.maxPrice);
      
      if (minPrice < 0) {
        newErrors.minPrice = 'Min fiyat 0\'dan küçük olamaz';
      }
      
      if (minPrice > maxPrice) {
        newErrors.maxPrice = 'Max fiyat min fiyattan küçük olamaz';
      }
    }
    
    if (searchData.minPrice && parseInt(searchData.minPrice) < 0) {
      newErrors.minPrice = 'Min fiyat 0\'dan küçük olamaz';
    }
    
    setErrors(newErrors);
  }, [searchData.minPrice, searchData.maxPrice]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasyon kontrolü
    if (Object.keys(errors).length > 0) {
      return;
    }
    
    navigate('/properties');
  };

  const handleInputChange = (field: string, value: string) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>
            Hayalinizdeki <span>Evi</span> Bulun
          </HeroTitle>
          <HeroSubtitle>
            Türkiye'nin en güvenilir emlak platformunda binlerce ilan arasından size en uygun olanını seçin.
          </HeroSubtitle>
          
          <SearchSection>
            <SearchForm onSubmit={handleSearch}>
              <SearchGroup>
                <SearchLabel>İl</SearchLabel>
                <SearchSelect 
                  value={searchData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                >
                  <option value="">İl Seçin</option>
                  {allCities.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                  ))}
                </SearchSelect>
              </SearchGroup>
              
              <SearchGroup>
                <SearchLabel>İlçe</SearchLabel>
                <SearchSelect 
                  value={searchData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  disabled={!searchData.city}
                  required
                >
                  <option value="">İlçe Seçin</option>
                  {availableDistricts.map((district) => (
                    <option key={district.id} value={district.name}>{district.name}</option>
                  ))}
                </SearchSelect>
              </SearchGroup>
              
              <SearchGroup>
                <SearchLabel>Mahalle</SearchLabel>
                <SearchSelect 
                  value={searchData.neighborhood}
                  onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                  disabled={!searchData.district}
                >
                  <option value="">Mahalle Seçin</option>
                  {availableNeighborhoods.map((neighborhood) => (
                    <option key={neighborhood.id} value={neighborhood.name}>{neighborhood.name}</option>
                  ))}
                </SearchSelect>
              </SearchGroup>
              
              <SearchGroup>
                <SearchLabel>Durum</SearchLabel>
                <SearchSelect 
                  value={searchData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                >
                  <option value="">Durum Seçin</option>
                  {propertyStatus.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                  ))}
                </SearchSelect>
              </SearchGroup>
              
              <SearchGroup>
                <SearchLabel>Konut Tipi</SearchLabel>
                <SearchSelect 
                  value={searchData.propertyType}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                >
                  <option value="">Tip Seçin</option>
                  {propertyTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </SearchSelect>
              </SearchGroup>
              
              <SearchGroup>
                <SearchLabel>Oda Sayısı</SearchLabel>
                <SearchSelect 
                  value={searchData.rooms}
                  onChange={(e) => handleInputChange('rooms', e.target.value)}
                >
                  <option value="">Oda Seçin</option>
                  <option value="1+1">1+1</option>
                  <option value="2+1">2+1</option>
                  <option value="3+1">3+1</option>
                  <option value="4+1">4+1</option>
                  <option value="5+">5+</option>
                </SearchSelect>
              </SearchGroup>
              
              <SearchGroup>
                <SearchLabel>Min Fiyat</SearchLabel>
                <SearchInput 
                  type="number"
                  placeholder="Min TL"
                  value={searchData.minPrice}
                  onChange={(e) => handleInputChange('minPrice', e.target.value)}
                  min="0"
                  style={{ borderColor: errors.minPrice ? '#ef4444' : '#e5e7eb' }}
                />
                {errors.minPrice && <small style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.minPrice}</small>}
              </SearchGroup>
              
              <SearchGroup>
                <SearchLabel>Max Fiyat</SearchLabel>
                <SearchInput 
                  type="number"
                  placeholder="Max TL"
                  value={searchData.maxPrice}
                  onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                  min="0"
                  style={{ borderColor: errors.maxPrice ? '#ef4444' : '#e5e7eb' }}
                />
                {errors.maxPrice && <small style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.maxPrice}</small>}
              </SearchGroup>
              
              <SearchGroup>
                <SearchLabel>Kat</SearchLabel>
                <SearchSelect 
                  value={searchData.floor}
                  onChange={(e) => handleInputChange('floor', e.target.value)}
                >
                  <option value="">Kat Seçin</option>
                  <option value="ground">Zemin</option>
                  <option value="1">1. Kat</option>
                  <option value="2">2. Kat</option>
                  <option value="3">3. Kat</option>
                  <option value="4+">4+ Kat</option>
                </SearchSelect>
              </SearchGroup>
              
              <SearchGroup>
                <SearchLabel>Bina Yaşı</SearchLabel>
                <SearchSelect 
                  value={searchData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                >
                  <option value="">Yaş Seçin</option>
                  <option value="0-1">0-1 Yaş</option>
                  <option value="1-5">1-5 Yaş</option>
                  <option value="5-10">5-10 Yaş</option>
                  <option value="10+">10+ Yaş</option>
                </SearchSelect>
              </SearchGroup>
              
              <SearchGroup>
                <SearchLabel>Isıtma</SearchLabel>
                <SearchSelect 
                  value={searchData.heating}
                  onChange={(e) => handleInputChange('heating', e.target.value)}
                >
                  <option value="">Isıtma Seçin</option>
                  <option value="central">Merkezi</option>
                  <option value="individual">Bireysel</option>
                  <option value="natural-gas">Doğalgaz</option>
                  <option value="electric">Elektrik</option>
                </SearchSelect>
              </SearchGroup>
              
              <SearchButton type="submit" disabled={Object.keys(errors).length > 0}>
                🔍 Ara
              </SearchButton>
            </SearchForm>
          </SearchSection>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <FeaturesContainer>
          <SectionTitle>
            Neden <span>Bizi</span> Seçmelisiniz?
          </SectionTitle>
          <SectionSubtitle>
            Emlak dünyasında güvenilir ve kaliteli hizmet için doğru adrestesiniz
          </SectionSubtitle>
          
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>🏠</FeatureIcon>
              <FeatureTitle>Geniş İlan Portföyü</FeatureTitle>
              <FeatureDescription>
                Binlerce emlak ilanı arasından size en uygun olanını bulun. Her bütçe ve zevke uygun seçenekler.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>🔒</FeatureIcon>
              <FeatureTitle>Güvenli İşlemler</FeatureTitle>
              <FeatureDescription>
                Tüm işlemleriniz güvenli altyapımız ile korunur. Verileriniz şifrelenir ve güvende kalır.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>👥</FeatureIcon>
              <FeatureTitle>Uzman Danışmanlık</FeatureTitle>
              <FeatureDescription>
                Deneyimli emlak danışmanlarımız size en uygun seçenekleri sunar ve süreç boyunca yanınızda olur.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>📱</FeatureIcon>
              <FeatureTitle>Mobil Uygulama</FeatureTitle>
              <FeatureDescription>
                Mobil uygulamamız ile istediğiniz yerden ilanları görüntüleyin ve takip edin.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>⚡</FeatureIcon>
              <FeatureTitle>Hızlı Hizmet</FeatureTitle>
              <FeatureDescription>
                Hızlı arama, anında bildirimler ve kolay iletişim ile zamanınızı tasarruf edin.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>💎</FeatureIcon>
              <FeatureTitle>Premium Kalite</FeatureTitle>
              <FeatureDescription>
                Sadece kaliteli ve güvenilir ilanları sizlere sunuyoruz. Kalite standartlarımız yüksektir.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>

      <StatsSection>
        <StatsContainer>
          <StatsGrid>
            <StatItem>
              <h3>50,000+</h3>
              <p>Aktif İlan</p>
            </StatItem>
            <StatItem>
              <h3>25,000+</h3>
              <p>Mutlu Müşteri</p>
            </StatItem>
            <StatItem>
              <h3>15+</h3>
              <p>Yıllık Deneyim</p>
            </StatItem>
            <StatItem>
              <h3>%98</h3>
              <p>Müşteri Memnuniyeti</p>
            </StatItem>
          </StatsGrid>
          
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <CTAButton to="/properties">
              Tüm İlanları Görüntüle
            </CTAButton>
          </div>
        </StatsContainer>
      </StatsSection>
    </>
  );
};

export default HomePage; 