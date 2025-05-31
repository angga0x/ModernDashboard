# ModernDashboard PPOB

Dashboard modern untuk sistem PPOB (Payment Point Online Bank)

## Teknologi

- Frontend: React, TypeScript, Tailwind CSS
- Backend: Express.js, TypeScript
- Deployment: Vercel

## Pengembangan Lokal

1. Install dependensi:
```bash
npm install
```

2. Jalankan dalam mode development:
```bash
# Untuk Linux/macOS
npm run dev

# Untuk Windows
npm run dev:win
```

3. Buka http://localhost:4000 di browser

## Deployment ke Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login ke Vercel:
```bash
vercel login
```

3. Deploy ke Vercel:
```bash
vercel
```

4. Untuk deployment produksi:
```bash
vercel --prod
```

## Variabel Lingkungan

Buat file `.env` di root proyek dengan konten berikut:

```
NODE_ENV=development
PORT=4000
X_API_KEY=yourApiKey
```

Pastikan untuk mengatur variabel lingkungan yang sama di Vercel. 