# Desca OS

**Track. Improve. Grow.**

Desca OS adalah personal productivity operating system yang menghubungkan tujuan, task, focus session, activity log, progress, review, dan analytics dalam satu alur data.

## Fitur MVP

- Today command center
- Tasks + Inbox + Calendar
- Focus timer yang otomatis masuk activity log
- Goals + milestones
- GitHub-style activity heatmap
- XP, level, streak, achievements
- Study, Research, Projects, Health trackers
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
