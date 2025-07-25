import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: var(--bg-secondary);
  color: var(--text-primary);
  padding: 4rem 0 2rem;
  margin-top: auto;
  border-top: 1px solid var(--border-color);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--gradient-secondary);
  }
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
    color: var(--text-primary);
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
    font-weight: 700;
    position: relative;
    padding-bottom: 0.5rem;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 3px;
      background: var(--gradient-secondary);
      border-radius: 2px;
    }
  }
  
  p {
    color: var(--text-secondary);
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

const FooterLink = styled.a`
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  padding: 0.3rem 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background: var(--gradient-secondary);
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: var(--text-primary);
    transform: translateX(5px);
    
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
  width: 45px;
  height: 45px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1.2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: var(--gradient-secondary);
    transition: left 0.3s ease;
    z-index: 0;
  }
  
  span {
    position: relative;
    z-index: 1;
  }
  
  &:hover {
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
    border-color: var(--accent-color);
    
    &::before {
      left: 0;
    }
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
  color: var(--text-secondary);
  font-size: 0.95rem;
  
  .icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--accent-color);
    border-radius: 50%;
    color: white;
    font-size: 0.8rem;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid var(--border-color);
  padding-top: 2rem;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
  
  a {
    color: var(--accent-color);
    text-decoration: none;
    margin: 0 0.5rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--accent-hover);
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
              <FooterLink href="/">Ana Sayfa</FooterLink>
              <FooterLink href="/properties">Emlaklar</FooterLink>
              <FooterLink href="/about">Hakkımızda</FooterLink>
              <FooterLink href="/contact">İletişim</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/news">Haberler</FooterLink>
              <FooterLink href="/faq">SSS</FooterLink>
              <FooterLink href="/careers">Kariyer</FooterLink>
            </FooterLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Hizmetler</h3>
            <FooterLinks>
              <FooterLink href="/buy">Satın Al</FooterLink>
              <FooterLink href="/rent">Kirala</FooterLink>
              <FooterLink href="/sell">Sat</FooterLink>
              <FooterLink href="/valuation">Değerleme</FooterLink>
              <FooterLink href="/consultation">Danışmanlık</FooterLink>
              <FooterLink href="/mortgage">Kredi Hesaplama</FooterLink>
              <FooterLink href="/insurance">Sigorta</FooterLink>
              <FooterLink href="/legal">Hukuki Danışmanlık</FooterLink>
              <FooterLink href="/renovation">Tadilat</FooterLink>
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