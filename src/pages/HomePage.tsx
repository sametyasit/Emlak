import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const SearchSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: 0 auto;
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 1rem;
  align-items: end;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SearchInput = styled.input`
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SearchButton = styled.button`
  background: #667eea;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #5a67d8;
    transform: translateY(-2px);
  }
`;

const FeaturesSection = styled.section`
  padding: 5rem 0;
  background: white;
`;

const FeaturesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 2rem;
  border-radius: 12px;
  background: #f8fafc;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
`;

const FeatureDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
`;

const StatsSection = styled.section`
  background: #1e293b;
  color: white;
  padding: 4rem 0;
`;

const StatsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatItem = styled.div`
  h3 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #667eea;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1.1rem;
    opacity: 0.8;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: #667eea;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #5a67d8;
    transform: translateY(-2px);
  }
`;

const HomePage: React.FC = () => {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Arama işlemi burada yapılacak
  };

  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Hayalinizdeki Evi Bulun</HeroTitle>
          <HeroSubtitle>
            Türkiye'nin en güvenilir emlak platformunda binlerce ilan arasından 
            size en uygun olanını seçin.
          </HeroSubtitle>
          
          <SearchSection>
            <SearchForm onSubmit={handleSearch}>
              <SearchInput 
                type="text" 
                placeholder="Şehir, ilçe veya mahalle ara..."
              />
              <SearchInput 
                type="text" 
                placeholder="Fiyat aralığı"
              />
              <SearchButton type="submit">
                🔍 Ara
              </SearchButton>
            </SearchForm>
          </SearchSection>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>🏠</FeatureIcon>
            <FeatureTitle>Geniş İlan Seçeneği</FeatureTitle>
            <FeatureDescription>
              Binlerce emlak ilanı arasından size en uygun olanını bulun. 
              Satılık, kiralık, günlük kiralık seçenekleri.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🔒</FeatureIcon>
            <FeatureTitle>Güvenli İşlem</FeatureTitle>
            <FeatureDescription>
              Tüm işlemleriniz güvenli bir şekilde gerçekleştirilir. 
              SSL sertifikası ve güvenlik protokolleri ile korunur.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>👨‍💼</FeatureIcon>
            <FeatureTitle>Uzman Danışmanlık</FeatureTitle>
            <FeatureDescription>
              Deneyimli emlak danışmanlarımız size en uygun seçenekleri 
              sunar ve süreç boyunca yanınızda olur.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <StatsSection>
        <StatsGrid>
          <StatItem>
            <h3>10,000+</h3>
            <p>Aktif İlan</p>
          </StatItem>
          <StatItem>
            <h3>5,000+</h3>
            <p>Mutlu Müşteri</p>
          </StatItem>
          <StatItem>
            <h3>50+</h3>
            <p>Şehir</p>
          </StatItem>
          <StatItem>
            <h3>24/7</h3>
            <p>Destek</p>
          </StatItem>
        </StatsGrid>
      </StatsSection>

      <FeaturesSection>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
            Hemen Başlayın
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2rem' }}>
            Hayalinizdeki evi bulmak için hemen aramaya başlayın veya 
            hesabınızı oluşturun.
          </p>
          <CTAButton to="/properties">
            Emlakları Görüntüle
          </CTAButton>
        </div>
      </FeaturesSection>
    </>
  );
};

export default HomePage; 