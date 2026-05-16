// SPDX-FileCopyrightText: AnmiTaliDev <anmitalidev@nuros.org>
import { useState, useEffect, useCallback, useRef } from 'react'
import Editor from './components/Editor'
import Preview from './components/Preview'
import StatusBar from './components/StatusBar'
import './App.css'

const DEFAULT_TEXT = `# Добро пожаловать в Markdown Editor

Начните вводить текст слева — предпросмотр обновляется мгновенно.

## Возможности

- Живой предпросмотр Markdown
- Открытие и сохранение файлов через меню **Файл**
- Переключение тёмной/светлой темы

## Горячие клавиши

| Действие       | Клавиши         |
|----------------|-----------------|
| Открыть файл   | Ctrl + O        |
| Сохранить      | Ctrl + S        |
| Сохранить как  | Ctrl + Shift + S |

\`\`\`js
console.log('Hello, Markdown!')
\`\`\`
`

export default function App() {
  const [text, setText] = useState(DEFAULT_TEXT)
  const [isDark, setIsDark] = useState(false)
  const [currentPath, setCurrentPath] = useState(null)

  const textRef = useRef(text)
  const currentPathRef = useRef(currentPath)

  useEffect(() => { textRef.current = text }, [text])
  useEffect(() => { currentPathRef.current = currentPath }, [currentPath])

  const saveToPath = useCallback(async (content, filePath) => {
    if (!window.api) return
    const result = await window.api.saveFile(content, filePath)
    if (result.success) setCurrentPath(result.filePath)
  }, [])

  const saveAs = useCallback(async (content) => {
    if (!window.api) return
    const result = await window.api.saveFileAs(content)
    if (result.success) setCurrentPath(result.filePath)
  }, [])

  useEffect(() => {
    if (!window.api) return

    window.api.onFileOpened(({ content, filePath }) => {
      setText(content)
      setCurrentPath(filePath)
    })

    window.api.onSaveRequested((mode) => {
      if (mode === 'save' && currentPathRef.current) {
        saveToPath(textRef.current, currentPathRef.current)
      } else {
        saveAs(textRef.current)
      }
    })

    window.api.onToggleTheme(() => {
      setIsDark((prev) => !prev)
    })

    return () => {
      window.api.removeAllListeners('file-opened')
      window.api.removeAllListeners('save-requested')
      window.api.removeAllListeners('toggle-theme')
    }
  }, [saveToPath, saveAs])

  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      <div className="toolbar">
        <span className="app-title">Markdown Editor</span>
        <button
          className="theme-toggle"
          onClick={() => setIsDark((prev) => !prev)}
        >
          {isDark ? 'Светлая тема' : 'Тёмная тема'}
        </button>
      </div>
      <div className="workspace">
        <Editor value={text} onChange={setText} />
        <Preview text={text} />
      </div>
      <StatusBar text={text} filePath={currentPath} />
    </div>
  )
}
