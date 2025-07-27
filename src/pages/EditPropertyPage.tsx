import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { allProperties } from '../data/properties';

const Container = styled.div`
  max-width: 800px;
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

const FormCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormSection = styled.div`
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1.5rem;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CancelButton = styled.button`
  background: #f8fafc;
  color: #64748b;
  padding: 1rem 2rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e2e8f0;
    border-color: #cbd5e1;
    transform: translateY(-2px);
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

const ErrorMessage = styled.div`
  background: #fef3f2;
  color: #991b1b;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 500;
`;

const LoadingMessage = styled.div`
  background: #f0f9ff;
  color: #0369a1;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 500;
`;

const EditPropertyPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [propertyNotFound, setPropertyNotFound] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    type: 'sale',
    price: '',
    location: '',
    rooms: '',
    area: '',
    floor: '',
    age: '',
    heating: '',
    parking: '',
    description: ''
  });

  // İlan verilerini yükle
  useEffect(() => {
    const loadProperty = () => {
      try {
        const storedProperties = localStorage.getItem('properties');
        let properties = allProperties;
        
        if (storedProperties) {
          properties = JSON.parse(storedProperties);
        }
        
        const property = properties.find((p: any) => p.id === parseInt(id!));
        
        if (property) {
          setFormData({
            title: property.title || '',
            type: property.type === 'Satılık' ? 'sale' : 
                  property.type === 'Kiralık' ? 'rent' : 
                  property.type === 'Günlük Kiralık' ? 'daily' : 'project',
            price: property.price ? property.price.toString() : '',
            location: property.location || '',
            rooms: property.rooms || '',
            area: property.area || '',
            floor: property.floor || '',
            age: property.buildingAge || '',
            heating: property.heating || '',
            parking: property.parking === 'Kapalı Otopark' ? 'var' : 'yok',
            description: property.description || ''
          });
        } else {
          setPropertyNotFound(true);
        }
      } catch (error) {
        console.error('İlan yüklenirken hata:', error);
        setErrorMessage('İlan yüklenirken bir hata oluştu.');
        setShowError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProperty();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowError(false);
    setErrorMessage('');
    
    try {
      const storedProperties = localStorage.getItem('properties');
      let properties = allProperties;
      
      if (storedProperties) {
        properties = JSON.parse(storedProperties);
      }
      
      const propertyIndex = properties.findIndex((p: any) => p.id === parseInt(id!));
      
      if (propertyIndex === -1) {
        throw new Error('İlan bulunamadı');
      }
      
      // İlanı güncelle
      properties[propertyIndex] = {
        ...properties[propertyIndex],
        title: formData.title,
        type: formData.type === 'sale' ? 'Satılık' : 
              formData.type === 'rent' ? 'Kiralık' : 
              formData.type === 'daily' ? 'Günlük Kiralık' : 'Proje',
        price: parseInt(formData.price.replace(/\D/g, '')) || 0,
        location: formData.location,
        rooms: formData.rooms,
        area: formData.area,
        floor: formData.floor,
        buildingAge: formData.age,
        heating: formData.heating,
        parking: formData.parking === 'var' ? 'Kapalı Otopark' : 'Yok',
        description: formData.description,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      
      // LocalStorage'a kaydet
      localStorage.setItem('properties', JSON.stringify(properties));
      
      setShowSuccess(true);
      setIsSubmitting(false);
      
      setTimeout(() => {
        navigate('/admin/edit-properties');
      }, 2000);
    } catch (error) {
      console.error('İlan güncellenirken hata oluştu:', error);
      setErrorMessage('İlan güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
      setShowError(true);
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/edit-properties');
  };

  if (loading) {
    return (
      <Container>
        <LoadingMessage>
          ⏳ İlan yükleniyor...
        </LoadingMessage>
      </Container>
    );
  }

  if (propertyNotFound) {
    return (
      <Container>
        <ErrorMessage>
          ❌ İlan bulunamadı! ID: {id}
        </ErrorMessage>
        <ButtonGroup>
          <CancelButton onClick={handleCancel}>
            ← Geri Dön
          </CancelButton>
        </ButtonGroup>
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader>
        <PageTitle>✏️ İlan Düzenle</PageTitle>
        <PageSubtitle>İlan bilgilerini güncelleyin</PageSubtitle>
      </PageHeader>

      <FormCard>
        {showSuccess && (
          <SuccessMessage>
            ✅ İlan başarıyla güncellendi! İlanlar sayfasına yönlendiriliyorsunuz...
          </SuccessMessage>
        )}

        {showError && (
          <ErrorMessage>
            ❌ {errorMessage}
          </ErrorMessage>
        )}

        <Form onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>📋 Temel Bilgiler</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>İlan Başlığı *</Label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Örn: Modern 3+1 Daire"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>İlan Türü *</Label>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="sale">Satılık</option>
                  <option value="rent">Kiralık</option>
                  <option value="daily">Günlük Kiralık</option>
                  <option value="project">Proje</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label>Fiyat *</Label>
                <Input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Örn: 2.500.000 TL"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Konum *</Label>
                <Input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Örn: Kadıköy, İstanbul"
                  required
                />
              </FormGroup>
            </FormGrid>
          </FormSection>

          <FormSection>
            <SectionTitle>🏠 Emlak Özellikleri</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>Oda Sayısı</Label>
                <Select
                  name="rooms"
                  value={formData.rooms}
                  onChange={handleInputChange}
                >
                  <option value="">Seçiniz</option>
                  <option value="1+0">1+0</option>
                  <option value="1+1">1+1</option>
                  <option value="2+1">2+1</option>
                  <option value="3+1">3+1</option>
                  <option value="4+1">4+1</option>
                  <option value="5+1">5+1</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label>Metrekare</Label>
                <Input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder="Örn: 120m²"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Kat</Label>
                <Input
                  type="text"
                  name="floor"
                  value={formData.floor}
                  onChange={handleInputChange}
                  placeholder="Örn: 5. Kat"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Bina Yaşı</Label>
                <Input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Örn: 2 Yıl"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Isıtma</Label>
                <Select
                  name="heating"
                  value={formData.heating}
                  onChange={handleInputChange}
                >
                  <option value="">Seçiniz</option>
                  <option value="dogalgaz">Doğalgaz</option>
                  <option value="merkezi">Merkezi</option>
                  <option value="kombi">Kombi</option>
                  <option value="yok">Yok</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label>Otopark</Label>
                <Select
                  name="parking"
                  value={formData.parking}
                  onChange={handleInputChange}
                >
                  <option value="">Seçiniz</option>
                  <option value="var">Var</option>
                  <option value="yok">Yok</option>
                </Select>
              </FormGroup>
            </FormGrid>
          </FormSection>

          <FormSection>
            <SectionTitle>📝 Açıklama</SectionTitle>
            <FormGroup>
              <Label>İlan Açıklaması</Label>
              <TextArea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Emlak hakkında detaylı açıklama yazın..."
              />
            </FormGroup>
          </FormSection>

          <ButtonGroup>
            <CancelButton type="button" onClick={handleCancel}>
              ❌ İptal
            </CancelButton>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '⏳ Güncelleniyor...' : '✅ İlanı Güncelle'}
            </SubmitButton>
          </ButtonGroup>
        </Form>
      </FormCard>
    </Container>
  );
};

export default EditPropertyPage; 