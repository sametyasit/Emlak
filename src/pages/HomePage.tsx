import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { allProperties } from '../data/properties';
import { useTheme } from '../contexts/ThemeContext';

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

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8rem 0 6rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 80%);
    animation: ${float} 20s ease-in-out infinite;
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
  font-size: 4.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  line-height: 1.1;
  position: relative;
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 4px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 3rem;
  opacity: 0.95;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  font-weight: 300;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const SearchSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 3;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px 20px 0 0;
  }
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  align-items: end;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SearchGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SearchLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.3rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SearchSelect = styled.select`
  padding: 1rem 1.2rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:focus {
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
  }
  
  option {
    background: var(--bg-primary);
    color: var(--text-primary);
  }
`;

const SearchInput = styled.input`
  padding: 1rem 1.2rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:focus {
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const SearchButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1.2rem 2.5rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const FeaturesSection = styled.section`
  padding: 8rem 0;
  background: var(--bg-primary);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: radial-gradient(circle at 30% 20%, rgba(102, 126, 234, 0.03) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 1.5rem;
  background: var(--gradient-secondary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
`;

const FeatureCard = styled.div`
  background: var(--card-bg);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border-color);
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
    height: 3px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    background: var(--card-hover);
    
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
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    opacity: 0.06;
    z-index: -1;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 1rem;
`;

const StatsSection = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
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
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  p {
    font-size: 1.2rem;
    opacity: 0.9;
    font-weight: 500;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 3rem;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.2);
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`;

const HomePage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    city: '',
    district: '',
    neighborhood: '',
    type: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    rooms: ''
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
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
          <HeroTitle>Hayalinizdeki Evi Bulun</HeroTitle>
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
                >
                  <option value="">İl Seçin</option>
                  <option value="istanbul">İstanbul</option>
                  <option value="ankara">Ankara</option>
                  <option value="izmir">İzmir</option>
                  <option value="bursa">Bursa</option>
                  <option value="antalya">Antalya</option>
                </SearchSelect>
              </SearchGroup>
              
              <SearchGroup>
                <SearchLabel>İlçe</SearchLabel>
                <SearchSelect 
                  value={searchData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                >
                  <option value="">İlçe Seçin</option>
                  <option value="kadikoy">Kadıköy</option>
                  <option value="besiktas">Beşiktaş</option>
                  <option value="sisli">Şişli</option>
                  <option value="uskudar">Üsküdar</option>
                </SearchSelect>
              </SearchGroup>
              
              <SearchGroup>
                <SearchLabel>Mahalle</SearchLabel>
                <SearchSelect 
                  value={searchData.neighborhood}
                  onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                >
                  <option value="">Mahalle Seçin</option>
                  <option value="moda">Moda</option>
                  <option value="fenerbahce">Fenerbahçe</option>
                  <option value="caddebostan">Caddebostan</option>
                </SearchSelect>
              </SearchGroup>
              
              <SearchGroup>
                <SearchLabel>Durum</SearchLabel>
                <SearchSelect 
                  value={searchData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                >
                  <option value="">Durum Seçin</option>
                  <option value="sale">Satılık</option>
                  <option value="rent">Kiralık</option>
                </SearchSelect>
              </SearchGroup>
              
              <SearchGroup>
                <SearchLabel>Konut Tipi</SearchLabel>
                <SearchSelect 
                  value={searchData.propertyType}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                >
                  <option value="">Tip Seçin</option>
                  <option value="apartment">Daire</option>
                  <option value="villa">Villa</option>
                  <option value="house">Müstakil Ev</option>
                  <option value="residence">Rezidans</option>
                </SearchSelect>
              </SearchGroup>
              
              <SearchGroup>
                <SearchLabel>Min Fiyat</SearchLabel>
                <SearchInput 
                  type="number"
                  placeholder="Min TL"
                  value={searchData.minPrice}
                  onChange={(e) => handleInputChange('minPrice', e.target.value)}
                />
              </SearchGroup>
              
              <SearchGroup>
                <SearchLabel>Max Fiyat</SearchLabel>
                <SearchInput 
                  type="number"
                  placeholder="Max TL"
                  value={searchData.maxPrice}
                  onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                />
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
              
              <SearchButton type="submit">
                🔍 Ara
              </SearchButton>
            </SearchForm>
          </SearchSection>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <FeaturesContainer>
          <SectionTitle>Neden Bizi Seçmelisiniz?</SectionTitle>
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