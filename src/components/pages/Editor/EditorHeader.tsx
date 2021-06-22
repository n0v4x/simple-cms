import classNames from 'classnames';
import React from 'react'
import { useEditor, useEditorState } from './Editor'

interface EditorHeaderProps {

}

const EditorHeader = (props: EditorHeaderProps) => {
  const editor = useEditor();
  const editorState = useEditorState();

  return (
    <div className="editor__header">
      <div className="editor__header-left"></div>

      <div className="editor__header-center">
        <div className="label-switch">
          <span onClick={() => editor.changeViewMode("editor")} className={classNames("label-switch__label", { "is-active": editorState.viewMode === "editor" })}>
            Editor
    </span>
          <span className="label-switch__label-separator">
            /
    </span>
          <span onClick={() => editor.changeViewMode("preview")} className={classNames("label-switch__label", { "is-active": editorState.viewMode === "preview" })}>
            View
    </span>
        </div>
      </div>

      <div className="editor__header-right"></div>
    </div>
  )
}

export default EditorHeader
