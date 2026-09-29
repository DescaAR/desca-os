# Desca OS

**Track. Improve. Grow.**

Desca OS adalah personal productivity operating system yang menghubungkan tujuan, task, focus session, activity log, progress, review, dan analytics dalam satu alur data.

## Fitur MVP

- Today command center
- Tasks + Inbox + Calendar
- Pomodoro otomatis (25/5, 50/10, custom) yang masuk activity log saat sesi selesai
- Focus session menyimpan jam mulai untuk analisis waktu belajar
- Goals + milestones
- GitHub-style activity heatmap
- XP otomatis dari durasi aktivitas, kategori, prioritas task, goal, Pomodoro, dan presensi
- Level, streak, achievements
- Study tracker dengan evaluasi 90 hari dan rekomendasi jam belajar berdasarkan histori
- Presensi harian satu tombol + attendance streak
- Research, Projects, Health trackers
- Finance ringan
- Daily journal
- Weekly review + analytics
- Dark mode
- Global search / command search
- Export/import backup JSON
- PWA + offline cache
- Local-first storage via `localStorage`

## Menjalankan lokal

Tidak membutuhkan package manager.

```bash
python3 -m http.server 3000
```

Lalu buka `http://localhost:3000`.

## Deployment

Project ini static dan dapat langsung dideploy ke Vercel, Netlify, GitHub Pages, Cloudflare Pages, atau hosting statis lain.

### Vercel

Framework preset: **Other / Static**  
Build command: **None**  
Output directory: **.**

## Data & privasi

Versi MVP bersifat local-first. Semua data pengguna disimpan di browser perangkat menggunakan `localStorage`. Tidak ada analytics pihak ketiga atau cloud sync.

Backend Supabase dapat ditambahkan pada fase berikutnya untuk authentication, multi-device sync, PostgreSQL, dan Row Level Security.

## Brand

- Deep Navy `#061B3E`
- Primary Navy `#0B2D6B`
- Primary Blue `#1565D8`
- Cyan Accent `#00C2FF`
- Light Blue `#F3F7FB`

## Repository

`desca-os`


## Deployment status

Source di branch `main` divalidasi otomatis oleh GitHub Actions dengan `node --check app.js`.

### Canonical hosting

Repository sudah siap diimpor sebagai static project ke Vercel tanpa build command.

Untuk GitHub Pages, workflow `.github/workflows/pages.yml` sudah disediakan. Setelah Pages diaktifkan dengan source **GitHub Actions**, jalankan workflow **Deploy Desca OS to GitHub Pages** dari tab Actions.

### Static CDN snapshot

Karena seluruh aplikasi bersifat static dan dependency-free, setiap commit immutable dapat langsung disajikan melalui CDN yang mendukung GitHub raw content dengan MIME type HTML/CSS/JS yang tepat.


## Automation v2

- Tidak ada input XP manual.
- Presensi memberi +15 XP dan tercatat sekali per hari.
- Pomodoro focus yang selesai otomatis menjadi activity lengkap dengan waktu mulai.
- Study Intelligence memakai sesi bertimestamp 90 hari terakhir untuk memeringkat blok waktu 2-jam berdasarkan durasi rata-rata, completion, dan jumlah bukti sesi.
- Rekomendasi baru muncul setelah minimal 3 sesi bertimestamp agar tidak mengarang pola dari data terlalu sedikit.
- PWA cache menggunakan network-first untuk file aplikasi agar pembaruan cepat terlihat setelah deploy.
