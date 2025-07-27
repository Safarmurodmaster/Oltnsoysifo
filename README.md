# 🏥 Oltinsoy Xususiy Sanatoriyasi Admin Panel

Oltinsoy Xususiy Sanatoriyasi uchun admin panel va boshqaruv tizimi.

## 🚀 O'rnatish va ishga tushirish

### 1. Dasturlarni o'rnatish
```bash
npm install
```

### 2. Local ishga tushirish
```bash
npm start
```

### 3. Statik IP sozlash (ixtiyoriy)

#### Windows uchun:
1. **Network Settings** oching
2. **Change adapter options** bosing
3. **Ethernet** yoki **Wi-Fi** ni o'ng tugma bilan bosing
4. **Properties** tanlang
5. **Internet Protocol Version 4 (TCP/IPv4)** ni tanlang
6. **Properties** bosing
7. **Use the following IP address** ni tanlang
8. Quyidagi ma'lumotlarni kiriting:
   ```
   IP address: 192.168.228.166
   Subnet mask: 255.255.255.0
   Default gateway: 192.168.228.104
   DNS: 8.8.8.8
   ```

#### Linux uchun:
```bash
sudo nano /etc/netplan/01-netcfg.yaml
```

Quyidagi kodni qo'shing:
```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      addresses:
        - 192.168.1.100/24
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]
```

Keyin:
```bash
sudo netplan apply
```

### 4. Server ishga tushirish
```bash
npm start
```

## 🌐 Hosting va Domain

### Heroku uchun:
1. Heroku account yarating
2. Heroku CLI o'rnating
3. Loyihani deploy qiling:
```bash
heroku create oltinsoy-sanatoriyasi
git add .
git commit -m "Initial commit"
git push heroku main
```

### Vercel uchun:
1. Vercel account yarating
2. GitHub repository ga ulang
3. Vercel dashboard da deploy qiling

### Netlify uchun:
1. Netlify account yarating
2. GitHub repository ga ulang
3. Build command: `npm run build`
4. Publish directory: `./`

### DigitalOcean, AWS, yoki boshqa VPS:
1. Server o'rnating
2. Node.js va PM2 o'rnating
3. Loyihani clone qiling
4. PM2 bilan ishga tushiring:
```bash
pm2 start server.js --name "oltinsoy-admin"
pm2 startup
pm2 save
```

## 🌐 Kirish manzillari

### Local (kompyuter ichida):
- **Asosiy sahifa:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin
- **Admin Login:** http://localhost:3000/admin-login

### Statik IP (tarmoqda):
- **Asosiy sahifa:** http://192.168.228.166:3000
- **Admin Panel:** http://192.168.228.166:3000/admin
- **Admin Login:** http://192.168.228.166:3000/admin-login

## 🔐 Admin panel ma'lumotlari
- **Parol:** admin1234

## 📱 Mobil qurilmalardan kirish
Barcha mobil qurilmalar (telefon, tablet) statik IP orqali kirishadi:
```
http://192.168.228.166:3000/admin
```

## ⚙️ Sozlamalar

### Port o'zgartirish:
`server.js` faylida:
```javascript
const PORT = process.env.PORT || 3000; // 3000 ni o'zgartiring
```

### Statik IP o'zgartirish:
`server.js` faylida:
```javascript
const STATIC_IP = '192.168.228.166'; // O'zgartiring
```

## 🔧 Xavfsizlik
- Faqat ishonchli tarmoqlarda ishlatish
- Firewall sozlamalari
- Parolni muntazam o'zgartirish

## 📞 Yordam
Muammolar bo'lsa, texnik yordam bilan bog'laning. 