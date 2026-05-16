// SPDX-FileCopyrightText: AnmiTaliDev <anmitalidev@nuros.org>
import './Editor.css'

export default function Editor({ value, onChange }) {
  return (
    <div className="editor-pane">
      <div className="pane-header">Редактор</div>
      <textarea
        className="editor-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        placeholder="Введите Markdown-текст..."
      />
    </div>
  )
}
