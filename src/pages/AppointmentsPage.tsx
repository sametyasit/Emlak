import React, { useState } from 'react';
import styled from 'styled-components';

const AppointmentsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
`;

const PageTitle = styled.h1`
  color: #333;
  margin-bottom: 30px;
  font-size: 2rem;
  text-align: center;
`;

const CalendarContainer = styled.div`
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 30px;
  margin-bottom: 30px;
  border: 1px solid var(--border-color);
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const MonthYear = styled.h2`
  color: #333;
  margin: 0;
`;

const NavigationButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const NavButton = styled.button`
  background: #8B5CF6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #7C3AED;
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
`;

const DayHeader = styled.div`
  background: #f3f4f6;
  padding: 12px;
  text-align: center;
  font-weight: bold;
  color: #374151;
`;

const DayCell = styled.div<{ isCurrentMonth?: boolean; hasAppointment?: boolean; isToday?: boolean }>`
  background: ${props => props.isToday ? '#8B5CF6' : props.hasAppointment ? '#FEF3C7' : 'white'};
  color: ${props => props.isToday ? 'white' : props.isCurrentMonth ? '#374151' : '#9CA3AF'};
  padding: 12px;
  text-align: center;
  cursor: ${props => props.hasAppointment ? 'pointer' : 'default'};
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  &:hover {
    background: ${props => props.hasAppointment ? '#FDE68A' : props.isToday ? '#7C3AED' : '#f9fafb'};
  }
`;

const AppointmentDot = styled.div`
  width: 6px;
  height: 6px;
  background: #F59E0B;
  border-radius: 50%;
  margin-top: 4px;
`;

const AppointmentsList = styled.div`
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 30px;
  border: 1px solid var(--border-color);
`;

const AppointmentsTitle = styled.h3`
  color: #333;
  margin-bottom: 20px;
`;

const AppointmentCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-secondary);
`;

const AppointmentInfo = styled.div`
  flex: 1;
`;

const AppointmentTime = styled.div`
  font-weight: bold;
  color: #8B5CF6;
  font-size: 1.1rem;
`;

const AppointmentProperty = styled.div`
  color: #333;
  margin: 5px 0;
`;

const AppointmentLocation = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const AppointmentStatus = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  background: ${props => 
    props.status === 'confirmed' ? '#D1FAE5' : 
    props.status === 'pending' ? '#FEF3C7' : '#FEE2E2'
  };
  color: ${props => 
    props.status === 'confirmed' ? '#065F46' : 
    props.status === 'pending' ? '#92400E' : '#991B1B'
  };
`;

const AddAppointmentButton = styled.button`
  background: #8B5CF6;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;

  &:hover {
    background: #7C3AED;
  }
`;

const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: var(--card-bg);
  border-radius: 12px;
  padding: 30px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid var(--border-color);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  color: #333;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #8B5CF6;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  background: white;

  &:focus {
    border-color: #8B5CF6;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  resize: vertical;
  min-height: 100px;

  &:focus {
    border-color: #8B5CF6;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: #8B5CF6;
          color: white;
          &:hover {
            background: #7C3AED;
          }
        `;
      case 'secondary':
        return `
          background: #f3f4f6;
          color: #333;
          &:hover {
            background: #e5e7eb;
          }
        `;
      default:
        return `
          background: #8B5CF6;
          color: white;
          &:hover {
            background: #7C3AED;
          }
        `;
    }
  }}
`;

const AppointmentsPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    property: '',
    date: '',
    time: '',
    notes: ''
  });
  
  // Örnek randevu verileri
  const appointments = [
    {
      id: 1,
      date: new Date(2024, 11, 15),
      time: '14:00',
      property: 'Modern Daire - Kadıköy',
      location: 'Kadıköy, İstanbul',
      status: 'confirmed'
    },
    {
      id: 2,
      date: new Date(2024, 11, 20),
      time: '10:30',
      property: 'Lüks Villa - Beşiktaş',
      location: 'Beşiktaş, İstanbul',
      status: 'pending'
    },
    {
      id: 3,
      date: new Date(2024, 11, 25),
      time: '16:00',
      property: 'Bahçeli Ev - Çankaya',
      location: 'Çankaya, Ankara',
      status: 'cancelled'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
  const today = new Date();
  const isToday = (day: number) => {
    return currentDate.getFullYear() === today.getFullYear() &&
           currentDate.getMonth() === today.getMonth() &&
           day === today.getDate();
  };

  const hasAppointment = (day: number) => {
    return appointments.some(appointment => 
      appointment.date.getDate() === day &&
      appointment.date.getMonth() === currentDate.getMonth() &&
      appointment.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const renderCalendar = () => {
    const days = [];
    const dayNames = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
    
    // Gün isimleri
    dayNames.forEach(day => {
      days.push(<DayHeader key={day}>{day}</DayHeader>);
    });
    
    // Boş günler
    for (let i = 0; i < startingDay; i++) {
      days.push(<DayCell key={`empty-${i}`} />);
    }
    
    // Ayın günleri
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <DayCell 
          key={day} 
          isCurrentMonth={true}
          hasAppointment={hasAppointment(day)}
          isToday={isToday(day)}
        >
          {day}
          {hasAppointment(day) && <AppointmentDot />}
        </DayCell>
      );
    }
    
    return days;
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewAppointment({
      property: '',
      date: '',
      time: '',
      notes: ''
    });
  };

  const handleAppointmentChange = (field: string, value: string) => {
    setNewAppointment(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitAppointment = () => {
    if (newAppointment.property && newAppointment.date && newAppointment.time) {
      alert('Randevunuz başarıyla oluşturuldu! Emlak danışmanımız en kısa sürede size dönüş yapacak.');
      handleCloseModal();
    } else {
      alert('Lütfen tüm gerekli alanları doldurun.');
    }
  };

  return (
    <AppointmentsContainer>
      <PageTitle>📅 Randevularım</PageTitle>
      
      <CalendarContainer>
        <CalendarHeader>
          <MonthYear>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </MonthYear>
          <NavigationButtons>
            <NavButton onClick={previousMonth}>‹ Önceki</NavButton>
            <NavButton onClick={nextMonth}>Sonraki ›</NavButton>
          </NavigationButtons>
        </CalendarHeader>
        
        <CalendarGrid>
          {renderCalendar()}
        </CalendarGrid>
      </CalendarContainer>

      <AppointmentsList>
        <AppointmentsTitle>Yaklaşan Randevular</AppointmentsTitle>
        
        {appointments.length === 0 ? (
          <p>Henüz randevunuz bulunmuyor.</p>
        ) : (
          appointments.map(appointment => (
            <AppointmentCard key={appointment.id}>
              <AppointmentInfo>
                <AppointmentTime>{appointment.time}</AppointmentTime>
                <AppointmentProperty>{appointment.property}</AppointmentProperty>
                <AppointmentLocation>{appointment.location}</AppointmentLocation>
              </AppointmentInfo>
              <AppointmentStatus status={appointment.status}>
                {appointment.status === 'confirmed' ? 'Onaylandı' :
                 appointment.status === 'pending' ? 'Beklemede' : 'İptal Edildi'}
              </AppointmentStatus>
            </AppointmentCard>
          ))
        )}
        
        <AddAppointmentButton onClick={handleOpenModal}>
          + Yeni Randevu Al
        </AddAppointmentButton>
      </AppointmentsList>

      <Modal isOpen={isModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>📅 Yeni Randevu Al</ModalTitle>
            <CloseButton onClick={handleCloseModal}>×</CloseButton>
          </ModalHeader>
          
          <FormGroup>
            <Label>Emlak İlanı</Label>
            <Select
              value={newAppointment.property}
              onChange={(e) => handleAppointmentChange('property', e.target.value)}
            >
              <option value="">İlan seçin</option>
              <option value="Modern Daire - Kadıköy">Modern Daire - Kadıköy</option>
              <option value="Lüks Villa - Beşiktaş">Lüks Villa - Beşiktaş</option>
              <option value="Bahçeli Ev - Çankaya">Bahçeli Ev - Çankaya</option>
              <option value="Deniz Manzaralı Daire - Konak">Deniz Manzaralı Daire - Konak</option>
              <option value="Yeni Yapı Daire - Nilüfer">Yeni Yapı Daire - Nilüfer</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Tarih</Label>
            <Input
              type="date"
              value={newAppointment.date}
              onChange={(e) => handleAppointmentChange('date', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </FormGroup>

          <FormGroup>
            <Label>Saat</Label>
            <Select
              value={newAppointment.time}
              onChange={(e) => handleAppointmentChange('time', e.target.value)}
            >
              <option value="">Saat seçin</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Notlar (İsteğe bağlı)</Label>
            <TextArea
              value={newAppointment.notes}
              onChange={(e) => handleAppointmentChange('notes', e.target.value)}
              placeholder="Randevu ile ilgili özel notlarınızı buraya yazabilirsiniz..."
            />
          </FormGroup>

          <ButtonGroup>
            <Button variant="secondary" onClick={handleCloseModal}>
              İptal
            </Button>
            <Button onClick={handleSubmitAppointment}>
              Randevu Oluştur
            </Button>
          </ButtonGroup>
        </ModalContent>
      </Modal>
    </AppointmentsContainer>
  );
};

export default AppointmentsPage; 