import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { allProperties } from '../data/properties';

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

const SearchBar = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

const PropertiesTable = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr auto;
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

const PropertyRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr auto;
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

const PropertyInfo = styled.div`
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

const PropertyTitle = styled.div`
  font-weight: 600;
  color: #1e293b;
`;

const PropertyLocation = styled.div`
  color: #64748b;
  font-size: 0.9rem;
`;

const PropertyPrice = styled.div`
  font-weight: 600;
  color: #10b981;
`;

const PropertyType = styled.div`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
  width: fit-content;
`;

const SaleType = styled(PropertyType)`
  background: #dbeafe;
  color: #1e40af;
`;

const RentType = styled(PropertyType)`
  background: #f3e8ff;
  color: #7c3aed;
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

const ViewButton = styled(ActionButton)`
  background: #3b82f6;
  color: white;
  
  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #64748b;
`;

const EditPropertiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Simüle edilmiş emlak verileri
  // LocalStorage'dan verileri oku, yoksa varsayılan verileri kullan
  const getProperties = () => {
    const storedProperties = localStorage.getItem('properties');
    if (storedProperties) {
      return JSON.parse(storedProperties);
    }
    return allProperties;
  };

  const [properties, setProperties] = useState(getProperties());

  const filteredProperties = properties.filter((property: any) => {
    // Arama kriterleri - daha fazla alanı ara
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === '' || 
                         property.title?.toLowerCase().includes(searchLower) ||
                         property.location?.toLowerCase().includes(searchLower) ||
                         property.city?.toLowerCase().includes(searchLower) ||
                         property.district?.toLowerCase().includes(searchLower) ||
                         property.price?.toString().includes(searchLower) ||
                         property.rooms?.toLowerCase().includes(searchLower);
    
    // Filtreleme mantığını düzelt - Türkçe type değerlerini kontrol et
    let matchesFilter = true;
    if (filterType !== 'all') {
      if (filterType === 'sale') {
        matchesFilter = property.type === 'Satılık';
      } else if (filterType === 'rent') {
        matchesFilter = property.type === 'Kiralık' || property.type === 'Günlük Kiralık';
      }
    }
    
    return matchesSearch && matchesFilter;
  });

  const handleEdit = (id: number) => {
    // Düzenleme sayfasına yönlendir
    navigate(`/admin/edit-property/${id}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Bu ilanı silmek istediğinizden emin misiniz?')) {
      // LocalStorage'dan silme işlemi
      const updatedProperties = properties.filter((property: any) => property.id !== id);
      setProperties(updatedProperties);
      localStorage.setItem('properties', JSON.stringify(updatedProperties));
    }
  };

  const handleView = (id: number) => {
    navigate(`/property/${id}`);
  };

  const getTypeComponent = (type: string) => {
    switch (type) {
      case 'Satılık':
        return <SaleType>Satılık</SaleType>;
      case 'Kiralık':
        return <RentType>Kiralık</RentType>;
      case 'Günlük Kiralık':
        return <RentType>Günlük Kiralık</RentType>;
      case 'Proje':
        return <PropertyType>Proje</PropertyType>;
      default:
        return <PropertyType>{type}</PropertyType>;
    }
  };

  return (
    <Container>
      <PageHeader>
        <PageTitle>📝 İlanları Düzenle</PageTitle>
        <PageSubtitle>Tüm emlak ilanlarını yönetin</PageSubtitle>
      </PageHeader>

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="İlan başlığı, konum, şehir, fiyat veya oda sayısı ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">Tüm İlanlar</option>
          <option value="sale">Satılık</option>
          <option value="rent">Kiralık</option>
        </FilterSelect>
      </SearchBar>

      <PropertiesTable>
        <TableHeader>
          <div>İlan Başlığı</div>
          <div>Konum</div>
          <div>Fiyat</div>
          <div>Tür</div>
          <div>Durum</div>
          <div>İşlemler</div>
        </TableHeader>

        {filteredProperties.length > 0 ? (
          filteredProperties.map((property: any) => (
            <PropertyRow key={property.id}>
              <PropertyInfo data-label="İlan Başlığı:">
                <PropertyTitle>{property.title}</PropertyTitle>
              </PropertyInfo>
              
              <PropertyInfo data-label="Konum:">
                <PropertyLocation>{property.location}</PropertyLocation>
              </PropertyInfo>
              
              <PropertyInfo data-label="Fiyat:">
                <PropertyPrice>
                  {typeof property.price === 'number' 
                    ? property.price.toLocaleString('tr-TR') + ' TL'
                    : property.price || 'Fiyat belirtilmemiş'
                  }
                </PropertyPrice>
              </PropertyInfo>
              
              <PropertyInfo data-label="Tür:">
                {getTypeComponent(property.type)}
              </PropertyInfo>
              
              <PropertyInfo data-label="Durum:">
                <PropertyType style={{
                  background: property.status === 'active' ? '#d1fae5' : '#fef3c7',
                  color: property.status === 'active' ? '#065f46' : '#92400e'
                }}>
                  {property.status === 'active' ? 'Aktif' : 'Beklemede'}
                </PropertyType>
              </PropertyInfo>
              
              <ActionButtons>
                <ViewButton onClick={() => handleView(property.id)}>
                  👁️ Görüntüle
                </ViewButton>
                <EditButton onClick={() => handleEdit(property.id)}>
                  ✏️ Düzenle
                </EditButton>
                <DeleteButton onClick={() => handleDelete(property.id)}>
                  🗑️ Sil
                </DeleteButton>
              </ActionButtons>
            </PropertyRow>
          ))
        ) : (
          <EmptyState>
            <h3>🔍 Sonuç Bulunamadı</h3>
            <p>Arama kriterlerinize uygun ilan bulunamadı.</p>
          </EmptyState>
        )}
      </PropertiesTable>
    </Container>
  );
};

export default EditPropertiesPage; 