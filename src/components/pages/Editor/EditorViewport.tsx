import ScaleRange from '@components/common/ScaleRange';
import ModuleViewport from '@components/layout/ModuleViewport'
import React, { useState } from 'react'
import { useEditor, useEditorState } from './Editor'

interface EditorViewportProps {

}

const EditorViewport = (props: EditorViewportProps) => {
  const editor = useEditor();
  const editorState = useEditorState();
  const [scale, setScale] = useState(1);

  return (
    <div className="editor__viewport">
      <div className="editor__viewport-modules">
        <div style={{ transform: `scale(${scale})` }} className="editor__viewport-modules-scaler">
          <ModuleViewport
            isEditorMode={editorState.viewMode === "editor"}
            onSelect={editor.selectModule}
            selected={editorState.selectedModuleId}
            showModulesBoundaries={editorState.viewMode === "editor"}
            items={editorState.selectedPage?.modules || []}
          />
        </div>
      </div>
      <div className="editor__viewport-footer">
        <ScaleRange value={scale} onChange={(scale) => setScale(scale)} />
      </div>
    </div>
  )
}

export default EditorViewport
