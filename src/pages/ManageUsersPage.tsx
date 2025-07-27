import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
`;

const PageHeader = styled.div`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #10b981;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #64748b;
  font-weight: 500;
`;

const UsersTable = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 600;
  color: #1e293b;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const UserRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  align-items: center;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: #f8fafc;
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    padding: 1rem;
  }
`;

const UserInfo = styled.div`
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &::before {
      content: attr(data-label);
      font-weight: 600;
      color: #64748b;
      margin-right: 1rem;
    }
  }
`;

const UserName = styled.div`
  font-weight: 600;
  color: #1e293b;
`;

const UserEmail = styled.div`
  color: #64748b;
  font-size: 0.9rem;
`;

const UserRole = styled.div`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
  width: fit-content;
`;

const AdminRole = styled(UserRole)`
  background: #fef3c7;
  color: #92400e;
`;

const UserRoleRegular = styled(UserRole)`
  background: #dbeafe;
  color: #1e40af;
`;

const UserStatus = styled.div`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
  width: fit-content;
`;

const ActiveStatus = styled(UserStatus)`
  background: #d1fae5;
  color: #065f46;
`;

const InactiveStatus = styled(UserStatus)`
  background: #fee2e2;
  color: #991b1b;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 0.5rem;
  
  &:last-child {
    margin-right: 0;
  }
`;

const EditButton = styled(ActionButton)`
  background: #10b981;
  color: white;
  
  &:hover {
    background: #059669;
    transform: translateY(-1px);
  }
`;

const DeleteButton = styled(ActionButton)`
  background: #ef4444;
  color: white;
  
  &:hover {
    background: #dc2626;
    transform: translateY(-1px);
  }
`;

const BlockButton = styled(ActionButton)`
  background: #f59e0b;
  color: white;
  
  &:hover {
    background: #d97706;
    transform: translateY(-1px);
  }
`;

const SuccessMessage = styled.div`
  background: #f0fdf4;
  color: #16a34a;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 500;
`;

const ManageUsersPage: React.FC = () => {
  // LocalStorage'dan kullanıcı verilerini oku, yoksa varsayılan verileri kullan
  const getUsers = () => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }
    return [
      {
        id: 1,
        name: 'Admin Kullanıcı',
        email: 'admin@emlak.com',
        role: 'admin',
        status: 'active',
        joinDate: '2024-01-15'
      },
      {
        id: 2,
        name: 'Normal Kullanıcı',
        email: 'user@emlak.com',
        role: 'user',
        status: 'active',
        joinDate: '2024-02-20'
      },
      {
        id: 3,
        name: 'Ahmet Yılmaz',
        email: 'ahmet@email.com',
        role: 'user',
        status: 'active',
        joinDate: '2024-03-10'
      },
      {
        id: 4,
        name: 'Fatma Demir',
        email: 'fatma@email.com',
        role: 'user',
        status: 'inactive',
        joinDate: '2024-01-25'
      },
      {
        id: 5,
        name: 'Mehmet Kaya',
        email: 'mehmet@email.com',
        role: 'user',
        status: 'active',
        joinDate: '2024-02-15'
      }
    ];
  };

  const [users, setUsers] = useState(getUsers());
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((user: any) => user.status === 'active').length,
    adminUsers: users.filter((user: any) => user.role === 'admin').length,
    newUsers: users.filter((user: any) => {
      const joinDate = new Date(user.joinDate);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return joinDate > thirtyDaysAgo;
    }).length
  };

  const handleEdit = (id: number) => {
    const user = users.find((u: any) => u.id === id);
    if (user) {
      const newName = prompt('Yeni kullanıcı adı:', user.name);
      const newEmail = prompt('Yeni e-posta:', user.email);
      
      if (newName && newEmail) {
        const updatedUsers = users.map((u: any) => 
          u.id === id ? { ...u, name: newName, email: newEmail } : u
        );
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        
        setSuccessMessage('Kullanıcı başarıyla güncellendi!');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    }
  };

  const handleDelete = (id: number) => {
    const user = users.find((u: any) => u.id === id);
    if (user && user.role === 'admin') {
      alert('Admin kullanıcısı silinemez!');
      return;
    }
    
    if (window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      const updatedUsers = users.filter((u: any) => u.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      setSuccessMessage('Kullanıcı başarıyla silindi!');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleBlock = (id: number) => {
    const user = users.find((u: any) => u.id === id);
    if (user && user.role === 'admin') {
      alert('Admin kullanıcısı engellenemez!');
      return;
    }
    
    const updatedUsers = users.map((u: any) => 
      u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    const action = user?.status === 'active' ? 'engellendi' : 'aktifleştirildi';
    setSuccessMessage(`Kullanıcı başarıyla ${action}!`);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getRoleComponent = (role: string) => {
    switch (role) {
      case 'admin':
        return <AdminRole>👑 Admin</AdminRole>;
      case 'user':
        return <UserRoleRegular>👤 Kullanıcı</UserRoleRegular>;
      default:
        return <UserRole>{role}</UserRole>;
    }
  };

  const getStatusComponent = (status: string) => {
    switch (status) {
      case 'active':
        return <ActiveStatus>✅ Aktif</ActiveStatus>;
      case 'inactive':
        return <InactiveStatus>❌ Pasif</InactiveStatus>;
      default:
        return <UserStatus>{status}</UserStatus>;
    }
  };

  return (
    <Container>
      <PageHeader>
        <PageTitle>👥 Kullanıcıları Yönet</PageTitle>
        <PageSubtitle>Platform kullanıcılarını yönetin</PageSubtitle>
      </PageHeader>

      {showSuccess && (
        <SuccessMessage>
          ✅ {successMessage}
        </SuccessMessage>
      )}

      <StatsGrid>
        <StatCard>
          <StatIcon>👥</StatIcon>
          <StatNumber>{stats.totalUsers}</StatNumber>
          <StatLabel>Toplam Kullanıcı</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>✅</StatIcon>
          <StatNumber>{stats.activeUsers}</StatNumber>
          <StatLabel>Aktif Kullanıcı</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>👑</StatIcon>
          <StatNumber>{stats.adminUsers}</StatNumber>
          <StatLabel>Admin Kullanıcı</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>🆕</StatIcon>
          <StatNumber>{stats.newUsers}</StatNumber>
          <StatLabel>Yeni Kullanıcı (30 gün)</StatLabel>
        </StatCard>
      </StatsGrid>

      <UsersTable>
        <TableHeader>
          <div>Kullanıcı Adı</div>
          <div>E-posta</div>
          <div>Rol</div>
          <div>Durum</div>
          <div>İşlemler</div>
        </TableHeader>

        {users.map((user: any) => (
          <UserRow key={user.id}>
            <UserInfo data-label="Kullanıcı Adı:">
              <UserName>{user.name}</UserName>
            </UserInfo>
            
            <UserInfo data-label="E-posta:">
              <UserEmail>{user.email}</UserEmail>
            </UserInfo>
            
            <UserInfo data-label="Rol:">
              {getRoleComponent(user.role)}
            </UserInfo>
            
            <UserInfo data-label="Durum:">
              {getStatusComponent(user.status)}
            </UserInfo>
            
            <ActionButtons>
              <EditButton onClick={() => handleEdit(user.id)}>
                ✏️ Düzenle
              </EditButton>
              {user.status === 'active' ? (
                <BlockButton onClick={() => handleBlock(user.id)}>
                  🚫 Engelle
                </BlockButton>
              ) : (
                <BlockButton onClick={() => handleBlock(user.id)}>
                  ✅ Aktifleştir
                </BlockButton>
              )}
              <DeleteButton onClick={() => handleDelete(user.id)}>
                🗑️ Sil
              </DeleteButton>
            </ActionButtons>
          </UserRow>
        ))}
      </UsersTable>
    </Container>
  );
};

export default ManageUsersPage; 