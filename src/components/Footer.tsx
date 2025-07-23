import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #1e293b;
  color: white;
  padding: 3rem 0 1rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: #f1f5f9;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: 600;
  }
  
  p, a {
    color: #cbd5e1;
    line-height: 1.6;
    margin-bottom: 0.5rem;
  }
  
  a {
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #f1f5f9;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #334155;
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #667eea;
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #334155;
  padding-top: 1rem;
  text-align: center;
  color: #94a3b8;
  font-size: 0.9rem;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>🏠 Emlak</h3>
            <p>
              Hayalinizdeki evi bulmanız için en güvenilir emlak platformu. 
              Kaliteli hizmet ve güvenilir çözümler sunuyoruz.
            </p>
            <SocialLinks>
              <SocialLink href="#" aria-label="Facebook">
                📘
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                🐦
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                📷
              </SocialLink>
              <SocialLink href="#" aria-label="LinkedIn">
                💼
              </SocialLink>
            </SocialLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Hızlı Linkler</h3>
            <a href="/">Ana Sayfa</a>
            <a href="/properties">Emlaklar</a>
            <a href="/about">Hakkımızda</a>
            <a href="/contact">İletişim</a>
            <a href="/blog">Blog</a>
          </FooterSection>
          
          <FooterSection>
            <h3>Hizmetler</h3>
            <a href="/buy">Satın Al</a>
            <a href="/rent">Kirala</a>
            <a href="/sell">Sat</a>
            <a href="/valuation">Değerleme</a>
            <a href="/consultation">Danışmanlık</a>
          </FooterSection>
          
          <FooterSection>
            <h3>İletişim</h3>
            <p>📍 İstanbul, Türkiye</p>
            <p>📞 +90 (212) 555 0123</p>
            <p>✉️ info@emlak.com</p>
            <p>🕒 Pazartesi - Cuma: 09:00 - 18:00</p>
          </FooterSection>
        </FooterGrid>
        
        <FooterBottom>
          <p>
            © 2024 Emlak. Tüm hakları saklıdır. | 
            <a href="/privacy"> Gizlilik Politikası</a> | 
            <a href="/terms"> Kullanım Şartları</a>
          </p>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 