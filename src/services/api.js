const API_BASE_URL = 'http://localhost:5000/api';

// API istekleri için yardımcı fonksiyonlar
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Token varsa ekle
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  // Giriş yap
  login: (email, password) => 
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  // Kayıt ol
  register: (userData) => 
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  // Kullanıcı bilgilerini getir
  getMe: () => apiRequest('/auth/me'),
};

// Properties API
export const propertiesAPI = {
  // Tüm emlakları getir
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiRequest(`/properties?${params}`);
  },

  // Tek emlak detayı getir
  getById: (id) => apiRequest(`/properties/${id}`),

  // Yeni emlak ekle
  create: (propertyData, images = []) => {
    const formData = new FormData();
    
    // Property verilerini ekle
    Object.keys(propertyData).forEach(key => {
      formData.append(key, propertyData[key]);
    });

    // Resimleri ekle
    images.forEach((image, index) => {
      formData.append('images', image);
    });

    return fetch(`${API_BASE_URL}/properties`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    }).then(response => {
      if (!response.ok) {
        return response.json().then(errorData => {
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        });
      }
      return response.json();
    });
  },

  // Emlak güncelle
  update: (id, propertyData, images = []) => {
    const formData = new FormData();
    
    // Property verilerini ekle
    Object.keys(propertyData).forEach(key => {
      formData.append(key, propertyData[key]);
    });

    // Resimleri ekle
    images.forEach((image, index) => {
      formData.append('images', image);
    });

    return fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    }).then(response => {
      if (!response.ok) {
        return response.json().then(errorData => {
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        });
      }
      return response.json();
    });
  },

  // Emlak sil
  delete: (id) => 
    apiRequest(`/properties/${id}`, {
      method: 'DELETE',
    }),
};

// Users API
export const usersAPI = {
  // Tüm kullanıcıları getir
  getAll: () => apiRequest('/users'),

  // Kullanıcı detayı getir
  getById: (id) => apiRequest(`/users/${id}`),

  // Kullanıcı güncelle
  update: (id, userData) => 
    apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),

  // Kullanıcı durumunu değiştir
  updateStatus: (id, isActive) => 
    apiRequest(`/users/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ is_active: isActive }),
    }),

  // Kullanıcı ayarlarını güncelle
  updateSettings: (id, settings) => 
    apiRequest(`/users/${id}/settings`, {
      method: 'PUT',
      body: JSON.stringify(settings),
    }),

  // Kullanıcının emlaklarını getir
  getProperties: (id) => apiRequest(`/users/${id}/properties`),

  // Kullanıcının favorilerini getir
  getFavorites: (id) => apiRequest(`/users/${id}/favorites`),
};

// Messages API
export const messagesAPI = {
  // Kullanıcının konuşmalarını getir
  getConversations: (userId) => apiRequest(`/messages/conversations/${userId}`),

  // İki kullanıcı arasındaki mesajları getir
  getMessages: (userId, otherUserId) => apiRequest(`/messages/${userId}/${otherUserId}`),

  // Mesaj gönder
  send: (senderId, receiverId, message) => 
    apiRequest('/messages', {
      method: 'POST',
      body: JSON.stringify({ sender_id: senderId, receiver_id: receiverId, message }),
    }),

  // Mesajı okundu olarak işaretle
  markAsRead: (messageId) => 
    apiRequest(`/messages/${messageId}/read`, {
      method: 'PATCH',
    }),

  // Okunmamış mesaj sayısını getir
  getUnreadCount: (userId) => apiRequest(`/messages/${userId}/unread-count`),
};

// Notifications API
export const notificationsAPI = {
  // Kullanıcının bildirimlerini getir
  getAll: (userId, options = {}) => {
    const params = new URLSearchParams(options);
    return apiRequest(`/notifications/${userId}?${params}`);
  },

  // Yeni bildirim oluştur
  create: (notificationData) => 
    apiRequest('/notifications', {
      method: 'POST',
      body: JSON.stringify(notificationData),
    }),

  // Bildirimi okundu olarak işaretle
  markAsRead: (notificationId) => 
    apiRequest(`/notifications/${notificationId}/read`, {
      method: 'PATCH',
    }),

  // Tüm bildirimleri okundu olarak işaretle
  markAllAsRead: (userId) => 
    apiRequest(`/notifications/${userId}/read-all`, {
      method: 'PATCH',
    }),

  // Bildirimi sil
  delete: (notificationId) => 
    apiRequest(`/notifications/${notificationId}`, {
      method: 'DELETE',
    }),

  // Okunmamış bildirim sayısını getir
  getUnreadCount: (userId) => apiRequest(`/notifications/${userId}/unread-count`),

  // Toplu bildirim oluştur
  createBulk: (notificationData) => 
    apiRequest('/notifications/bulk', {
      method: 'POST',
      body: JSON.stringify(notificationData),
    }),
};

// Favorites API
export const favoritesAPI = {
  // Favori ekle
  add: (userId, propertyId) => 
    apiRequest('/favorites', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, property_id: propertyId }),
    }),

  // Favori sil
  remove: (userId, propertyId) => 
    apiRequest(`/favorites/${userId}/${propertyId}`, {
      method: 'DELETE',
    }),

  // Favori kontrolü
  check: (userId, propertyId) => apiRequest(`/favorites/${userId}/${propertyId}`),
};

// Appointments API
export const appointmentsAPI = {
  // Randevu oluştur
  create: (appointmentData) => 
    apiRequest('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    }),

  // Kullanıcının randevularını getir
  getByUser: (userId) => apiRequest(`/appointments/user/${userId}`),

  // Randevu güncelle
  update: (id, appointmentData) => 
    apiRequest(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appointmentData),
    }),

  // Randevu sil
  delete: (id) => 
    apiRequest(`/appointments/${id}`, {
      method: 'DELETE',
    }),
};

export default {
  auth: authAPI,
  properties: propertiesAPI,
  users: usersAPI,
  messages: messagesAPI,
  notifications: notificationsAPI,
  favorites: favoritesAPI,
  appointments: appointmentsAPI,
}; 