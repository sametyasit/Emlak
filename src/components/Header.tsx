import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  color: #1f2937;
  padding: 1rem 0;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  transition: all 0.3s ease;
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
  font-weight: 800;
  color: #10b981;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #10b981, #059669);
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #059669;
    transform: translateY(-1px);
    
    &::after {
      width: 100%;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #10b981, #059669);
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #10b981;
    transform: translateY(-1px);
    
    &::after {
      width: 100%;
    }
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
  font-weight: 600;
  color: #1f2937;
`;

const LogoutButton = styled.button`
  background: #f3f4f6;
  color: #6b7280;
  border: 1px solid #d1d5db;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e5e7eb;
    color: #374151;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const LoginButton = styled(Link)`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
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
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
    
    &::before {
      left: 100%;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #6b7280;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #10b981;
    transform: scale(1.1);
  }
  
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
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    color: #1f2937;
    padding: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border-top: 1px solid rgba(229, 231, 235, 0.5);
    
    ${NavLink} {
      color: #6b7280;
      padding: 0.75rem 0;
      border-bottom: 1px solid rgba(229, 231, 235, 0.3);
      
      &:last-child {
        border-bottom: none;
      }
      
      &:hover {
        color: #10b981;
      }
    }
  }
`;

const SettingsButton = styled(Link)`
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  border: 1px solid #d1d5db;
  color: #6b7280;
  padding: 0.6rem 0.8rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.2rem;
  margin-right: 10px;
  transition: all 0.3s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
    color: #10b981;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
    
    &::before {
      left: 100%;
    }
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 0.7rem;
    font-size: 1.1rem;
    margin-right: 8px;
  }
`;

const Header: React.FC = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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