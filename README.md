# Bmwexpert Landing

Готовый одностраничный лендинг автосервиса Bmwexpert в Ногинске: React 18 + Vite + TypeScript на фронтенде и PHP 8.2+ API для обработки заявок.

## Что внутри

- SEO-структура для локальных запросов: title, description, Open Graph, canonical, robots.txt, sitemap.xml, JSON-LD AutoRepair.
- Адаптивный лендинг в концепции «сервисная карта автомобиля».
- Форма заявки с двумя обязательными согласиями, honeypot, CSRF и клиентской валидацией.
- PHP endpoint `/api/lead.php` с server-side validation, rate-limit, Origin/Referer check и записью в `/storage/leads.jsonl`.
- Опциональные уведомления на email, Telegram и будущий webhook amoCRM через `api/config.php`.
- Юридические страницы в `/legal/` с явно отмеченными placeholders.

## Локальная разработка

```bash
npm install
npm run dev
```

Сайт откроется на адресе, который покажет Vite. В dev-режиме PHP API не исполняется самим Vite. Для проверки PHP используйте обычный PHP-сервер или загрузку на хостинг.

## Сборка frontend

```bash
npm run build
```

Готовая статика появится в `dist/`. На PHP-хостинг нужно загрузить содержимое `dist/`, а также папки `api/` и `storage/` из корня проекта.

## Настройка PHP API

1. Скопируйте `api/config.example.php` в `api/config.php`.
2. Замените домен в `site_url` и `allowed_origins`.
3. Если нужны email-уведомления, включите `email.enabled` и заполните `to`, `from`, `subject`.
4. Если нужен Telegram, создайте бота, получите `bot_token`, `chat_id` и включите `telegram.enabled`.
5. Для будущей интеграции с amoCRM или другим CRM-сервисом заполните `integrations.amo_webhook_url`.

Реальные токены, email и webhook должны храниться только в `api/config.php`. Не добавляйте секреты в `config.example.php`.

## Хранение заявок

По умолчанию заявки пишутся в:

```text
storage/leads.jsonl
```

Каждая строка файла — отдельная JSON-заявка. Доступ к `/storage` закрыт через `storage/.htaccess` и корневой `.htaccess`.

## Юридические документы

Файлы находятся в `public/legal/` и после сборки будут доступны как `/legal/...`.

Перед публикацией замените placeholders:

- `[Полное наименование оператора]`
- `[ИНН]`
- `[ОГРН/ОГРНИП]`
- `[Юридический адрес]`
- `[Email для обращений по персональным данным]`
- `[Телефон]`
- `[Домен сайта]`
- `[Дата публикации документа]`

## Как поменять данные бизнеса

Основные данные лежат в:

```text
src/data/business.ts
src/data/services.ts
src/data/faq.ts
```

Там можно изменить телефон, адрес, график, цены, список услуг, марки автомобилей и FAQ. После изменений снова выполните `npm run build`.

Дополнительно замените домен в:

```text
index.html
robots.txt
sitemap.xml
api/config.example.php
```

Если точные координаты известны, замените placeholders `latitude` и `longitude` в JSON-LD внутри `index.html`.

## Загрузка на PHP-хостинг

1. Выполните `npm run build`.
2. Загрузите содержимое `dist/` в корень сайта.
3. Загрузите папки `api/` и `storage/` в тот же корень.
4. Убедитесь, что в корне сайта есть `.htaccess`. Файл также копируется в `dist/` из `public/.htaccess`.
5. Создайте `api/config.php` на основе `api/config.example.php`.
6. Проверьте права на запись для папки `storage/`.
7. Откройте сайт, получите CSRF через `/api/csrf.php` и отправьте тестовую заявку через форму.

## Проверки

```bash
npm test
npm run build
php -l api/csrf.php
php -l api/lead.php
php -l api/helpers.php
```

Для визуальной проверки используйте Vite preview:

```bash
npm run preview
```

Проверьте мобильную ширину около 375px, якоря меню, кликабельный телефон, ссылку маршрута в Яндекс Карты и отправку формы с неотмеченными согласиями.
