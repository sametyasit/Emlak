import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 20px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: 100%;
    background: radial-gradient(circle at 50% 0%, rgba(102, 126, 234, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const FAQSection = styled.div`
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const FAQItem = styled.div<{ isOpen: boolean }>`
  background: var(--card-bg);
  border-radius: 16px;
  margin-bottom: 1rem;
  border: 1px solid var(--border-color);
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const FAQQuestion = styled.button<{ isOpen: boolean }>`
  width: 100%;
  padding: 1.5rem 2rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-primary);
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--card-hover);
  }
  
  .icon {
    font-size: 1.2rem;
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

const FAQAnswer = styled.div<{ isOpen: boolean }>`
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding: ${props => props.isOpen ? '0 2rem 1.5rem 2rem' : '0 2rem'};
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 1rem;
`;

const CategorySection = styled.div`
  margin-bottom: 3rem;
  
  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const FAQPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const faqData = [
    {
      category: "🏠 Genel Sorular",
      items: [
        {
          id: 1,
          question: "Emlak platformunuzda kaç ilan bulunuyor?",
          answer: "Platformumuzda sürekli güncellenen binlerce emlak ilanı bulunmaktadır. İlan sayısı günlük olarak değişmekte olup, her zaman güncel veriler sunmaktayız."
        },
        {
          id: 2,
          question: "İlanları nasıl filtreleyebilirim?",
          answer: "Gelişmiş filtreleme seçeneklerimiz ile fiyat aralığı, konum, oda sayısı, emlak tipi ve daha birçok kriteri kullanarak aradığınız emlağı kolayca bulabilirsiniz."
        },
        {
          id: 3,
          question: "İlanlar güncel mi?",
          answer: "Evet, tüm ilanlarımız düzenli olarak güncellenmektedir. Satılan veya kiralanan emlaklar hemen platformdan kaldırılır."
        }
      ]
    },
    {
      category: "💰 Satış ve Kiralama",
      items: [
        {
          id: 4,
          question: "Emlak satış süreci nasıl işliyor?",
          answer: "Emlak satış sürecimiz profesyonel danışmanlarımız eşliğinde yürütülür. Değerleme, pazarlama, görüşmeler ve sözleşme süreçlerinde size destek oluruz."
        },
        {
          id: 5,
          question: "Kiralama için gerekli belgeler nelerdir?",
          answer: "Kiralama işlemi için kimlik, gelir belgesi, referans mektubu ve kefil bilgileri gerekebilir. Detaylı bilgi için danışmanlarımızla iletişime geçebilirsiniz."
        },
        {
          id: 6,
          question: "Komisyon oranları nedir?",
          answer: "Komisyon oranlarımız hizmet türüne ve emlak değerine göre değişmektedir. Detaylı bilgi için ofislerimizle iletişime geçebilirsiniz."
        }
      ]
    },
    {
      category: "📋 Hukuki Konular",
      items: [
        {
          id: 7,
          question: "Tapu işlemleri ne kadar sürer?",
          answer: "Tapu işlemleri genellikle 1-3 hafta arasında tamamlanır. Bu süre belge eksikliği ve resmi kurum yoğunluğuna göre değişebilir."
        },
        {
          id: 8,
          question: "Emlak vergisi nasıl hesaplanır?",
          answer: "Emlak vergisi, emlağın rayiç değeri ve bulunduğu bölgeye göre hesaplanır. Hesaplama aracımızı kullanarak yaklaşık tutarı öğrenebilirsiniz."
        },
        {
          id: 9,
          question: "Kentsel dönüşüm süreci nasıl işliyor?",
          answer: "Kentsel dönüşüm süreci riskli bina tespiti, anlaşma, proje ve inşaat aşamalarından oluşur. Uzman ekibimiz tüm süreçte yanınızda."
        }
      ]
    },
    {
      category: "💳 Kredi ve Finansman",
      items: [
        {
          id: 10,
          question: "Konut kredisi şartları nelerdir?",
          answer: "Konut kredisi için düzenli gelir, kredi notu, peşinat oranı ve yaş şartları aranır. Detaylı bilgi için banka ortaklarımızla görüşebiliriz."
        },
        {
          id: 11,
          question: "Kredi hesaplama aracı doğru mu?",
          answer: "Kredi hesaplama aracımız güncel faiz oranları ile çalışır ve yaklaşık sonuçlar verir. Kesin bilgi için banka ile görüşmeniz önerilir."
        },
        {
          id: 12,
          question: "Peşinat oranları değişti mi?",
          answer: "Peşinat oranları Merkez Bankası düzenlemelerine göre değişmektedir. Güncel oranlar için danışmanlarımızla iletişime geçebilirsiniz."
        }
      ]
    }
  ];

  return (
    <Container>
      <HeroSection>
        <Title>❓ Sık Sorulan Sorular</Title>
        <Subtitle>
          Emlak süreçleri hakkında merak ettiğiniz her şey. Uzman ekibimiz tarafından 
          hazırlanan detaylı cevaplar ile bilgilendirilirsiniz.
        </Subtitle>
      </HeroSection>

      <FAQSection>
        {faqData.map((category) => (
          <CategorySection key={category.category}>
            <h2>{category.category}</h2>
            {category.items.map((item) => (
              <FAQItem key={item.id} isOpen={openItems.includes(item.id)}>
                <FAQQuestion 
                  isOpen={openItems.includes(item.id)}
                  onClick={() => toggleItem(item.id)}
                >
                  {item.question}
                  <span className="icon">▼</span>
                </FAQQuestion>
                <FAQAnswer isOpen={openItems.includes(item.id)}>
                  {item.answer}
                </FAQAnswer>
              </FAQItem>
            ))}
          </CategorySection>
        ))}
      </FAQSection>
    </Container>
  );
};

export default FAQPage; 