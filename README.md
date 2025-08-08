# Платформа для просмотра PDF-отчётов

Минималистичная платформа для хранения, сортировки и просмотра PDF-файлов по дате и папкам.

---

## Стек технологий

- **Frontend**: React, TypeScript, TailwindCSS, Shadcn/UI
- **Backend**: NestJS, TypeScript
- **База данных**: PostgreSQL
- **Прочее**: Multer (для загрузки файлов), TypeORM (ORM), React-PDF (просмотр PDF)

---

## Структура проекта

pdf-folder-viewer/
├── backend/ # Серверная часть (NestJS)
│ ├── uploads/
│ ├── dist/
│ ├── package.json
│ └── ...
├── src/ # Клиентская часть (React)
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── type
│ └── components
│ └── context
│ └── page
└── README.md

---

## 🚀 Быстрый старт

### 1. Клонирование проекта

```bash
git clone https://github.com/amina5789/O-test

npm run dev
docker-compose up --build
🔗 Открой в браузере: http://localhost:3001

🔧 Основной функционал
📁 Группировка файлов по дате или по папкам

📄 Просмотр PDF-файлов через react-pdf

☁️ Загрузка PDF в выбранную папку

➕ Создание новых папок

🗑 Удаление файлов

🛠️ Полезные команды
Backend
bash
Копировать
Редактировать
npm run start:dev        # Запуск сервера
npm run migration:run    # Применение миграций
npm run build            # Сборка проекта
Frontend
bash
Копировать
Редактировать
npm start               # Запуск в dev-режиме
npm run build            # Сборка проекта



Лицензия
MIT — свободно использовать, копировать и модифицировать.

 Автор
Твой GitHub:https://github.com/amina5789
