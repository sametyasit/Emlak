import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { allProperties } from '../data/properties';

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const SearchSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: 0 auto;
`;

const SearchForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: end;
  background: rgba(255,255,255,0.95);
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  padding: 18px 18px 12px 18px;
  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`;

const SearchSelect = styled.select`
  padding: 0.9rem 1.2rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1.1rem;
  min-width: 120px;
  background: white;
  color: #1e293b;
  outline: none;
  box-shadow: 0 2px 8px rgba(102,126,234,0.06);
  transition: border-color 0.2s, box-shadow 0.2s;
  &:focus {
    border-color: #7c3aed;
    box-shadow: 0 4px 16px 0 rgba(124,58,237,0.12);
  }
`;

const SearchInput = styled.input`
  padding: 0.9rem 1.2rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1.1rem;
  width: 140px;
  background: white;
  color: #1e293b;
  outline: none;
  box-shadow: 0 2px 8px rgba(102,126,234,0.06);
  transition: border-color 0.2s, box-shadow 0.2s;
  &:focus {
    border-color: #7c3aed;
    box-shadow: 0 4px 16px 0 rgba(124,58,237,0.12);
  }
`;

const SearchButton = styled.button`
  background: #4f8ef7;
  color: white;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  margin-left: 8px;
  box-shadow: 0 2px 8px rgba(79,142,247,0.08);
  &:hover {
    background: #2563eb;
    box-shadow: 0 4px 16px 0 rgba(124,58,237,0.12);
  }
`;

const MoreOptionsLink = styled.a`
  color: #2563eb;
  font-weight: 500;
  font-size: 1rem;
  margin-top: 8px;
  margin-left: 4px;
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: #1e40af;
  }
`;

const FeaturesSection = styled.section`
  padding: 5rem 0;
  background: white;
`;

const FeaturesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 2rem;
  border-radius: 12px;
  background: #f8fafc;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
`;

const FeatureDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
`;

const StatsSection = styled.section`
  background: #1e293b;
  color: white;
  padding: 4rem 0;
`;

const StatsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatItem = styled.div`
  h3 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #667eea;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1.1rem;
    opacity: 0.8;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: #667eea;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #5a67d8;
    transform: translateY(-2px);
  }
`;

// Türkiye il-ilçe-mahalle örnek veri (alfabetik ve sadeleştirilmiş)
const turkiyeAdres = [
  {
    name: 'Adana',
    districts: [
      { name: 'Aladağ', neighborhoods: ['Akören', 'Başpınar', 'Karsantı'] },
      { name: 'Ceyhan', neighborhoods: ['Büyükmangıt', 'Kurtkulağı', 'Mustafabeyli'] },
      { name: 'Seyhan', neighborhoods: ['Barajyolu', 'Çınarlı', 'Yeşilyurt'] }
    ]
  },
  {
    name: 'Aydın',
    districts: [
      { name: 'Efeler', neighborhoods: ['Güzelhisar', 'Kurtuluş', 'Orta'] },
      { name: 'Nazilli', neighborhoods: ['Altıntaş', 'Yıldıztepe', 'Yeni Mahalle'] },
      { name: 'Söke', neighborhoods: ['Bağarası', 'Güllübahçe', 'Yenikent'] }
    ]
  },
  {
    name: 'İstanbul',
    districts: [
      { name: 'Beşiktaş', neighborhoods: ['Etiler', 'Levent', 'Ortaköy'] },
      { name: 'Kadıköy', neighborhoods: ['Fenerbahçe', 'Göztepe', 'Moda'] },
      { name: 'Şişli', neighborhoods: ['Bomonti', 'Mecidiyeköy', 'Nişantaşı'] }
    ]
  },
  {
    name: 'Ankara',
    districts: [
      { name: 'Çankaya', neighborhoods: ['Bahçelievler', 'Kızılay', 'Yıldız'] },
      { name: 'Keçiören', neighborhoods: ['Aktepe', 'Etlik', 'Şehit Kubilay'] }
    ]
  },
  {
    name: 'İzmir',
    districts: [
      { name: 'Konak', neighborhoods: ['Alsancak', 'Güzelyalı', 'Karataş'] },
      { name: 'Bornova', neighborhoods: ['Kazımdirik', 'Evka 3', 'Mevlana'] }
    ]
  },
  {
    name: 'Kayseri',
    districts: [
      { name: 'Meram', neighborhoods: ['Ağaçlı', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Selçuklu', neighborhoods: ['Ağaçlı', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Kocaeli',
    districts: [
      { name: 'Gebze', neighborhoods: ['Aydınlar', 'Çayırova', 'Çayırova'] },
      { name: 'İzmit', neighborhoods: ['Akyazı', 'Çayırova', 'Çayırova'] }
    ]
  },
  {
    name: 'Konya',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Kütahya',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Malatya',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Manisa',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Kahramanmaraş',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Mardin',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Muğla',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Muş',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Nevşehir',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Niğde',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Ordu',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Rize',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Sakarya',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Samsun',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Siirt',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Sinop',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Sivas',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Tekirdağ',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Tokat',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Trabzon',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Tunceli',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Şanlıurfa',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Uşak',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Van',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Yozgat',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Zonguldak',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Aksaray',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Bayburt',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Karaman',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Kırıkkale',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Batman',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Şırnak',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Bartın',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Ardahan',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Iğdır',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Yalova',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Karabük',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Kilis',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Osmaniye',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  },
  {
    name: 'Düzce',
    districts: [
      { name: 'Akyurt', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] },
      { name: 'Yozgat', neighborhoods: ['Akyurt', 'Çiftlik', 'Kızılcahamam'] }
    ]
  }
];

const MultiSelectDropdown = styled.div`
  position: relative;
  min-width: 120px;
`;
const MultiSelectButton = styled.button`
  width: 100%;
  padding: 0.9rem 1.2rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1.1rem;
  background: white;
  color: #1e293b;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const MultiSelectList = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  z-index: 10;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 8px 32px 0 rgba(102,126,234,0.15), 0 2px 12px rgba(0,0,0,0.07);
  min-width: 220px;
  max-width: 320px;
  max-height: 260px;
  overflow-y: auto;
  padding: 8px 0;
  margin: 0;
  list-style: none;
  background: linear-gradient(135deg, #f8fafc 80%, #a78bfa22 100%);
`;
const MultiSelectItem = styled.li`
  padding: 8px 20px;
  font-size: 1.08rem;
  color: #1e293b;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  transition: background 0.15s;
  &:hover {
    background: #ede9fe;
  }
  input[type='checkbox']:checked + span {
    font-weight: 600;
    color: #4f46e5;
  }
`;

const SearchRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
const SearchRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: end;
`;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  // Arama state'leri
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Satılık']);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>(['Konut']);
  const [propertyTypeDropdownOpen, setPropertyTypeDropdownOpen] = useState(false);
  const typeDropdownRef = useRef<HTMLDivElement>(null);
  const propertyTypeDropdownRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');
  const odaSayisiOptions = [
    'Oda Sayısı',
    '1',
    '1+1',
    '2',
    '2+1',
    '3',
    '3+1',
    '4',
    '4+1',
    '5 ve üzeri'
  ];
  const [odaSayisi, setOdaSayisi] = useState('');

  // Dropdown dışına tıklanınca kapat
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(e.target as Node)) {
        setTypeDropdownOpen(false);
      }
      if (propertyTypeDropdownRef.current && !propertyTypeDropdownRef.current.contains(e.target as Node)) {
        setPropertyTypeDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Alfabetik il, ilçe, mahalle listeleri
  const cityList = turkiyeAdres.map(i => i.name).sort((a, b) => a.localeCompare(b, 'tr'));
  const districts = selectedCity ? (turkiyeAdres.find(i => i.name === selectedCity)?.districts || []).map(d => d.name).sort((a, b) => a.localeCompare(b, 'tr')) : [];
  const neighborhoods = selectedDistrict ? (turkiyeAdres.find(i => i.name === selectedCity)?.districts.find(d => d.name === selectedDistrict)?.neighborhoods || []).sort((a, b) => a.localeCompare(b, 'tr')) : [];

  // Satılık/Kiralık seçenekleri
  const typeOptions = [
    'Satılık',
    'Kiralık',
    'Turistik Günlük Kiralık',
    'Devren Satılık Konut'
  ];
  // Konut tipi seçenekleri
  const propertyTypeOptions = [
    'Konut',
    'Daire',
    'Rezidans',
    'Müstakil Ev',
    'Villa',
    'Çiftlik Evi',
    'Köşk & Konak',
    'Yalı',
    'Yalı Dairesi',
    'Yazlık',
    'Kooperatif'
  ];

  // Tümü seçimi fonksiyonu
  const handleMultiSelectAll = (options: string[], selected: string[], setSelected: (v: string[]) => void) => {
    if (selected.length === options.length) {
      setSelected([]);
    } else {
      setSelected([...options]);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSearchAttempted(true);
    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      setError('En düşük fiyat, en yüksek fiyattan büyük olamaz!');
      setFilteredProperties([]);
      return;
    }
    // Filtrele
    let filtered = allProperties.filter(p => {
      const cityMatch = !selectedCity || p.city === selectedCity;
      const districtMatch = !selectedDistrict || p.district === selectedDistrict;
      const neighborhoodMatch = !selectedNeighborhood || p.neighborhood === selectedNeighborhood;
      const minMatch = !minPrice || p.price >= Number(minPrice);
      const maxMatch = !maxPrice || p.price <= Number(maxPrice);
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(p.type);
      // propertyTypeMatch örnek veriyle uyumlu değil, gerçek veriyle entegre edilebilir
      return cityMatch && districtMatch && neighborhoodMatch && minMatch && maxMatch && typeMatch;
    });
    setFilteredProperties(filtered);
  };

  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Hayalinizdeki Evi Bulun</HeroTitle>
          <HeroSubtitle>
            Türkiye'nin en güvenilir emlak platformunda binlerce ilan arasından 
            size en uygun olanını seçin.
          </HeroSubtitle>
          
          <SearchSection>
            <SearchForm onSubmit={handleSearch} style={{flexDirection:'column',gap:18}}>
              <SearchRows>
                {/* 1. satır: İl, İlçe, Mahalle */}
                <SearchRow>
                  <SearchSelect
                    value={selectedCity}
                    onChange={e => {
                      setSelectedCity(e.target.value);
                      setSelectedDistrict('');
                      setSelectedNeighborhood('');
                    }}
                    style={{minWidth:150}}
                  >
                    <option value="">İl</option>
                    {cityList.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </SearchSelect>
                  <SearchSelect
                    value={selectedDistrict}
                    onChange={e => {
                      setSelectedDistrict(e.target.value);
                      setSelectedNeighborhood('');
                    }}
                    disabled={!selectedCity}
                    style={{minWidth:140}}
                  >
                    <option value="">İlçe</option>
                    {districts.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </SearchSelect>
                  <SearchSelect
                    value={selectedNeighborhood}
                    onChange={e => setSelectedNeighborhood(e.target.value)}
                    disabled={!selectedDistrict}
                    style={{minWidth:160}}
                  >
                    <option value="">Mahalle</option>
                    {neighborhoods.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </SearchSelect>
                </SearchRow>
                {/* 2. satır: Satılık/Kiralık, Konut Tipi, Min-Max Fiyat */}
                <SearchRow>
                  <MultiSelectDropdown ref={typeDropdownRef} style={{minWidth:160}}>
                    <MultiSelectButton type="button" onClick={() => setTypeDropdownOpen(v => !v)}>
                      {selectedTypes.length === 0 ? 'Tür Seçiniz' : selectedTypes.length === typeOptions.length ? 'Tümü' : selectedTypes.join(', ')}
                      <span style={{marginLeft:8}}>▼</span>
                    </MultiSelectButton>
                    {typeDropdownOpen && (
                      <MultiSelectList>
                        <MultiSelectItem onClick={() => handleMultiSelectAll(typeOptions, selectedTypes, setSelectedTypes)}>
                          <input type="checkbox" checked={selectedTypes.length === typeOptions.length} readOnly style={{accentColor:'#7c3aed'}} />
                          <span>Tümü</span>
                        </MultiSelectItem>
                        {typeOptions.map(opt => (
                          <MultiSelectItem key={opt} onClick={() => {
                            setSelectedTypes(prev => prev.includes(opt) ? prev.filter(t => t !== opt) : [...prev, opt]);
                          }}>
                            <input type="checkbox" checked={selectedTypes.includes(opt)} readOnly style={{accentColor:'#7c3aed'}} />
                            <span>{opt}</span>
                          </MultiSelectItem>
                        ))}
                      </MultiSelectList>
                    )}
                  </MultiSelectDropdown>
                  <MultiSelectDropdown ref={propertyTypeDropdownRef} style={{minWidth:180}}>
                    <MultiSelectButton type="button" onClick={() => setPropertyTypeDropdownOpen(v => !v)}>
                      {selectedPropertyTypes.length === 0 ? 'Konut Tipi' : selectedPropertyTypes.length === propertyTypeOptions.length ? 'Tümü' : selectedPropertyTypes.join(', ')}
                      <span style={{marginLeft:8}}>▼</span>
                    </MultiSelectButton>
                    {propertyTypeDropdownOpen && (
                      <MultiSelectList>
                        <MultiSelectItem onClick={() => handleMultiSelectAll(propertyTypeOptions, selectedPropertyTypes, setSelectedPropertyTypes)}>
                          <input type="checkbox" checked={selectedPropertyTypes.length === propertyTypeOptions.length} readOnly style={{accentColor:'#7c3aed'}} />
                          <span>Tümü</span>
                        </MultiSelectItem>
                        {propertyTypeOptions.map(opt => (
                          <MultiSelectItem key={opt} onClick={() => {
                            setSelectedPropertyTypes(prev => prev.includes(opt) ? prev.filter(t => t !== opt) : [...prev, opt]);
                          }}>
                            <input type="checkbox" checked={selectedPropertyTypes.includes(opt)} readOnly style={{accentColor:'#7c3aed'}} />
                            <span>{opt}</span>
                          </MultiSelectItem>
                        ))}
                      </MultiSelectList>
                    )}
                  </MultiSelectDropdown>
                  <div style={{display:'flex',alignItems:'center',gap:0,position:'relative',top:'-8px'}}>
                    <SearchInput
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      min={0}
                      value={minPrice}
                      onChange={e => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        setMinPrice(val);
                      }}
                      placeholder="Min TL"
                      style={{width:110}}
                    />
                    <span style={{color: '#888', fontWeight: 600, position:'relative', top:'-2px', fontSize:'1.3rem', margin:'0 6px'}}>–</span>
                    <SearchInput
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      min={0}
                      value={maxPrice}
                      onChange={e => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        setMaxPrice(val);
                      }}
                      placeholder="Max TL"
                      style={{width:110}}
                    />
                  </div>
                </SearchRow>
                {/* 3. satır: Oda Sayısı, TL, Ara */}
                <SearchRow>
                  <SearchSelect value={odaSayisi} onChange={e => setOdaSayisi(e.target.value)} style={{minWidth:110}}>
                    {odaSayisiOptions.map(opt => (
                      <option key={opt} value={opt === 'Oda Sayısı' ? '' : opt}>{opt}</option>
                    ))}
                  </SearchSelect>
                  <SearchSelect value="TL" disabled style={{width:60}}>
                    <option>TL</option>
                    <option>USD</option>
                    <option>EUR</option>
                  </SearchSelect>
                  <div style={{flex:1}} />
                  <SearchButton type="submit" style={{marginLeft:'auto',minWidth:120}}>
                    Ara
                  </SearchButton>
                </SearchRow>
              </SearchRows>
            </SearchForm>
            {error && <div style={{color:'#e53e3e', fontWeight:600, marginTop:8}}>{error}</div>}
          </SearchSection>
        </HeroContent>
      </HeroSection>

      {/* Arama Sonuçları */}
      <FeaturesSection>
        <FeaturesGrid>
          {searchAttempted && filteredProperties.length === 0 && (
            <div style={{gridColumn: '1/-1', textAlign: 'center', color: '#e53e3e', fontSize: '1.3rem', fontWeight: 600, padding: '2rem 0'}}>
              Aradığınız kriterlere uygun ilan bulunamadı.
            </div>
          )}
          {filteredProperties.map((property) => (
            <FeatureCard key={property.id} style={{cursor:'pointer'}} onClick={() => navigate(`/property/${property.id}`)}>
              <img src={property.image} alt={property.title} style={{width: '100%', height: 180, objectFit: 'cover', borderRadius: 8, marginBottom: 16}} />
              <FeatureTitle>{property.title}</FeatureTitle>
              <FeatureDescription>
                {property.location} <br />
                <b>{property.price.toLocaleString('tr-TR')} TL</b> <br />
                {property.rooms} | {property.area} | {property.type}
              </FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesSection>

      <StatsSection>
        <StatsGrid>
          <StatItem>
            <h3>10,000+</h3>
            <p>Aktif İlan</p>
          </StatItem>
          <StatItem>
            <h3>5,000+</h3>
            <p>Mutlu Müşteri</p>
          </StatItem>
          <StatItem>
            <h3>50+</h3>
            <p>Şehir</p>
          </StatItem>
          <StatItem>
            <h3>24/7</h3>
            <p>Destek</p>
          </StatItem>
        </StatsGrid>
      </StatsSection>

      <FeaturesSection>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
            Hemen Başlayın
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '2rem' }}>
            Hayalinizdeki evi bulmak için hemen aramaya başlayın veya 
            hesabınızı oluşturun.
          </p>
          <CTAButton to="/properties">
            Emlakları Görüntüle
          </CTAButton>
        </div>
      </FeaturesSection>
    </>
  );
};

export default HomePage; 