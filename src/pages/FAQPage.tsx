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
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  color: #1e293b;
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
    background: radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.03) 0%, transparent 50%);
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
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  
  span {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Subtitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: #64748b;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 400;
`;

const FAQSection = styled.div`
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const FAQItem = styled.div<{ isOpen: boolean }>`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  margin-bottom: 1rem;
  border: 1px solid rgba(16, 185, 129, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.1);
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
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(16, 185, 129, 0.05);
  }
  
  .icon {
    font-size: 1.2rem;
    color: #10b981;
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

const FAQAnswer = styled.div<{ isOpen: boolean }>`
  padding: ${props => props.isOpen ? '0 2rem 1.5rem 2rem' : '0 2rem'};
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  color: #6b7280;
  line-height: 1.6;
  border-top: ${props => props.isOpen ? '1px solid rgba(16, 185, 129, 0.1)' : 'none'};
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
      id: 1,
      question: "Emlak alım-satım işlemlerinde hangi belgeler gerekli?",
      answer: "Emlak alım-satım işlemlerinde tapu, kimlik fotokopisi, vergi levhası, emlak beyannamesi ve gerekli durumlarda noter belgeleri gereklidir. Detaylı liste için müşteri hizmetlerimizle iletişime geçebilirsiniz."
    },
    {
      id: 2,
      question: "Konut kredisi alırken dikkat edilmesi gerekenler nelerdir?",
      answer: "Konut kredisi alırken faiz oranları, vade süresi, ön ödeme oranı, kredi limiti ve bankanın şartlarını detaylı olarak incelemeniz önemlidir. Ayrıca gelir belgelerinizin güncel olması gerekmektedir."
    },
    {
      id: 3,
      question: "Emlak değerleme nasıl yapılır?",
      answer: "Emlak değerleme, konum, bina yaşı, metrekare, oda sayısı, kat durumu, ısıtma sistemi ve çevre faktörleri göz önünde bulundurularak yapılır. Uzman değerleme ekibimiz size detaylı rapor sunar."
    },
    {
      id: 4,
      question: "Kiralık ev ararken nelere dikkat etmeliyim?",
      answer: "Kiralık ev ararken bütçenizi, lokasyonu, ulaşım imkanlarını, güvenliği, evin durumunu ve kira sözleşmesinin şartlarını detaylı olarak değerlendirmeniz önerilir."
    },
    {
      id: 5,
      question: "Emlak vergileri ne zaman ödenir?",
      answer: "Emlak vergileri genellikle yılda iki taksit halinde ödenir. İlk taksit Mart ayında, ikinci taksit ise Kasım ayında sona erer. Belediyenizin web sitesinden detaylı bilgi alabilirsiniz."
    },
    {
      id: 6,
      question: "Ev satarken hangi masraflar çıkar?",
      answer: "Ev satarken emlak komisyonu, tapu harcı, noter masrafları, vergi ve gerekli durumlarda ekspertiz ücreti gibi masraflar çıkabilir. Detaylı maliyet analizi için danışmanlarımızla görüşebilirsiniz."
    },
    {
      id: 7,
      question: "Yatırım amaçlı emlak alırken hangi bölgeler tercih edilmeli?",
      answer: "Yatırım amaçlı emlak alırken gelişmekte olan bölgeler, toplu taşıma imkanları, eğitim kurumları ve ticari merkezlere yakınlık önemli faktörlerdir. Uzman analiz ekibimiz size özel öneriler sunar."
    },
    {
      id: 8,
      question: "Emlak sigortası zorunlu mu?",
      answer: "Emlak sigortası yasal olarak zorunlu değildir ancak evinizin ve eşyalarınızın güvenliği için önerilir. Deprem, hırsızlık ve doğal afetlere karşı koruma sağlar."
    }
  ];

  return (
    <Container>
      <HeroSection>
        <Title>Sıkça Sorulan <span>Sorular</span></Title>
        <Subtitle>
          Emlak işlemlerinizle ilgili merak ettiğiniz soruların cevaplarını burada bulabilirsiniz
        </Subtitle>
      </HeroSection>

      <FAQSection>
        {faqData.map((item) => (
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
      </FAQSection>
    </Container>
  );
};

export default FAQPage; 