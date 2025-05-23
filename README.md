# World Time

World Time, dünya saatlerini görüntülemek ve zaman dilimlerini yönetmek için geliştirilmiş bir React uygulamasıdır.

---

## 📖 Özellikler

- Kullanıcı giriş sistemi (misafir veya kayıtlı kullanıcı).
- Kullanıcının `theme` (light/dark) ayarına göre otomatik tema seçimi.
- Zaman dilimlerini listeleme ve arama.
- Infinite scroll ile zaman dilimlerini yükleme.
- Zaman dilimi detaylarını görüntüleme.

---

## 🚀 Kullanılan Teknolojiler ve Kütüphaneler

- **React**: Kullanıcı arayüzü geliştirmek için.
- **TypeScript**: Tip güvenliği sağlamak için.
- **Vite**: Hızlı geliştirme ortamı için.
- **Emotion**: CSS-in-JS ile stillendirme.
- **React Router**: Sayfa yönlendirmeleri için.
- **TimeAPI**: Zaman dilimi verilerini almak için.
- **LocalStorage**: Kullanıcı bilgilerini saklamak için.

---

## 📂 Proje Yapısı

```plaintext
src/
├── api/
│   └── fetchApi.ts          # API çağrıları için yardımcı fonksiyon
├── assets/
│   ├── arrow-left.png       # Geri butonu ikonu
│   ├── moon.png             # Dark mode ikonu
│   ├── sun.png              # Light mode ikonu
│   └── search.png           # Arama ikonu
├── components/
│   ├── Header.tsx           # Uygulama başlığı
│   ├── ListItem.tsx         # Zaman dilimi liste öğesi
│   └── Splash.tsx           # Yüklenme ekranı
├── context/
│   ├── DataContext.tsx      # Veri yönetimi ve API çağrıları
│   └── ThemeContext.tsx     # Tema yönetimi
├── pages/
│   ├── Home.tsx             # Ana sayfa
│   └── WorldTimeDetail.tsx # Zaman dilimi detay sayfası
├── users.json               # Kullanıcı bilgileri
└── main.tsx                # Uygulama giriş noktası
```

---

## 🛠️ Kurulum ve Çalıştırma

### 1. Depoyu Klonlayın

```bash
git clone https://github.com/mertozkar/world-time.git
cd world-time
```

### 2. Gerekli Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Uygulamayı Çalıştırın

```bash
npm run dev
```

### 4. Uygulamayı Ziyaret Edin

Tarayıcınızda şu adresi açın:

```
http://localhost:5173
```

---
