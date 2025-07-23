import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
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
          <NavLink to="/properties">Emlaklar</NavLink>
          {isAuthenticated && (
            <>
              {isAdmin ? (
                <NavLink to="/admin">Admin Panel</NavLink>
              ) : (
                <NavLink to="/dashboard">Dashboard</NavLink>
              )}
            </>
          )}
        </NavLinks>

        <UserSection>
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
          Emlaklar
        </NavLink>
        {isAuthenticated && (
          <>
            {isAdmin ? (
              <NavLink to="/admin" onClick={() => setMobileMenuOpen(false)}>
                Admin Panel
              </NavLink>
            ) : (
              <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </NavLink>
            )}
          </>
        )}
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header; 