# Gromuse UI/UX Only Export

Folder ini adalah versi **UI-only** dari Gromuse: semua page dan komponen visual dipertahankan, tapi dependency logic seperti Riverpod/Auth backend sudah dilepas.

## Page yang tersedia (semua UI page)

1. `OnboardingPage`
2. `LoginPage`
3. `RegisterPage`
4. `HomePage`
5. `CategoryPage`
6. `FavoritePage`
7. `DeliveryPage`
8. `LayoutPage` (bottom nav)
9. `LoadingPage`

## Struktur penting

- `lib/app.dart` (bootstrap app + routes)
- `lib/main.dart` (entrypoint sederhana)
- `lib/config/theme/` (theme, color, typography)
- `lib/config/router/ui_routes.dart` (route constants)
- `lib/common/widgets/` (shared UI widgets)
- `lib/features/**/presentation/` (semua page dan widget presentasi)
- `assets/fonts/`, `assets/images/`

## Dependency minimum

```yaml
dependencies:
  flutter:
    sdk: flutter
  flutter_screenutil: ^5.9.0
  collection: ^1.18.0
  phosphor_flutter: ^2.0.1
```

## Cara pakai di project lain

1. Copy folder `lib/` dan `assets/` dari `ui_export_ui_only` ke project tujuan.
2. Ganti semua import `package:gromuse/...` menjadi package project kamu (contoh `package:my_app/...`).
3. Tambahkan assets & fonts ke `pubspec.yaml` project kamu.
4. Pakai `lib/main.dart` dari paket ini sebagai referensi entrypoint.

## Catatan UX

- Navigasi antar halaman menggunakan `Navigator.pushNamed` dan `pushReplacementNamed`.
- Tombol `Login/Register` sekarang mengarah ke halaman utama (`/main`) untuk demo UI flow.
- Tidak ada koneksi ke auth API, storage, atau state management agar tetap murni UI/UX.
