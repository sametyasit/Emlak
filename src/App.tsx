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
import SystemSettingsPage from './pages/SystemSettingsPage';
import ManageNotificationsPage from './pages/ManageNotificationsPage';
import MessagesPage from './pages/MessagesPage';

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
                 <Route 
                   path="/admin/settings" 
                   element={
                     <ProtectedRoute requireAdmin>
                       <SystemSettingsPage />
                     </ProtectedRoute>
                   } 
                 />
                 <Route 
                   path="/admin/notifications" 
                   element={
                     <ProtectedRoute requireAdmin>
                       <ManageNotificationsPage />
                     </ProtectedRoute>
                   } 
                 />
                 <Route 
                   path="/admin/messages" 
                   element={
                     <ProtectedRoute requireAdmin>
                       <MessagesPage />
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