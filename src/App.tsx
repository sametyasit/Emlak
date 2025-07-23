import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import PropertyList from './pages/PropertyList';
import PropertyDetail from './pages/PropertyDetail';
import ProtectedRoute from './components/ProtectedRoute';
import AddPropertyPage from './pages/AddPropertyPage';
import EditPropertiesPage from './pages/EditPropertiesPage';
import ManageUsersPage from './pages/ManageUsersPage';
import ReportsPage from './pages/ReportsPage';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/add-property" 
            element={
              <ProtectedRoute requireAdmin>
                <AddPropertyPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/edit-properties" 
            element={
              <ProtectedRoute requireAdmin>
                <EditPropertiesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/manage-users" 
            element={
              <ProtectedRoute requireAdmin>
                <ManageUsersPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/reports" 
            element={
              <ProtectedRoute requireAdmin>
                <ReportsPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </MainContent>
      <Footer />
    </AppContainer>
  );
};

export default App; 