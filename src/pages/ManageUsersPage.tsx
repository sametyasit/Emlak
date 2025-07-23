import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
`;

const PageHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  text-align: center;
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
  color: #667eea;
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

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
  }
`;

const EditButton = styled(Button)`
  background: #fbbf24;
  color: white;
  
  &:hover {
    background: #f59e0b;
  }
`;

const DeleteButton = styled(Button)`
  background: #ef4444;
  color: white;
  
  &:hover {
    background: #dc2626;
  }
`;

const BlockButton = styled(Button)`
  background: #6b7280;
  color: white;
  
  &:hover {
    background: #4b5563;
  }
`;

const ManageUsersPage: React.FC = () => {
  const [users] = useState([
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
  ]);

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(user => user.status === 'active').length,
    adminUsers: users.filter(user => user.role === 'admin').length,
    newUsers: users.filter(user => {
      const joinDate = new Date(user.joinDate);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return joinDate > thirtyDaysAgo;
    }).length
  };

  const handleEdit = (id: number) => {
    console.log('Kullanıcı düzenle:', id);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      console.log('Kullanıcı silindi:', id);
    }
  };

  const handleBlock = (id: number) => {
    console.log('Kullanıcı engellendi:', id);
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

        {users.map((user) => (
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