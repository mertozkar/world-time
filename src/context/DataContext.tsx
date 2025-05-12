import React, { createContext, useContext, useState, useEffect } from 'react';
import fetchApi from '../api/fetchApi';
import usersData from '../users.json';

interface TimeData {
  timeStr: string;
  dateStr: string;
}

interface DataContextType {
  timezones: string[];
  loading: boolean;
  error: string | null;
  getTimeZones: () => Promise<string[] | null>;
  fetchTimeData: (userId: number | 'guest') => Promise<TimeData>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timezones, setTimezones] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getTimeZones = async (): Promise<string[] | null> => {
    setLoading(true);
    try {
      const data = await fetchApi<string[]>('https://timeapi.io/api/TimeZone/AvailableTimeZones');
      setTimezones(data);
      return data;
    } catch (error: any) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchTimeData = async (userId: number | 'guest'): Promise<TimeData> => {
    try {
      // Kullanıcı bilgilerini al
      const user =
        userId === 'guest'
          ? {
              timezone: 'Europe/Istanbul',
              is24Hour: true,
              dateFormat: 'DD/MM/YYYY',
              name: 'Misafir',
            }
          : (usersData as any[]).find((u) => u.id === userId);
  
      if (!user) {
        throw new Error('Kullanıcı bulunamadı');
      }
  
      // Timezone'u encode et
      const encodedTimezone = encodeURIComponent(user.timezone);
  
      // API'den zaman bilgisi al
      const data = await fetchApi<any>(`https://timeapi.io/api/time/current/zone?timeZone=${encodedTimezone}`);
  
      const days = {
        sunday: 'Pazar',
        monday: 'Pazartesi',
        tuesday: 'Salı',
        wednesday: 'Çarşamba',
        thursday: 'Perşembe',
        friday: 'Cuma',
        saturday: 'Cumartesi',
      };
  
      const months = [
        'Ocak',
        'Şubat',
        'Mart',
        'Nisan',
        'Mayıs',
        'Haziran',
        'Temmuz',
        'Ağustos',
        'Eylül',
        'Ekim',
        'Kasım',
        'Aralık',
      ];
  
      // Saat formatını düzenle
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: !user.is24Hour,
      };
      const formattedTime = new Date(data.dateTime).toLocaleTimeString('tr-TR', timeOptions);
  
      // Tarih formatını düzenle
      const currentDate = new Date(data.dateTime);
      const day = String(currentDate.getDate()).padStart(2, '0'); // Gün
      const month = months[currentDate.getMonth()]; // Ay (Türkçe)
      const year = currentDate.getFullYear(); // Yıl
      const dayOfWeek = days[data.dayOfWeek.toLowerCase()]; // Gün (Türkçe)
  
      // Kullanıcının tarih formatına göre düzenleme
      const dateStr =
        user.dateFormat === 'DD/MM/YYYY'
          ? `${day} ${month}, ${dayOfWeek}` // Örnek: 12 Mayıs, Çarşamba
          : `${month} ${day}, ${dayOfWeek}`; // Örnek: Mayıs 12, Çarşamba
  
      return { timeStr: formattedTime, dateStr };
    } catch (error: any) {
      console.error('Zaman bilgisi alınamadı:', error.message);
      return { timeStr: 'Hata', dateStr: 'Hata' };
    }
  };

  const fetchTimeDetail = async (timezone: string): Promise<TimeData | null> => {
    try {
      const encodedTimezone = encodeURIComponent(timezone);

      // API'den zaman bilgisi al
      const data = await fetchApi<any>(`https://timeapi.io/api/time/current/zone?timeZone=${encodedTimezone}`);

      const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
      const months = [
        'Ocak',
        'Şubat',
        'Mart',
        'Nisan',
        'Mayıs',
        'Haziran',
        'Temmuz',
        'Ağustos',
        'Eylül',
        'Ekim',
        'Kasım',
        'Aralık',
      ];

      // Tarih ve saat bilgilerini düzenle
      const currentDate = new Date(data.dateTime);
      const dayName = days[currentDate.getDay()];
      const dateStr = `${currentDate.getDate()} ${months[currentDate.getMonth()]}, ${currentDate.getFullYear()}`;
      const hour = currentDate.getHours().toString().padStart(2, '0');
      const minute = currentDate.getMinutes().toString().padStart(2, '0');

      return {
        timeStr: `${hour}:${minute}`,
        dayStr: `${dayName}`,
        dateStr: `${dateStr}`,
      };
    } catch (error: any) {
      console.error('Zaman bilgisi alınamadı:', error.message);
      return null;
    }
  };


  const values = {
    timezones,
    loading,
    error,
    getTimeZones,
    fetchTimeData,
    fetchTimeDetail
  };

  return (
    <DataContext.Provider value={values}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};