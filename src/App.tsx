import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import PropertyList from './pages/PropertyList';
import PropertyDetail from './pages/PropertyDetail';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import NewsPage from './pages/NewsPage';
import FAQPage from './pages/FAQPage';
import CareersPage from './pages/CareersPage';
import BuyPage from './pages/BuyPage';
import RentPage from './pages/RentPage';
import SellPage from './pages/SellPage';
import ValuationPage from './pages/ValuationPage';
import ConsultationPage from './pages/ConsultationPage';
import MortgagePage from './pages/MortgagePage';
import InsurancePage from './pages/InsurancePage';
import LegalPage from './pages/LegalPage';
import RenovationPage from './pages/RenovationPage';
import ProtectedRoute from './components/ProtectedRoute';
import AddPropertyPage from './pages/AddPropertyPage';
import EditPropertiesPage from './pages/EditPropertiesPage';
import ManageUsersPage from './pages/ManageUsersPage';
import ReportsPage from './pages/ReportsPage';
import SystemSettingsPage from './pages/SystemSettingsPage';
import ManageNotificationsPage from './pages/ManageNotificationsPage';
import MessagesPage from './pages/MessagesPage';
import FavoritesPage from './pages/FavoritesPage';
import AppointmentsPage from './pages/AppointmentsPage';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';
import SupportPage from './pages/SupportPage';
import { GlobalStyles } from './styles/GlobalStyles';

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
    <>
      <GlobalStyles />
      <ScrollToTop />
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/rent" element={<RentPage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/valuation" element={<ValuationPage />} />
          <Route path="/consultation" element={<ConsultationPage />} />
          <Route path="/mortgage" element={<MortgagePage />} />
          <Route path="/insurance" element={<InsurancePage />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/renovation" element={<RenovationPage />} />
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
                 <Route 
                   path="/favorites" 
                   element={
                     <ProtectedRoute>
                       <FavoritesPage />
                     </ProtectedRoute>
                   } 
                 />
                 <Route 
                   path="/appointments" 
                   element={
                     <ProtectedRoute>
                       <AppointmentsPage />
                     </ProtectedRoute>
                   } 
                 />
                 <Route 
                   path="/messages" 
                   element={
                     <ProtectedRoute>
                       <MessagesPage />
                     </ProtectedRoute>
                   } 
                 />
                 <Route 
                   path="/stats" 
                   element={
                     <ProtectedRoute>
                       <StatsPage />
                     </ProtectedRoute>
                   } 
                 />
                 <Route 
                   path="/settings" 
                   element={
                     <ProtectedRoute>
                       <SettingsPage />
                     </ProtectedRoute>
                   } 
                 />
                 <Route 
                   path="/support" 
                   element={
                     <ProtectedRoute>
                       <SupportPage />
                     </ProtectedRoute>
                   } 
                 />
                              </Routes>
        </MainContent>
      <Footer />
    </AppContainer>
    </>
  );
};

export default App; 