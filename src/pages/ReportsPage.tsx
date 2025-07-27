import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

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

const FilterSection = styled.div`
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

const ExportButton = styled.button`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ChartTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SummaryCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const SummaryCard = styled.div`
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

const SummaryIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const SummaryNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #10b981;
  margin-bottom: 0.5rem;
`;

const SummaryLabel = styled.div`
  color: #64748b;
  font-weight: 500;
`;

const ReportsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [reportType, setReportType] = useState('all');

  // Satış trendi verisi
  const salesTrendData = {
    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
    datasets: [
      {
        label: 'Satış Geliri (Milyon TL)',
        data: [2.1, 2.8, 3.2, 3.8, 4.1, 4.5],
        borderColor: 'rgb(102, 126, 234)',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const salesTrendOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Bölge dağılımı verisi
  const regionData = {
    labels: ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Diğer'],
    datasets: [
      {
        data: [45, 20, 15, 10, 7, 3],
        backgroundColor: [
          'rgba(102, 126, 234, 0.8)',
          'rgba(118, 75, 162, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
        borderColor: [
          'rgba(102, 126, 234, 1)',
          'rgba(118, 75, 162, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(251, 146, 60, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(107, 114, 128, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const regionOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  // Aylık performans verisi
  const performanceData = {
    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
    datasets: [
      {
        label: 'Satılan Emlaklar',
        data: [12, 19, 15, 25, 22, 30],
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 1,
      },
      {
        label: 'Kiralanan Emlaklar',
        data: [8, 15, 12, 18, 20, 25],
        backgroundColor: 'rgba(118, 75, 162, 0.8)',
        borderColor: 'rgba(118, 75, 162, 1)',
        borderWidth: 1,
      },
    ],
  };

  const performanceOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const summaryData = {
    totalRevenue: '₺25.3M',
    totalProperties: '1,247',
    activeUsers: '5,234',
    conversionRate: '23.5%'
  };

  const handleExport = (format?: string) => {
    // Rapor verilerini hazırla
    const reportData = {
      timeRange,
      reportType,
      summaryData,
      salesTrend: salesTrendData,
      regionDistribution: regionData,
      performance: performanceData,
      exportDate: new Date().toISOString(),
      reportTitle: `Emlak Platform Raporu - ${timeRange} - ${reportType}`
    };

    // Dosya adı oluştur
    const fileName = `emlak-raporu-${timeRange}-${reportType}-${new Date().toISOString().split('T')[0]}`;
    
    let message = '';

    // Format seçimine göre indirme işlemi
    if (format === '1' || format === '3') {
      // JSON formatında rapor oluştur
      const reportContent = JSON.stringify(reportData, null, 2);
      const jsonBlob = new Blob([reportContent], { type: 'application/json' });
      const jsonUrl = URL.createObjectURL(jsonBlob);
      const jsonLink = document.createElement('a');
      jsonLink.href = jsonUrl;
      jsonLink.download = `${fileName}.json`;
      document.body.appendChild(jsonLink);
      jsonLink.click();
      document.body.removeChild(jsonLink);
      URL.revokeObjectURL(jsonUrl);
      message += 'JSON dosyası indirildi. ';
    }

    if (format === '2' || format === '3') {
      // CSV formatında rapor oluştur
      const csvContent = createCSVReport(reportData);
      const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const csvUrl = URL.createObjectURL(csvBlob);
      const csvLink = document.createElement('a');
      csvLink.href = csvUrl;
      csvLink.download = `${fileName}.csv`;
      document.body.appendChild(csvLink);
      csvLink.click();
      document.body.removeChild(csvLink);
      URL.revokeObjectURL(csvUrl);
      message += 'CSV dosyası indirildi. ';
    }

    // Başarı mesajı göster
    if (message) {
      alert(`Rapor başarıyla indirildi! ${message}`);
    } else {
      alert('Rapor indirme işlemi iptal edildi.');
    }
  };

  const createCSVReport = (data: any) => {
    const headers = [
      'Rapor Başlığı',
      'Zaman Aralığı', 
      'Rapor Türü',
      'Toplam Gelir',
      'Toplam Emlak',
      'Aktif Kullanıcı',
      'Dönüşüm Oranı',
      'Dışa Aktarma Tarihi'
    ];
    
    const values = [
      data.reportTitle,
      data.timeRange,
      data.reportType,
      data.summaryData.totalRevenue,
      data.summaryData.totalProperties,
      data.summaryData.activeUsers,
      data.summaryData.conversionRate,
      new Date(data.exportDate).toLocaleDateString('tr-TR')
    ];
    
    return [headers.join(','), values.join(',')].join('\n');
  };

  return (
    <Container>
      <PageHeader>
        <PageTitle>📊 Raporlar</PageTitle>
        <PageSubtitle>Platform performansını analiz edin</PageSubtitle>
      </PageHeader>

      <FilterSection>
        <FilterSelect
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="week">Son 7 Gün</option>
          <option value="month">Son 30 Gün</option>
          <option value="quarter">Son 3 Ay</option>
          <option value="year">Son 1 Yıl</option>
        </FilterSelect>
        
        <FilterSelect
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="all">Tüm Raporlar</option>
          <option value="sales">Satış Raporları</option>
          <option value="users">Kullanıcı Raporları</option>
          <option value="properties">Emlak Raporları</option>
        </FilterSelect>
        
        <ExportButton onClick={() => {
          const format = prompt('Hangi formatta indirmek istiyorsunuz?\n1. JSON (Detaylı veri)\n2. CSV (Tablo formatı)\n3. Her ikisi\n\nLütfen 1, 2 veya 3 yazın:');
          if (format) {
            handleExport(format);
          }
        }}>
          📥 Raporu İndir
        </ExportButton>
      </FilterSection>

      <SummaryCards>
        <SummaryCard>
          <SummaryIcon>💰</SummaryIcon>
          <SummaryNumber>{summaryData.totalRevenue}</SummaryNumber>
          <SummaryLabel>Toplam Gelir</SummaryLabel>
        </SummaryCard>
        <SummaryCard>
          <SummaryIcon>🏠</SummaryIcon>
          <SummaryNumber>{summaryData.totalProperties}</SummaryNumber>
          <SummaryLabel>Toplam Emlak</SummaryLabel>
        </SummaryCard>
        <SummaryCard>
          <SummaryIcon>👥</SummaryIcon>
          <SummaryNumber>{summaryData.activeUsers}</SummaryNumber>
          <SummaryLabel>Aktif Kullanıcı</SummaryLabel>
        </SummaryCard>
        <SummaryCard>
          <SummaryIcon>📈</SummaryIcon>
          <SummaryNumber>{summaryData.conversionRate}</SummaryNumber>
          <SummaryLabel>Dönüşüm Oranı</SummaryLabel>
        </SummaryCard>
      </SummaryCards>

      <ChartsGrid>
        <ChartCard>
          <ChartTitle>📈 Satış Trendi</ChartTitle>
          <Line data={salesTrendData} options={salesTrendOptions} />
        </ChartCard>
        
        <ChartCard>
          <ChartTitle>🍩 Bölge Dağılımı</ChartTitle>
          <Doughnut data={regionData} options={regionOptions} />
        </ChartCard>
        
        <ChartCard>
          <ChartTitle>📊 Aylık Performans</ChartTitle>
          <Bar data={performanceData} options={performanceOptions} />
        </ChartCard>
        
        <ChartCard>
          <ChartTitle>📋 Detaylı İstatistikler</ChartTitle>
          <div style={{ padding: '1rem', color: '#64748b' }}>
            <h4>Öne Çıkan Metrikler:</h4>
            <ul style={{ textAlign: 'left', lineHeight: '1.8' }}>
              <li>🟢 En çok satış: Haziran ayında %25 artış</li>
              <li>🔵 En popüler bölge: İstanbul (%45 pay)</li>
              <li>🟡 Ortalama işlem süresi: 18 gün</li>
              <li>🟣 Müşteri memnuniyeti: %94</li>
              <li>🟠 Yeni kullanıcı kayıtları: Aylık %12 artış</li>
            </ul>
          </div>
        </ChartCard>
      </ChartsGrid>
    </Container>
  );
};

export default ReportsPage; 