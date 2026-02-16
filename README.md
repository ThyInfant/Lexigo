# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Implemented core game functionality and improvements:

- Activated keyboard input: clicking on keys now types letters into the grid.
- Physical keyboard support: player can type using PC keyboard.
- Enter / Backspace handling: guesses can be submitted or deleted.
- Correct guess detection: game ends when player wins or loses.
- Color feedback for letters:
  - Green for correct letter in correct position
  - Yellow for correct letter in wrong position
  - Gray for letters not in the word
- Play Again functionality:
  - Modal popup appears when game ends (win/loss)
  - Clicking "Play Again" resets the game state
- Game state management improved:
  - Lazy initialization of solution word
  - Attempts, current guess, and guesses array properly tracked
  - Keyboard key statuses updated according to guesses
- Error handling for invalid words planned (temporary local word list currently used)
- Code structured for future enhancements:
  - API word fetching
  - Daily challenge mode
  - Light / Dark mode (UI toggle planned)
