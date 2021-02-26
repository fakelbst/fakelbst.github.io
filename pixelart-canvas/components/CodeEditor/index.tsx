import React, { useState, useEffect } from 'react'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/keymap/vim'

function CodeEditor(props: { data: string }) {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(props.data)
  }, [])

  return (
    <CodeMirror
      value={value}
      className="editor"
      options={{
        theme: 'material',
        lineWrapping: true,
        keyMap: 'vim',
        lineSeparator: '/n',
      }}
    />
  )
}

export default CodeEditor
