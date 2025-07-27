import React from 'react';
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
  max-width: 1200px;
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

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const BlogCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.8s ease-out;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(16, 185, 129, 0.15);
  }
`;

const BlogImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, transparent 50%);
  }
`;

const BlogContent = styled.div`
  padding: 1.5rem;
`;

const BlogTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.8rem;
  line-height: 1.3;
`;

const BlogExcerpt = styled.p`
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.95rem;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #9ca3af;
  font-size: 0.85rem;
  font-weight: 500;
`;

const BlogPage: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: "2024 Emlak Piyasası Trendleri",
      excerpt: "Bu yıl emlak piyasasında yaşanan değişimler ve gelecek dönem için öngörüler...",
      date: "15 Mart 2024",
      readTime: "5 dk"
    },
    {
      id: 2,
      title: "Ev Alırken Dikkat Edilmesi Gerekenler",
      excerpt: "Doğru ev seçimi için göz önünde bulundurmanız gereken önemli faktörler...",
      date: "12 Mart 2024",
      readTime: "7 dk"
    },
    {
      id: 3,
      title: "Kredi Çekerken Bilmeniz Gerekenler",
      excerpt: "Konut kredisi alırken dikkat edilmesi gereken detaylar ve ipuçları...",
      date: "10 Mart 2024",
      readTime: "6 dk"
    },
    {
      id: 4,
      title: "Yatırım İçin En İyi Bölgeler",
      excerpt: "2024 yılında yatırım yapılabilecek en değerli emlak bölgeleri...",
      date: "8 Mart 2024",
      readTime: "8 dk"
    },
    {
      id: 5,
      title: "Emlak Vergileri Rehberi",
      excerpt: "Emlak alım-satım işlemlerinde ödenmesi gereken vergiler hakkında detaylı bilgi...",
      date: "5 Mart 2024",
      readTime: "10 dk"
    },
    {
      id: 6,
      title: "Tadilat ve Dekorasyon İpuçları",
      excerpt: "Evinizi değerlendirmek için yapabileceğiniz tadilat ve dekorasyon önerileri...",
      date: "3 Mart 2024",
      readTime: "9 dk"
    }
  ];

  return (
    <Container>
      <HeroSection>
        <Title>Emlak <span>Blog</span></Title>
        <Subtitle>
          Emlak dünyasından en güncel haberler, ipuçları ve rehberler
        </Subtitle>
      </HeroSection>

      <BlogGrid>
        {blogPosts.map((post) => (
          <BlogCard key={post.id}>
            <BlogImage>
              📰
            </BlogImage>
            <BlogContent>
              <BlogTitle>{post.title}</BlogTitle>
              <BlogExcerpt>{post.excerpt}</BlogExcerpt>
              <BlogMeta>
                <span>📅 {post.date}</span>
                <span>⏱️ {post.readTime}</span>
              </BlogMeta>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogGrid>
    </Container>
  );
};

export default BlogPage; 