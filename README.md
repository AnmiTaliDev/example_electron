# Markdown Editor

> **Note:** This project is not a personal Electron application. It was generated with an LLM as a sample codebase for further experiments with web technologies.

A desktop Markdown editor with live preview, built with Electron, React, and Vite.

## Keyboard Shortcuts

| Action        | Windows / Linux    | macOS            |
|---------------|--------------------|------------------|
| Open file     | `Ctrl + O`         | `Cmd + O`        |
| Save          | `Ctrl + S`         | `Cmd + S`        |
| Save as       | `Ctrl + Shift + S` | `Cmd + Shift + S`|

## Tech Stack

- [Electron](https://www.electronjs.org/) — desktop application shell
- [React](https://react.dev/) — UI components
- [Vite](https://vitejs.dev/) — bundler and dev server
- [marked](https://marked.js.org/) — Markdown parsing and rendering
- [electron-builder](https://www.electron.build/) — distribution packaging

## Installation and Running

**Requirements:** Node.js 18+ and npm.

```bash
# install dependencies
npm install

# run in development mode
npm run dev
```

`concurrently` starts Vite on `localhost:5173`, then `wait-on` waits for the server to be ready and launches Electron.

## Building a Distribution

```bash
npm run build
```

The built package will be in the `dist-electron/` directory:

- Linux — `.AppImage`
- Windows — `.exe` (NSIS installer)
- macOS — `.dmg`

## License

Copyright (C) 2026 AnmiTaliDev \<anmitalidev@nuros.org\>

This project is licensed under the
[GNU Affero General Public License v3.0 or later](https://www.gnu.org/licenses/agpl-3.0.html).

You are free to use, study, modify, and distribute this software, provided that
derivative works are distributed under the same terms. If you run a modified
version as a network service, you must make the source code available to users
of that service.

The full license text is in the `LICENSE` file at the root of the repository.
