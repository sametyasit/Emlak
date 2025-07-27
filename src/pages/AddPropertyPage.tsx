import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const ImageUploadSection = styled.div`
  margin-bottom: 1.5rem;
`;

const ImageUploadArea = styled.div`
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  background: #f9fafb;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    border-color: #10b981;
    background: #f0fdf4;
  }
`;

const ImageUploadText = styled.p`
  color: #6b7280;
  margin-bottom: 1rem;
`;

const ImageUploadButton = styled.button`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
  }
`;

const ImagePreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const ImagePreview = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ImagePreviewImg = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  
  &:hover {
    background: rgba(239, 68, 68, 1);
  }
`;

const AddPropertyPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push(event.target.result as string);
            if (newImages.length === files.length) {
              setUploadedImages(prev => [...prev, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const checkDuplicateProperty = (newProperty: any) => {
    const existingProperties = getProperties();
    return existingProperties.some((property: any) => 
      property.title.toLowerCase() === newProperty.title.toLowerCase() &&
      property.location.toLowerCase() === newProperty.location.toLowerCase() &&
      property.price === newProperty.price
    );
  };

  const getProperties = () => {
    const storedProperties = localStorage.getItem('properties');
    if (storedProperties) {
      return JSON.parse(storedProperties);
    }
    return allProperties;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowError(false);
    setErrorMessage('');
    
    try {
      // Yeni ilan verisi oluştur
      const newProperty = {
        id: Date.now(), // Benzersiz ID için timestamp kullan
        title: formData.title,
        location: formData.location,
        price: parseInt(formData.price.replace(/\D/g, '')) || 0,
        rooms: formData.rooms,
        area: formData.area,
        type: formData.type === 'sale' ? 'Satılık' : 
              formData.type === 'rent' ? 'Kiralık' : 
              formData.type === 'daily' ? 'Günlük Kiralık' : 'Proje',
        city: formData.location.split(',')[1]?.trim() || 'İstanbul',
        district: formData.location.split(',')[0]?.trim() || 'Merkez',
        neighborhood: formData.location.split(',')[0]?.trim() || 'Merkez',
        image: uploadedImages[0] || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        images: uploadedImages.length > 0 ? uploadedImages : [
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80'
        ],
        buildingAge: formData.age,
        floor: formData.floor,
        heating: formData.heating,
        parking: formData.parking === 'var' ? 'Kapalı Otopark' : 'Yok',
        balcony: 'Var',
        furnished: 'Yarı Eşyalı',
        elevator: 'Var',
        security: '24 Saat Güvenlik',
        inComplex: 'Evet',
        seaView: 'Yok',
        nearMetro: 'Evet',
        garden: 'Yok',
        pool: 'Yok',
        gym: 'Var',
        petFriendly: 'Evet',
        loanEligible: 'Evet',
        description: formData.description || 'Yeni eklenen emlak ilanı.',
        features: ['Merkezi Konum', 'Metro Yakını', 'Asansör', 'Balkon'],
        contactPhone: '+90 212 555 0123',
        contactEmail: 'info@emlak.com',
        listedDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      // Aynı ilanın daha önce eklenip eklenmediğini kontrol et
      if (checkDuplicateProperty(newProperty)) {
        setErrorMessage('Bu ilan daha önce eklenmiş! Aynı başlık, konum ve fiyata sahip bir ilan zaten mevcut.');
        setShowError(true);
        setIsSubmitting(false);
        return;
      }

      // Properties dosyasına yeni ilanı ekle
      const existingProperties = getProperties();
      existingProperties.push(newProperty);
      
      // LocalStorage'a kaydet
      localStorage.setItem('properties', JSON.stringify(existingProperties));
      
      setShowSuccess(true);
      setIsSubmitting(false);
      
      // Formu temizle
      setFormData({
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
      setUploadedImages([]);
      
      setTimeout(() => {
        navigate('/properties');
      }, 3000);
    } catch (error) {
      console.error('İlan eklenirken hata oluştu:', error);
      setErrorMessage('İlan eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      setShowError(true);
      setIsSubmitting(false);
    }
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
            ✅ İlan başarıyla eklendi! İlanlar sayfasına yönlendiriliyorsunuz...
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
            <SectionTitle>📸 Fotoğraflar</SectionTitle>
            <ImageUploadSection>
              <ImageUploadArea onClick={() => document.getElementById('imageUpload')?.click()}>
                <ImageUploadText>📷 Fotoğraf eklemek için tıklayın veya sürükleyin</ImageUploadText>
                <ImageUploadButton type="button">
                  📁 Fotoğraf Seç
                </ImageUploadButton>
                <input
                  id="imageUpload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </ImageUploadArea>
              
              {uploadedImages.length > 0 && (
                <ImagePreviewGrid>
                  {uploadedImages.map((image, index) => (
                    <ImagePreview key={index}>
                      <ImagePreviewImg src={image} alt={`Fotoğraf ${index + 1}`} />
                      <RemoveImageButton onClick={() => removeImage(index)}>
                        ✕
                      </RemoveImageButton>
                    </ImagePreview>
                  ))}
                </ImagePreviewGrid>
              )}
            </ImageUploadSection>
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
              {isSubmitting ? '⏳ Ekleniyor...' : '✅ İlanı Ekle'}
            </SubmitButton>
          </ButtonGroup>
        </Form>
      </FormCard>
    </Container>
  );
};

export default AddPropertyPage; 