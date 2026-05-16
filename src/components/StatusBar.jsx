// SPDX-FileCopyrightText: AnmiTaliDev <anmitalidev@nuros.org>
import './StatusBar.css'

export default function StatusBar({ text, filePath }) {
  const charCount = text.length
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const fileName = filePath ? filePath.split(/[\\/]/).pop() : 'Новый документ'

  return (
    <div className="status-bar">
      <span className="status-file">{fileName}</span>
      <div className="status-stats">
        <span>Слов: {wordCount}</span>
        <span>Символов: {charCount}</span>
      </div>
    </div>
  )
}
