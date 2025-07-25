import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

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
    background: radial-gradient(circle at 50% 0%, rgba(102, 126, 234, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ServiceCard = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.8s ease-out;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
  
  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  p {
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 1.5rem 0;
  }
  
  li {
    color: var(--text-secondary);
    margin-bottom: 0.8rem;
    padding-left: 1.5rem;
    position: relative;
    
    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: var(--accent-color);
      font-weight: bold;
    }
  }
`;

const CTAButton = styled.button`
  display: inline-block;
  background: var(--accent-color);
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-top: 1rem;
  border: none;
  cursor: pointer;
  
  &:hover {
    background: var(--accent-hover);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }
`;

const QuoteCalculator = styled.div`
  background: var(--card-bg);
  border-radius: 20px;
  padding: 2.5rem;
  margin: 2rem 0;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  animation: ${fadeInUp} 0.8s ease-out 0.6s both;
`;

const CalculatorTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  text-align: center;
`;

const CalculatorForm = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  font-weight: 600;
  color: var(--text-primary);
`;

const FormSelect = styled.select`
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const FormInput = styled.input`
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const CalculateButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  grid-column: 1 / -1;
  margin-top: 1rem;
  
  &:hover {
    background: var(--accent-hover);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }
`;

const QuoteResult = styled.div`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  margin-top: 2rem;
  border: 2px solid var(--accent-color);
`;

const QuoteAmount = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--accent-color);
  margin-bottom: 1rem;
`;

const QuoteDetails = styled.div`
  color: var(--text-secondary);
  font-size: 1.1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  background: white;
  color: var(--accent-color);
  border: 2px solid var(--accent-color);
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--accent-color);
    color: white;
    transform: translateY(-2px);
  }
`;

const InsurancePage: React.FC = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [quoteData, setQuoteData] = useState({
    insuranceType: 'konut',
    propertyValue: '',
    location: 'istanbul',
    coverage: 'tam'
  });
  const [quoteResult, setQuoteResult] = useState<number | null>(null);

  const handleContactClick = () => {
    window.location.href = '/contact';
  };

  const handleCalculateQuote = () => {
    // Simulate quote calculation
    const baseRates = {
      konut: 0.015,
      ticari: 0.025,
      afet: 0.008,
      kasko: 0.035,
      sorumluluk: 0.012
    };
    
    const locationMultipliers = {
      istanbul: 1.2,
      ankara: 1.0,
      izmir: 1.1,
      bursa: 0.9,
      antalya: 0.8
    };
    
    const coverageMultipliers = {
      temel: 0.7,
      standart: 1.0,
      tam: 1.3
    };

    const propertyValue = parseFloat(quoteData.propertyValue) || 500000;
    const baseRate = baseRates[quoteData.insuranceType as keyof typeof baseRates] || 0.015;
    const locationMultiplier = locationMultipliers[quoteData.location as keyof typeof locationMultipliers] || 1.0;
    const coverageMultiplier = coverageMultipliers[quoteData.coverage as keyof typeof coverageMultipliers] || 1.0;

    const annualPremium = propertyValue * baseRate * locationMultiplier * coverageMultiplier;
    setQuoteResult(Math.round(annualPremium));
  };

  return (
    <Container>
      <HeroSection>
        <Title>🛡️ Emlak Sigortası</Title>
        <Subtitle>
          Emlağınızı korumak için kapsamlı sigorta çözümleri. Farklı risklere karşı 
          güvenlik sağlayan sigorta paketlerimiz ile huzurlu olun.
        </Subtitle>
      </HeroSection>

      <QuoteCalculator>
        <CalculatorTitle>📊 Sigorta Primi Hesaplayıcı</CalculatorTitle>
        <CalculatorForm>
          <FormGroup>
            <FormLabel>Sigorta Türü</FormLabel>
            <FormSelect 
              value={quoteData.insuranceType}
              onChange={(e) => setQuoteData({...quoteData, insuranceType: e.target.value})}
            >
              <option value="konut">Konut Sigortası</option>
              <option value="ticari">Ticari Emlak Sigortası</option>
              <option value="afet">Doğal Afet Sigortası</option>
              <option value="kasko">Kasko Sigortası</option>
              <option value="sorumluluk">Sorumluluk Sigortası</option>
            </FormSelect>
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Emlak Değeri (TL)</FormLabel>
            <FormInput 
              type="number"
              placeholder="500000"
              value={quoteData.propertyValue}
              onChange={(e) => setQuoteData({...quoteData, propertyValue: e.target.value})}
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Şehir</FormLabel>
            <FormSelect 
              value={quoteData.location}
              onChange={(e) => setQuoteData({...quoteData, location: e.target.value})}
            >
              <option value="istanbul">İstanbul</option>
              <option value="ankara">Ankara</option>
              <option value="izmir">İzmir</option>
              <option value="bursa">Bursa</option>
              <option value="antalya">Antalya</option>
            </FormSelect>
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Kapsam</FormLabel>
            <FormSelect 
              value={quoteData.coverage}
              onChange={(e) => setQuoteData({...quoteData, coverage: e.target.value})}
            >
              <option value="temel">Temel Kapsam</option>
              <option value="standart">Standart Kapsam</option>
              <option value="tam">Tam Kapsam</option>
            </FormSelect>
          </FormGroup>
        </CalculatorForm>
        
        <CalculateButton onClick={handleCalculateQuote}>
          🧮 Prim Hesapla
        </CalculateButton>
        
        {quoteResult && (
          <QuoteResult>
            <QuoteAmount>₺{quoteResult.toLocaleString()}</QuoteAmount>
            <QuoteDetails>
              Yıllık sigorta primi (yaklaşık)
            </QuoteDetails>
            <ActionButtons>
              <ActionButton onClick={handleContactClick}>
                📞 Teklif Al
              </ActionButton>
              <ActionButton onClick={() => window.open('/properties', '_blank')}>
                🏠 Emlak Ara
              </ActionButton>
            </ActionButtons>
          </QuoteResult>
        )}
      </QuoteCalculator>

      <ServicesGrid>
        <ServiceCard>
          <h3>🏠 Konut Sigortası</h3>
          <p>
            Evinizi ve eşyalarınızı koruyan kapsamlı konut sigortası.
          </p>
          <ul>
            <li>Yangın ve patlama koruması</li>
            <li>Hırsızlık ve vandalizm</li>
            <li>Su hasarı koruması</li>
            <li>Doğal afet koruması</li>
          </ul>
          <CTAButton onClick={handleContactClick}>Konut Sigortası</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>🏢 Ticari Emlak Sigortası</h3>
          <p>
            İşyerinizi ve ticari varlıklarınızı koruyan özel sigorta.
          </p>
          <ul>
            <li>İşyeri sigortası</li>
            <li>Ekipman koruması</li>
            <li>İş durması sigortası</li>
            <li>Sorumluluk sigortası</li>
          </ul>
          <CTAButton onClick={handleContactClick}>Ticari Sigorta</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>🌪️ Doğal Afet Sigortası</h3>
          <p>
            Deprem, sel ve diğer doğal afetlere karşı özel koruma.
          </p>
          <ul>
            <li>Deprem sigortası (DASK)</li>
            <li>Sel ve su baskını</li>
            <li>Fırtına ve dolu hasarı</li>
            <li>Toprak kayması</li>
          </ul>
          <CTAButton onClick={handleContactClick}>Afet Sigortası</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>🚗 Kasko Sigortası</h3>
          <p>
            Araçlarınız için kapsamlı kasko sigortası hizmeti.
          </p>
          <ul>
            <li>Kaza koruması</li>
            <li>Hırsızlık koruması</li>
            <li>Doğal afet koruması</li>
            <li>Yol yardım hizmeti</li>
          </ul>
          <CTAButton onClick={handleContactClick}>Kasko Sigortası</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>👥 Sorumluluk Sigortası</h3>
          <p>
            Üçüncü şahıslara karşı sorumluluklarınızı koruyan sigorta.
          </p>
          <ul>
            <li>Genel sorumluluk sigortası</li>
            <li>Mesleki sorumluluk</li>
            <li>Ürün sorumluluğu</li>
            <li>Çevre sorumluluğu</li>
          </ul>
          <CTAButton onClick={handleContactClick}>Sorumluluk Sigortası</CTAButton>
        </ServiceCard>

        <ServiceCard>
          <h3>📊 Sigorta Danışmanlığı</h3>
          <p>
            İhtiyaçlarınıza uygun sigorta paketleri için danışmanlık.
          </p>
          <ul>
            <li>Risk analizi</li>
            <li>Sigorta paketi önerisi</li>
            <li>Prim hesaplama</li>
            <li>Hasarlı süreç takibi</li>
          </ul>
          <CTAButton onClick={handleContactClick}>Danışmanlık Al</CTAButton>
        </ServiceCard>
      </ServicesGrid>
    </Container>
  );
};

export default InsurancePage; 