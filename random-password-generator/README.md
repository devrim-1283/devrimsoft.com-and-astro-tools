# CryptForge — Developer Security Toolkit

Fully client-side developer security toolkit. No data is sent to any server — all cryptographic operations run in the browser using the Web Crypto API.

**Live:** [randompassword.devrimsoft.com](https://randompassword.devrimsoft.com)

---

## Tools

| Tool | Description |
|------|-------------|
| Password Generator | Configurable length (4-250), character sets, custom symbols, exclude ambiguous characters |
| Strength Checker | Entropy analysis (bits), charset size, estimated crack time, 0-4 score |
| JWT Generator | HS256/384/512, custom header/payload, expiry configuration |
| Hash Generator | MD5, SHA-1, SHA-256, SHA-512 real-time hashing |
| Token Generator | UUID v4, CSRF token, API key (sk_ prefix), Hex/Base64 token, secret key generation |

---

## Tech Stack

- **Framework:** Astro 5 (static output)
- **Language:** TypeScript
- **Crypto:** Web Crypto API (`crypto.getRandomValues()`, `crypto.subtle`)
- **i18n:** 6 languages (Turkish, English, Russian, Ukrainian, German, Spanish)
- **Theme:** Dark / Light mode support

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) >= 1.0

### Development

```bash
bun install
bun run dev
bun run build
bun run preview
```

---

## Project Structure

```
random-password-generator/
├── src/
│   ├── pages/index.astro         # Single-page app (full UI)
│   ├── utils/crypto.ts           # Core cryptography functions
│   ├── i18n/translations.ts      # Multi-language translations
│   └── layouts/Layout.astro      # Theme and font management
├── public/                       # Static assets
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

---

## Security

- Zero backend — nothing leaves the browser
- Uses `crypto.getRandomValues()` for cryptographically secure randomness
- Fisher-Yates shuffle for unbiased password generation
- HMAC-SHA for JWT signing
- No external crypto dependencies

---

## Author

**Devrim Tuncer** — [devrim@devrimsoft.com.tr](mailto:devrim@devrimsoft.com.tr) · [LinkedIn](https://www.linkedin.com/in/devrim-tun%C3%A7er-218a55320/)

**DevrimSoft** — [info@devrimsoft.com.tr](mailto:info@devrimsoft.com.tr)

---

## License

Copyright (c) 2024-present DevrimSoft. All rights reserved.

See [LICENSE](../LICENSE) for details.

---

<details>
<summary>🇹🇷 Türkçe</summary>

# CryptForge — Geliştirici Güvenlik Araç Seti

Tamamen istemci tarafında çalışan geliştirici güvenlik araç seti. Sunucuya hiçbir veri gönderilmez, tüm kriptografik işlemler tarayıcıda Web Crypto API ile yapılır.

**Canlı:** [randompassword.devrimsoft.com](https://randompassword.devrimsoft.com)

---

## Araçlar

| Araç | Açıklama |
|------|----------|
| Password Generator | Uzunluk (4-250), karakter seti, özel semboller, belirsiz karakter hariç tutma |
| Strength Checker | Entropi analizi (bit), karakter seti boyutu, tahmini kırma süresi, 0-4 skor |
| JWT Generator | HS256/384/512, özel header/payload, expiry yapılandırması |
| Hash Generator | MD5, SHA-1, SHA-256, SHA-512 gerçek zamanlı hash hesaplama |
| Token Generator | UUID v4, CSRF token, API key (sk_ prefix), Hex/Base64 token, secret key üretimi |

---

## Teknoloji

- **Framework:** Astro 5 (statik çıktı)
- **Dil:** TypeScript
- **Kripto:** Web Crypto API (`crypto.getRandomValues()`, `crypto.subtle`)
- **i18n:** 6 dil (Türkçe, İngilizce, Rusça, Ukraynaca, Almanca, İspanyolca)
- **Tema:** Koyu / Açık mod desteği

---

## Başlangıç

### Gereksinimler

- [Bun](https://bun.sh) >= 1.0

### Geliştirme

```bash
bun install
bun run dev
bun run build
bun run preview
```

---

## Güvenlik

- Sıfır backend — hiçbir veri tarayıcıdan çıkmaz
- Kriptografik güvenli rastgelelik için `crypto.getRandomValues()` kullanır
- Tarafsız şifre üretimi için Fisher-Yates karıştırma algoritması
- JWT imzalama için HMAC-SHA
- Harici kripto bağımlılığı yok

---

## Geliştirici

**Devrim Tuncer** — [devrim@devrimsoft.com.tr](mailto:devrim@devrimsoft.com.tr) · [LinkedIn](https://www.linkedin.com/in/devrim-tun%C3%A7er-218a55320/)

**DevrimSoft** — [info@devrimsoft.com.tr](mailto:info@devrimsoft.com.tr)

---

## Lisans

Copyright (c) 2024-present DevrimSoft. Tüm hakları saklıdır.

Detaylar için [LICENSE](../LICENSE) dosyasına bakınız.

</details>
