// SPDX-FileCopyrightText: AnmiTaliDev <anmitalidev@nuros.org>
import { useState, useEffect } from 'react'
import { marked } from 'marked'
import './Preview.css'

export default function Preview({ text }) {
  const [html, setHtml] = useState(() => marked.parse(text))

  useEffect(() => {
    setHtml(marked.parse(text))
  }, [text])

  return (
    <div className="preview-pane">
      <div className="pane-header">Предпросмотр</div>
      <div
        className="preview-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
