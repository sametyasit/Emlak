import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const HeaderContainer = styled.header`
  background: var(--gradient-primary);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 1000;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    pointer-events: none;
  }
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  
  &:hover {
    color: #f1f5f9;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #f1f5f9;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserName = styled.span`
  font-weight: 500;
`;

const LogoutButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const LoginButton = styled(Link)`
  background: white;
  color: #667eea;
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f8fafc;
    transform: translateY(-1px);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    color: #1e293b;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    
    ${NavLink} {
      color: #1e293b;
      padding: 0.75rem 0;
      border-bottom: 1px solid #e2e8f0;
      
      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

const ThemeToggleButton = styled.button`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.25) 100%);
  border: none;
  color: white;
  padding: 12px 16px;
  border-radius: 16px;
  cursor: pointer;
  font-size: 1.4rem;
  margin-right: 10px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
  }
  
  &:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.4) 100%);
    transform: translateY(-3px) scale(1.08);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
    
    &::before {
      left: 100%;
    }
    
    &::after {
      width: 100%;
      height: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(0.98);
    transition: all 0.1s;
  }
  
  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 1.3rem;
    margin-right: 10px;
  }
`;

const SettingsButton = styled(Link)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.25) 100%);
  border: none;
  color: white;
  padding: 12px 16px;
  border-radius: 16px;
  cursor: pointer;
  font-size: 1.4rem;
  margin-right: 10px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
  }
  
  &:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.4) 100%);
    transform: translateY(-3px) scale(1.08);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
    color: white;
    
    &::before {
      left: 100%;
    }
    
    &::after {
      width: 100%;
      height: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(0.98);
    transition: all 0.1s;
  }
  
  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 1.3rem;
    margin-right: 10px;
  }
`;

const Header: React.FC = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Debug için tema durumunu konsola yazdır
  console.log('Header - Current theme:', theme);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleThemeToggle = () => {
    console.log('Theme toggle clicked! Current theme:', theme);
    toggleTheme();
    console.log('Theme after toggle:', theme === 'light' ? 'dark' : 'light');
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">🏠 Emlak</Logo>
        
        <NavLinks>
          <NavLink to="/">Ana Sayfa</NavLink>
          <NavLink to="/properties">İlanlar</NavLink>
          {isAuthenticated && (
            <>
              {isAdmin ? (
                <NavLink to="/admin">Admin Panel</NavLink>
              ) : (
                <NavLink to="/settings">Profil</NavLink>
              )}
            </>
          )}
        </NavLinks>

        <UserSection>
          <ThemeToggleButton onClick={handleThemeToggle}>
            {theme === 'light' ? '🌙' : '☀️'}
          </ThemeToggleButton>
          {isAuthenticated && (
            <SettingsButton to="/settings">
              ⚙️
            </SettingsButton>
          )}
          {isAuthenticated ? (
            <>
              <UserInfo>
                <UserName>{user?.name}</UserName>
                {isAdmin && <span>👑</span>}
              </UserInfo>
              <LogoutButton onClick={handleLogout}>
                Çıkış
              </LogoutButton>
            </>
          ) : (
            <LoginButton to="/login">
              Giriş Yap
            </LoginButton>
          )}
          
          <MobileMenuButton onClick={toggleMobileMenu}>
            ☰
          </MobileMenuButton>
        </UserSection>
      </Nav>
      
      <MobileMenu isOpen={mobileMenuOpen}>
        <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
          Ana Sayfa
        </NavLink>
        <NavLink to="/properties" onClick={() => setMobileMenuOpen(false)}>
          İlanlar
        </NavLink>
        {isAuthenticated && (
          <>
            {isAdmin ? (
              <NavLink to="/admin" onClick={() => setMobileMenuOpen(false)}>
                Admin Panel
              </NavLink>
            ) : (
              <NavLink to="/settings" onClick={() => setMobileMenuOpen(false)}>
                Profil
              </NavLink>
            )}
          </>
        )}
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header; 