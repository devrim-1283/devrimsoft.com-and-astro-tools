# DevrimSoft

Corporate website and developer tools for DevrimSoft. Static sites built with Astro 5, deployed on Cloudflare Workers.

**Live:** [devrimsoft.com](https://devrimsoft.com)

---

## Projects

This repository contains two independent Astro applications.

### 1. Corporate Website (`/`) — [devrimsoft.com](https://devrimsoft.com)

Company presentation site including services, portfolio, blog, and contact pages.

- **Tech:** Astro 5, TailwindCSS 3, TypeScript
- **i18n:** 7 languages (Turkish, English, Russian, Ukrainian, German, Spanish, French)
- **Content:** Astro Content Collections (blog, portfolio, announcements)
- **SEO:** Sitemap, hreflang, Open Graph, localized URL slugs

### 2. CryptForge — Developer Security Toolkit (`/random-password-generator/`) — [randompassword.devrimsoft.com](https://randompassword.devrimsoft.com)

Fully client-side developer security toolkit. No data is sent to any server — all operations run in the browser using the Web Crypto API.

- **Tech:** Astro 5, TypeScript, Web Crypto API
- **i18n:** 6 languages (Turkish, English, Russian, Ukrainian, German, Spanish)

**Tools:**

| Tool | Description |
|------|-------------|
| Password Generator | Configurable length, character sets, custom symbols |
| Strength Checker | Entropy analysis, estimated crack time, 0-4 score |
| JWT Generator | HS256/384/512, custom claims, expiry configuration |
| Hash Generator | MD5, SHA-1, SHA-256, SHA-512 hashing |
| Token Generator | UUID v4, CSRF token, API key, Hex/Base64 generation |

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) >= 1.0

### Corporate Site

```bash
bun install
bun run dev       # http://localhost:4321
bun run build     # Static output to dist/
bun run preview   # Preview production build
```

### CryptForge

```bash
cd random-password-generator
bun install
bun run dev
bun run build
```

---

## Project Structure

```
devrimsoft.com/
├── src/
│   ├── pages/                # Route pages (separate directory per locale)
│   │   ├── tr/               # Turkish pages (default locale)
│   │   ├── en/               # English pages
│   │   ├── ru/ de/ es/ fr/ uk/
│   │   └── 404.astro
│   ├── components/           # UI components
│   │   ├── home/             # Homepage sections
│   │   ├── about/            # About page
│   │   ├── contact/          # Contact page
│   │   ├── portfolio/        # Portfolio page
│   │   ├── layout/           # Header, Footer, LanguagePicker
│   │   └── shared/           # Breadcrumb, ScrollReveal
│   ├── content/              # Astro Content Collections
│   │   ├── blog/             # Blog posts (Markdown)
│   │   ├── portfolio/        # Portfolio items
│   │   └── announcements/    # Announcements
│   ├── i18n/                 # Internationalization
│   │   ├── locales.ts        # Locale definitions, ROUTE_MAP, SERVICE_SLUGS
│   │   ├── ui.ts             # Translation strings
│   │   └── utils.ts          # getLangFromUrl(), useTranslations()
│   ├── layouts/              # Page templates
│   └── styles/               # Global CSS
│
├── random-password-generator/
│   └── src/
│       ├── pages/index.astro         # Single-page app (full UI)
│       ├── utils/crypto.ts           # Cryptography functions
│       ├── i18n/translations.ts      # Translation file
│       └── layouts/Layout.astro      # Theme and font management
│
├── astro.config.mjs          # Main site Astro configuration
├── tailwind.config.mjs       # TailwindCSS configuration
└── package.json
```

---

## Deployment

Both projects are statically served on **Cloudflare Workers**. Build output is generated in `dist/`.

---

## Author

**Devrim Tuncer** — [devrim@devrimsoft.com.tr](mailto:devrim@devrimsoft.com.tr) · [LinkedIn](https://www.linkedin.com/in/devrim-tun%C3%A7er-218a55320/)

**DevrimSoft** — [info@devrimsoft.com.tr](mailto:info@devrimsoft.com.tr)

---

## License

Copyright (c) 2024-present DevrimSoft. All rights reserved.

See [LICENSE](./LICENSE) for details.

---

<details>
<summary>🇹🇷 Türkçe</summary>

# DevrimSoft

DevrimSoft kurumsal web sitesi ve geliştirici araçları. Astro 5 ile oluşturulmuş statik siteler, Cloudflare Workers üzerinde deploy edilir.

**Canlı:** [devrimsoft.com](https://devrimsoft.com)

---

## Projeler

Bu repo iki bağımsız Astro uygulaması içerir.

### 1. Kurumsal Web Sitesi (`/`) — [devrimsoft.com](https://devrimsoft.com)

Hizmetler, portföy, blog ve iletişim sayfalarını içeren şirket tanıtım sitesi.

- **Teknoloji:** Astro 5, TailwindCSS 3, TypeScript
- **i18n:** 7 dil desteği (Türkçe, İngilizce, Rusça, Ukraynaca, Almanca, İspanyolca, Fransızca)
- **İçerik:** Astro Content Collections (blog, portföy, duyurular)
- **SEO:** Sitemap, hreflang, Open Graph, lokalize URL slug'ları

### 2. CryptForge — Geliştirici Güvenlik Araç Seti (`/random-password-generator/`) — [randompassword.devrimsoft.com](https://randompassword.devrimsoft.com)

Tamamen istemci tarafında çalışan geliştirici güvenlik araç seti. Sunucuya hiçbir veri gönderilmez, tüm işlemler tarayıcıda Web Crypto API ile yapılır.

- **Teknoloji:** Astro 5, TypeScript, Web Crypto API
- **i18n:** 6 dil desteği (Türkçe, İngilizce, Rusça, Ukraynaca, Almanca, İspanyolca)

**Araçlar:**

| Araç | Açıklama |
|------|----------|
| Password Generator | Uzunluk, karakter seti, özel semboller ile şifre üretimi |
| Strength Checker | Entropi analizi, tahmini kırma süresi, 0-4 skor |
| JWT Generator | HS256/384/512, özel claim'ler, expiry yapılandırması |
| Hash Generator | MD5, SHA-1, SHA-256, SHA-512 hash hesaplama |
| Token Generator | UUID v4, CSRF token, API key, Hex/Base64 üretimi |

---

## Başlangıç

### Gereksinimler

- [Bun](https://bun.sh) >= 1.0

### Kurumsal Site

```bash
bun install
bun run dev       # http://localhost:4321
bun run build     # Statik çıktı dist/ klasörüne
bun run preview   # Build önizleme
```

### CryptForge

```bash
cd random-password-generator
bun install
bun run dev
bun run build
```

---

## Proje Yapısı

```
devrimsoft.com/
├── src/
│   ├── pages/                # Sayfa dosyaları (her dil için ayrı klasör)
│   │   ├── tr/               # Türkçe sayfalar (varsayılan dil)
│   │   ├── en/               # İngilizce sayfalar
│   │   ├── ru/ de/ es/ fr/ uk/
│   │   └── 404.astro
│   ├── components/           # UI bileşenleri
│   │   ├── home/             # Ana sayfa seksiyonları
│   │   ├── about/            # Hakkımızda
│   │   ├── contact/          # İletişim
│   │   ├── portfolio/        # Portföy
│   │   ├── layout/           # Header, Footer, LanguagePicker
│   │   └── shared/           # Breadcrumb, ScrollReveal
│   ├── content/              # Astro Content Collections
│   │   ├── blog/             # Blog yazıları (Markdown)
│   │   ├── portfolio/        # Portföy öğeleri
│   │   └── announcements/    # Duyurular
│   ├── i18n/                 # Çoklu dil sistemi
│   │   ├── locales.ts        # Dil tanımları, ROUTE_MAP, SERVICE_SLUGS
│   │   ├── ui.ts             # Çeviri stringleri
│   │   └── utils.ts          # getLangFromUrl(), useTranslations()
│   ├── layouts/              # Sayfa şablonları
│   └── styles/               # Global CSS
│
├── random-password-generator/
│   └── src/
│       ├── pages/index.astro         # Tek sayfa uygulama (tüm UI)
│       ├── utils/crypto.ts           # Kriptografi fonksiyonları
│       ├── i18n/translations.ts      # Çeviri dosyası
│       └── layouts/Layout.astro      # Tema ve font yönetimi
│
├── astro.config.mjs          # Ana site Astro yapılandırması
├── tailwind.config.mjs       # TailwindCSS yapılandırması
└── package.json
```

---

## Deploy

Her iki proje de **Cloudflare Workers** üzerinde statik olarak sunulur. Build çıktısı `dist/` klasörüne oluşturulur.

---

## Geliştirici

**Devrim Tuncer** — [devrim@devrimsoft.com.tr](mailto:devrim@devrimsoft.com.tr) · [LinkedIn](https://www.linkedin.com/in/devrim-tun%C3%A7er-218a55320/)

**DevrimSoft** — [info@devrimsoft.com.tr](mailto:info@devrimsoft.com.tr)

---

## Lisans

Copyright (c) 2024-present DevrimSoft. Tüm hakları saklıdır.

Detaylar için [LICENSE](./LICENSE) dosyasına bakınız.

</details>
