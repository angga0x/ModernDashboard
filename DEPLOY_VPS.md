# Panduan Deployment di VPS

Berikut adalah langkah-langkah untuk melakukan deployment aplikasi ModernDashboard PPOB di VPS.

## Prasyarat

- Node.js (versi 18 atau lebih baru)
- NPM (versi 8 atau lebih baru)
- Git
- VPS dengan OS Linux (Ubuntu, Debian, CentOS, dll)
- Nginx atau server web lain untuk reverse proxy (opsional)

## Langkah-langkah Deployment

### 1. Clone Repository

```bash
git clone <url-repository-anda>
cd ModernDashboard
```

### 2. Install Dependensi

```bash
npm install --production
```

### 3. Build Aplikasi

```bash
npm run build:vps
```

### 4. Konfigurasi Environment Variables

Buat file `.env` di root proyek:

```
NODE_ENV=production
PORT=4000
X_API_KEY=yourSecureApiKey
```

### 5. Jalankan Aplikasi

#### Opsi 1: Menjalankan Langsung

```bash
npm run start:vps
```

#### Opsi 2: Menggunakan Process Manager (Direkomendasikan)

Install PM2:

```bash
npm install -g pm2
```

Buat file konfigurasi PM2 `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [
    {
      name: "ppob-dashboard",
      script: "dist/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
        X_API_KEY: "yourSecureApiKey"
      },
      instances: "max",
      exec_mode: "cluster"
    }
  ]
};
```

Jalankan dengan PM2:

```bash
pm2 start ecosystem.config.js
```

Pastikan aplikasi dimulai otomatis pada saat boot:

```bash
pm2 startup
pm2 save
```

### 6. Konfigurasi Reverse Proxy dengan Nginx

Contoh konfigurasi Nginx (`/etc/nginx/sites-available/ppob-dashboard`):

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Aktifkan konfigurasi:

```bash
sudo ln -s /etc/nginx/sites-available/ppob-dashboard /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 7. Konfigurasi SSL dengan Certbot (Opsional)

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Pembaruan Aplikasi

Untuk memperbarui aplikasi:

```bash
git pull
npm install --production
npm run build:vps
pm2 restart ppob-dashboard
```

## Monitoring

Anda dapat memantau aplikasi dengan PM2:

```bash
pm2 status
pm2 monit
pm2 logs
``` 