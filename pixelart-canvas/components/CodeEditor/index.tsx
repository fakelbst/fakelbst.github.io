import React, { useState, useEffect } from 'react'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/keymap/vim'

function CodeEditor(props: { data: string, editCode: (arg0: string) => void }){
  const [initValue, setInitValue] = useState('')

  useEffect(() => {
    setInitValue(props.data)
  }, [])

  return (
    <CodeMirror
      value={initValue}
      className="editor"
      options={{
        theme: 'material',
        lineWrapping: true,
        keyMap: 'vim',
        lineSeparator: '/n',
      }}
      onChange={(editor, data, value) => {
        props.editCode(value)
      }}
    />
  )
}

export default CodeEditor
