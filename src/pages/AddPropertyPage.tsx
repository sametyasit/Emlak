import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
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

const FormCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
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
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const PrimaryButton = styled(Button)`
  background: #667eea;
  color: white;
  
  &:hover {
    background: #5a67d8;
  }
`;

const SecondaryButton = styled(Button)`
  background: #f8fafc;
  color: #1e293b;
  border: 2px solid #e2e8f0;
  
  &:hover {
    background: #e2e8f0;
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

const AddPropertyPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
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
    
    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      setShowSuccess(true);
      setIsSubmitting(false);
      
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    }, 1500);
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <Container>
      <PageHeader>
        <PageTitle>➕ Yeni İlan Ekle</PageTitle>
        <PageSubtitle>Yeni emlak ilanı oluşturun</PageSubtitle>
      </PageHeader>

      <FormCard>
        {showSuccess && (
          <SuccessMessage>
            ✅ İlan başarıyla eklendi! Admin paneline yönlendiriliyorsunuz...
          </SuccessMessage>
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
            <SecondaryButton type="button" onClick={handleCancel}>
              ❌ İptal
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '⏳ Ekleniyor...' : '✅ İlanı Ekle'}
            </PrimaryButton>
          </ButtonGroup>
        </Form>
      </FormCard>
    </Container>
  );
};

export default AddPropertyPage; 