# Propheten-Geschichten / Prophet Stories

An educational web application showcasing the lives and teachings of 25 prophets in Islam, presented in multiple languages with a modern, accessible interface.

## Features

- **25 Prophet Stories**: Complete narratives of prophets from Adam to Muhammad ﷺ, chronologically ordered
- **Multi-language Support**: Currently available in German and English using i18next
- **Chapter-based Stories**: Each prophet's story is divided into chapters for easier reading
- **Interactive Navigation**:
  - Sidebar navigation showing all chapters
  - Automatic chapter highlighting while scrolling
  - Smooth scroll-to-chapter functionality
- **Responsive Design**: Fully responsive layout with mobile-first approach
- **Dark Mode**: Built-in dark/light theme switching
- **Search Functionality**: Quick search to find specific prophets
- **Beautiful UI**: Modern design using Tailwind CSS and shadcn/ui components

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **TanStack Router** - Type-safe routing
- **i18next** - Internationalization
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality component library
- **Framer Motion** - Smooth animations

## Project Structure

```
src/
├── components/          # React components
│   ├── ProphetDetail.tsx    # Individual prophet detail view
│   ├── Home.tsx             # Homepage with prophet list
│   └── ui/                  # Reusable UI components
├── data/
│   └── prophets.ts          # Prophet data array
├── languages/
│   ├── de.json              # German translations
│   └── en.json              # English translations
├── routes/                  # TanStack Router routes
├── types/
│   └── prophet.ts           # TypeScript interfaces
└── lib/                     # Utility functions
```

## Prophets Included

1. Adam (آدم)
2. Idris (إدريس)
3. Nuh (نوح)
4. Hud (هود)
5. Salih (صالح)
6. Ibrahim (إبراهيم)
7. Lut (لوط)
8. Ismail (إسماعيل)
9. Ishaq (إسحاق)
10. Yaqub (يعقوب)
11. Yusuf (يوسف)
12. Shuayb (شعيب)
13. Ayyub (أيوب)
14. Dhul-Kifl (ذو الكفل)
15. Musa (موسى)
16. Harun (هارون)
17. Dawud (داوود)
18. Sulayman (سليمان)
19. Ilyas (إلياس)
20. Al-Yasa (اليسع)
21. Yunus (يونس)
22. Zakariya (زكريا)
23. Yahya (يحيى)
24. Isa (عيسى)
25. Muhammad ﷺ (محمد)

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## Features in Detail

### Chapter Navigation

Each prophet's story can be divided into multiple chapters. When viewing a prophet with multiple chapters:

- A sidebar appears on the right showing all chapter titles
- The active chapter is highlighted as you scroll
- Click any chapter title to smoothly scroll to that section
- The sidebar is vertically centered and sticky

### Internationalization

The application uses i18next for translations. All content including prophet names, stories, lessons, and UI elements are translatable. Add new languages by creating a JSON file in `src/languages/`.

### Responsive Design

- Mobile: Single column layout, sidebar hidden
- Desktop (lg+): Content centered with sidebar on the right
- Smooth transitions and animations throughout

## License

© 2025 ryqo. All rights reserved.

## Disclaimer

This is an educational resource. Please consult authentic Islamic sources for religious guidance.
