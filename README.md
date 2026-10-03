# Desca OS

**Track. Improve. Grow.**

Desca OS adalah personal productivity operating system yang menghubungkan tujuan, task, focus session, activity log, progress, review, dan analytics dalam satu alur data.

## Fitur Utama

- Today command center + Needs Attention + Smart Daily Planner
- Tasks + Inbox dengan status Backlog/Planned/Doing/Done, subtasks, tags, dependencies, deadline, recurring task, dan Start Task → timer
- Calendar Month / Week / Day dengan drag-and-drop task antar tanggal, event detail, dan completion XP
- Pomodoro otomatis (25/5, 50/10, custom) + fullscreen Focus Mode
- Universal Activity Timer untuk Study, Research, Project, Health, English, Personal, dan task
- Focus session menyimpan jam mulai untuk analisis waktu belajar
- Goals + milestones + automatic progress dari milestone dan linked task
- GitHub-style activity heatmap
- XP otomatis dari durasi aktivitas, kategori, prioritas task, goal, dan Pomodoro
- Level, streak, heatmap, skill progress, dan milestones
- Study tracker dengan evaluasi 90 hari dan rekomendasi jam belajar berdasarkan histori
- Research dan Projects tracker
- Health dashboard: sleep, steps, weight, water, energy, mood, running, workout, dan historical association
- Life Log untuk routine, kegiatan wajib, planned vs actual, dan aktivitas spontan
- Finance lengkap: cashflow, needs/wants/savings, budgeting, recurring transaction, portfolio investasi, debt tracker, net worth snapshots, dan financial goals
- Daily journal
- Weekly review otomatis: improvement signals, warnings, goal check, finance, sleep, routine, dan study signal
- Dark mode
- Command Center (Ctrl/⌘+K): search + quick commands seperti `task`, `spent`, `income`, `studied`, dan `timer`
- Browser notifications untuk task/routine, deadline besok, budget warning, dan Pomodoro (saat app aktif)
- Export/import backup JSON
- PWA + offline cache
- Local-first storage via `localStorage`
- Optional Supabase login + cloud upload/download untuk multi-device state sync

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

Desca OS tetap **local-first**. Semua data utama disimpan di browser menggunakan `localStorage`, dan aplikasi tetap bisa dipakai tanpa akun. Optional Cloud Sync dapat diaktifkan dengan Supabase. Hanya **Project URL** dan **anon/publishable key** yang boleh dimasukkan ke browser; jangan pernah memakai service-role key.

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
- Pomodoro focus yang selesai otomatis menjadi activity lengkap dengan waktu mulai.
- Study Intelligence memakai sesi bertimestamp 90 hari terakhir untuk memeringkat blok waktu 2-jam berdasarkan durasi rata-rata, completion, dan jumlah bukti sesi.
- Rekomendasi baru muncul setelah minimal 3 sesi bertimestamp agar tidak mengarang pola dari data terlalu sedikit.
- PWA cache menggunakan network-first untuk file aplikasi agar pembaruan cepat terlihat setelah deploy.


## Calendar & Finance v2

- Google Hub dihapus dari aplikasi.
- Calendar memakai tampilan bulanan 6×7. Task dan routine muncul sebagai event biru; event dapat dibuka untuk melihat tanggal, jam, durasi, kategori, prioritas/sifat, linked goal, catatan, status, dan XP completion.
- Event dapat ditandai selesai langsung dari Calendar; Task memperoleh XP otomatis berdasarkan estimasi dan prioritas, sedangkan Routine dicatat sebagai activity dan memperoleh Activity XP.
- Finance mencakup transaksi, monthly budgeting per kategori, realisasi budget otomatis dari expense, investment portfolio tracker, gain/loss dan allocation, serta financial goals.
- Nilai investasi diupdate manual; Desca OS tidak memberikan rekomendasi investasi atau mengambil harga pasar eksternal.


## Desca OS vNext

### Universal Timer

Task dapat dijalankan melalui tombol **Start**. Timer aktivitas disimpan sebagai timestamp pada state, jadi reload halaman tidak menghilangkan waktu mulai. Saat dihentikan, timer otomatis menghasilkan Activity Log, XP, dan menyelesaikan linked task.

### Smart Daily Planner

Planner membaca:
- routine yang memiliki jam,
- task hari ini,
- deadline,
- prioritas,
- dependency,
- estimasi durasi,
- slot waktu kosong,
- rekomendasi jam belajar historis bila datanya cukup.

Auto-plan hanya memberi jam kepada task yang belum memiliki waktu dan tidak mengubah fixed routine.

### Notifications

Browser notification digunakan untuk reminder saat Desca OS sedang aktif:
- task mendekati jam mulai,
- task/routine terlambat,
- deadline besok,
- budget kategori >= 80%,
- Pomodoro selesai,
- gap beberapa hari pada study/health log.

Static PWA tanpa push server tidak dapat menjamin scheduled notification ketika browser sepenuhnya tertutup.

### Optional Supabase Cloud Sync

Cloud Sync tidak diperlukan untuk memakai Desca OS. Jika ingin sinkron lintas perangkat:

1. Buat project Supabase.
2. Buka SQL Editor dan jalankan isi `supabase.sql`.
3. Pastikan Email Auth aktif.
4. Dari Supabase Project Settings, salin:
   - Project URL
   - anon / publishable key
5. Masukkan keduanya di **Settings → Cloud Sync**.
6. Sign Up / Login.
7. Gunakan **Upload State** untuk mengirim state lokal ke cloud atau **Download State** untuk memuat state cloud.

RLS pada `supabase.sql` membatasi satu pengguna hanya ke row miliknya sendiri. Jangan pernah menaruh `service_role` key pada Desca OS frontend.


## Google Integration

Google tidak dibuat sebagai hub terpisah. Integrasi masuk langsung ke modul Desca OS:

- **Calendar**: Google Calendar events ditampilkan di Month/Week/Day view. Event Google dapat diimpor menjadi task Desca OS.
- **Tasks**: task Desca OS dapat dipilih untuk disinkronkan ke Google Tasks. Google Tasks pada list yang dipilih juga dapat ditarik ke Desca OS.
- **Drive App Data**: backup state Desca OS dapat disimpan ke folder aplikasi tersembunyi Google Drive dan dipulihkan kembali.
- OAuth access token hanya disimpan di memory session dan hilang setelah reload/disconnect.
- Client secret tidak digunakan di frontend.

### Google Cloud setup

1. Buat atau pilih Google Cloud project.
2. Enable:
   - Google Calendar API
   - Google Tasks API
   - Google Drive API
3. Konfigurasi OAuth consent screen.
4. Buat OAuth Client ID tipe **Web application**.
5. Tambahkan Authorized JavaScript origin:
   - `https://descaar.github.io`
   - untuk development lokal, tambahkan origin lokal yang benar-benar dipakai.
6. Jika OAuth app masih Testing, tambahkan akun Google yang dipakai sebagai test user.
7. Salin **Client ID** yang berakhiran `.apps.googleusercontent.com`.
8. Masukkan Client ID ke **Settings → Google Integration → Google OAuth Client ID**.
9. Tekan **Connect Google**.

Scopes yang dipakai:

- `https://www.googleapis.com/auth/calendar.events`
- `https://www.googleapis.com/auth/tasks`
- `https://www.googleapis.com/auth/drive.appdata`

Desca OS tidak meminta Gmail, Contacts, atau akses seluruh Google Drive.


## DMath Learning Growth Dashboard

Desca OS memiliki kategori khusus **DMath Learning** untuk memantau perkembangan brand secara terpisah dari project umum.

Dashboard mencakup:
- Instagram: current metric, target, progress, notes.
- YouTube: current metric, target, progress, notes.
- Facebook: current metric, target, progress, notes.
- Website: current metric, target, progress, notes.
- Overall progress dari empat platform.
- Histori perubahan metric.
- Task khusus DMath Learning dengan badge merah.
- Activity time, XP, dan grafik kerja 14 hari khusus DMath Learning.

Kategori `dmath` juga tersedia di Task, Activity Log, Universal Timer, Progress, Analytics, dan pencarian global.


## DMath Content OS

DMath Learning sekarang memiliki workflow konten end-to-end:

- Idea
- Draft
- Production
- Scheduled
- Published

Setiap konten menyimpan platform, format, status, jadwal publish, tanggal publish, URL, dan catatan. Konten terjadwal otomatis muncul di Calendar Desca OS.

Setiap platform juga dapat memiliki target jumlah konten bulanan. Dashboard menghitung jumlah konten yang sudah published pada bulan berjalan dan membandingkannya dengan target tersebut.


## Hafalan Al-Qur’an

Desca OS memiliki modul khusus untuk mencatat hafalan dan murajaah.

Fitur:
- Surah + rentang ayat + juz opsional.
- Status: Baru, Sedang Dihafal, Murajaah, Mutqin.
- Mastery 0–100%.
- Target tanggal selesai.
- Last review + next review.
- Murajaah due list dan badge perhatian di sidebar.
- Session log untuk hafalan baru atau murajaah.
- Kualitas sesi 1–5 menentukan jarak review berikutnya.
- Session otomatis menghasilkan Activity kategori Hafalan Al-Qur’an dan XP.
- Review berikutnya muncul di Calendar Desca OS.
- Browser notification dapat mengingatkan murajaah yang jatuh tempo.
- Task dan Universal Timer mendukung kategori `quran`.
- Global Search dapat menemukan rentang hafalan.


## Reliability v14

### Automatic Cloud Sync

Jika Supabase sudah dikonfigurasi dan pengguna login, perubahan lokal dijadwalkan untuk sync otomatis setelah perubahan berhenti beberapa saat.

Setiap state memiliki:
- `revision`
- `modifiedAt`
- `lastCloudSync`
- `lastCloudRevision`

Jika local dan cloud sama-sama berubah sejak sync terakhir, Desca OS tidak menimpa data secara otomatis. **Recovery → Cloud Conflict** meminta pengguna memilih:
- gunakan Local
- gunakan Cloud

Auto-sync tetap optional dan dapat dimatikan dari Settings.

### Recovery Center

Menu **Recovery** mencakup:
- Undo perubahan terbaru
- Trash hingga 30 hari
- Restore item dari Trash
- Version History hingga 20 checkpoint lokal
- Restore checkpoint
- Penyelesaian cloud conflict

Version History disimpan di IndexedDB agar tidak membengkakkan state utama di `localStorage`.

### Customizable Today Dashboard

Kartu Today dapat:
- ditampilkan/disembunyikan
- dipindah urutannya
- dikembalikan ke default

Widget yang dapat dikustomisasi meliputi Smart Planner, Daily Timeline, priorities, Life Plan, Universal Timer, Pomodoro, rekomendasi belajar, weekly target, goals, dan quick note opsional.

### Daily Timeline + Auto Replanning

Daily Timeline membandingkan **Planned** dan **Actual** berdasarkan jam.

Tombol **Replan Sisa Hari**:
- mengambil task belum selesai hari ini
- mempertimbangkan jam sekarang
- menghindari routine/event fixed yang memiliki jam
- mempertimbangkan dependency
- menyusun ulang task ke slot berikutnya
- memindahkan overflow ke besok jika melewati batas planner

Auto Replanning dapat diaktifkan dari Settings. Dalam mode otomatis, replanning dijalankan saat jadwal sudah tertinggal, maksimal per blok 30 menit agar tidak terus-menerus mengubah jadwal.

### Background Reminder Foundation

Reminder 7 hari ke depan dikirim ke Service Worker dan disimpan dalam IndexedDB worker.

Desca OS menggunakan kemampuan browser bila tersedia:
- Service Worker notifications
- Background Sync
- Periodic Background Sync
- Web Push event handler

Dukungan browser berbeda-beda. Tanpa push server, reminder presisi saat browser benar-benar ditutup **tidak dapat dijamin**. Pada browser/PWA yang mendukung Periodic Background Sync, worker dapat memeriksa reminder tanpa halaman aktif. Handler Web Push sudah disiapkan untuk integrasi push server berikutnya.


## Running Dashboard v15

Desca OS memiliki modul khusus **Running** di area Life.

Setiap sesi lari dapat menyimpan:
- tanggal dan jam
- tipe latihan: Easy, Recovery, Long, Tempo, Interval, Race, Trail, Treadmill, Other
- distance
- duration
- pace otomatis
- speed otomatis
- average heart rate
- max heart rate
- cadence
- stride length
- elevation gain/loss
- running power
- calories
- RPE
- surface
- sepatu
- suhu/cuaca opsional
- splits/laps
- notes

Format split:
`lap | pace | HR | cadence | elevation`

Contoh:
`1 | 05:45 | 148 | 168 | 4`

Dashboard menghitung:
- weekly mileage + target mingguan
- running time
- active-week streak
- sRPE training load (durasi × RPE)
- 8-week mileage trend
- recent pace trend
- HR zone distribution berbasis Heart Rate Reserve
- average cadence 28 hari
- elevation gain 28 hari
- fastest recorded average pace
- longest run
- most elevation
- highest recorded average HR

Running Settings menyimpan Max HR, Resting HR, dan weekly distance goal.

Setiap Run otomatis membuat atau memperbarui **Health Activity** yang terhubung ke sesi tersebut dan menghasilkan XP. Run juga terintegrasi dengan Search, Health summary, Trash, Undo, Version History, dan cloud state.


## Streamlined UI v16

Desca OS dirapikan untuk mengurangi feature bloat tanpa menghapus data historis.

Perubahan utama:
- Presensi Harian dihapus dari UI, XP, Daily Score, Analytics, dan Weekly Review. Data presensi lama tetap dipertahankan untuk backward compatibility.
- Daily Score sekarang memakai task completion + productive time. Jika tidak ada task pada hari tersebut, score memakai productive-time progress.
- Achievements tidak lagi menjadi halaman tersendiri; milestone digabung ke Progress.
- Progress dipindahkan ke Insights, sedangkan Life Log dipindahkan ke Life.
- Today tidak lagi menampilkan daftar Today Tasks lengkap karena sudah ada Top Priorities dan halaman Tasks.
- Quick Note disembunyikan dari default Today tetapi masih dapat diaktifkan melalui Customize.
- Life Log tidak lagi menduplikasi Actual Timeline; Planned vs Actual tetap berada di Today → Daily Timeline.
- Analytics menghapus Weekly Productive Time dan 30-Day Distribution yang tumpang tindih dengan grafik utama.
- Weekly Review memakai Active Days alih-alih presensi.
- Health menjadi ringkasan kesehatan umum; detail lari tetap berada di Running.
- Automatic XP card di Settings dihapus dan diganti penjelasan singkat di Data & Privacy.
