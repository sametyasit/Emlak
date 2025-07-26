import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: #f8fafc;
  color: #1f2937;
  padding: 4rem 0 2rem;
  margin-top: auto;
  border-top: 1px solid #e5e7eb;
  position: relative;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
`;

const FooterSection = styled.div`
  h3 {
    color: #1f2937;
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
    font-weight: 600;
    position: relative;
    padding-bottom: 0.5rem;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 2px;
      background: #10b981;
      border-radius: 1px;
    }
  }
  
  p {
    color: #6b7280;
    line-height: 1.7;
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FooterLink = styled(Link)`
  color: #6b7280;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  padding: 0.3rem 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 1px;
    background: #10b981;
    transition: width 0.2s ease;
  }
  
  &:hover {
    color: #10b981;
    transform: translateX(3px);
    
    &::before {
      width: 100%;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 1.1rem;
  
  &:hover {
    color: #10b981;
    border-color: #10b981;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #6b7280;
  font-size: 0.95rem;
  
  .icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #10b981;
    border-radius: 50%;
    color: white;
    font-size: 0.8rem;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #e5e7eb;
  padding-top: 2rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.9rem;
  
  a {
    color: #10b981;
    text-decoration: none;
    margin: 0 0.5rem;
    transition: color 0.2s ease;
    
    &:hover {
      color: #059669;
      text-decoration: underline;
    }
  }
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
                <span>📘</span>
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                <span>🐦</span>
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                <span>📷</span>
              </SocialLink>
              <SocialLink href="#" aria-label="LinkedIn">
                <span>💼</span>
              </SocialLink>
            </SocialLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Hızlı Linkler</h3>
            <FooterLinks>
              <FooterLink to="/">Ana Sayfa</FooterLink>
              <FooterLink to="/properties">Emlaklar</FooterLink>
              <FooterLink to="/about">Hakkımızda</FooterLink>
              <FooterLink to="/contact">İletişim</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
              <FooterLink to="/news">Haberler</FooterLink>
              <FooterLink to="/faq">SSS</FooterLink>
              <FooterLink to="/careers">Kariyer</FooterLink>
            </FooterLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Hizmetler</h3>
            <FooterLinks>
              <FooterLink to="/buy">Satın Al</FooterLink>
              <FooterLink to="/rent">Kirala</FooterLink>
              <FooterLink to="/sell">Sat</FooterLink>
              <FooterLink to="/valuation">Değerleme</FooterLink>
              <FooterLink to="/consultation">Danışmanlık</FooterLink>
              <FooterLink to="/mortgage">Kredi Hesaplama</FooterLink>
              <FooterLink to="/insurance">Sigorta</FooterLink>
              <FooterLink to="/legal">Hukuki Danışmanlık</FooterLink>
              <FooterLink to="/renovation">Tadilat</FooterLink>
            </FooterLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>İletişim</h3>
            <ContactInfo>
              <ContactItem>
                <div className="icon">📍</div>
                <span>İstanbul, Türkiye</span>
              </ContactItem>
              <ContactItem>
                <div className="icon">📞</div>
                <span>+90 (212) 555 0123</span>
              </ContactItem>
              <ContactItem>
                <div className="icon">✉️</div>
                <span>info@emlak.com</span>
              </ContactItem>
              <ContactItem>
                <div className="icon">🕒</div>
                <span>Pazartesi - Cuma: 09:00 - 18:00</span>
              </ContactItem>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>
        
        <FooterBottom>
          <p>
            © 2024 Emlak. Tüm hakları saklıdır. | 
            <a href="/privacy">Gizlilik Politikası</a> | 
            <a href="/terms">Kullanım Şartları</a>
          </p>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 