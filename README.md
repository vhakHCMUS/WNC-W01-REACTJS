# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

# Tic-Tac-Toe Game

A fully functional Tic-Tac-Toe game built with **React**, **TypeScript**, and **Vite**.

## Features

✅ **Current move display** - Shows "You are at move #X" instead of a button
✅ **Loop-based board rendering** - Uses two nested loops to generate board squares
✅ **Sort moves** - Toggle button to sort move history in ascending or descending order
✅ **Win highlight** - Winning three squares are highlighted in green
✅ **Draw detection** - Displays "It's a draw!" message when board fills without a winner
✅ **Move location** - Shows move coordinates in (row, col) format in history

## Quick Start

### Install Dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:5174](http://localhost:5174) to play.

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions on deploying to:
- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**

## Project Structure

```
src/
├── App.tsx        # Main game component
├── App.css        # Game styling
├── main.tsx       # React entry point
└── index.css      # Global styles
```

## Game Rules

- Players alternate between X and O
- Click any empty square to place your mark
- First to get three in a row wins
- If the board fills without a winner, it's a draw
- Click any past move to jump to that game state

## Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite 7** - Build tool
- **ESLint** - Code linting

Enjoy the game!

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
