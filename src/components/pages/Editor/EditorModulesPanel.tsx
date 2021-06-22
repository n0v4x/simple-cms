import React, { useMemo } from 'react'
import Panel, { PanelBody, PanelHeader } from "@components/common/Panel"
import { useEditor, useEditorState } from './Editor'
import Icon from '@components/common/Icon';
import ModuleHierarchy from '@components/layout/ModuleHierarchy';

interface Props {

}

const EditorModulesPanel = (props: Props) => {
  const editor = useEditor();
  const editorState = useEditorState();

  const moduleHierarchyItems = useMemo(() => {
    return editorState.selectedPage?.modules || []
  }, [editorState.selectedPage]);

  const handleAddRootModule = () => {
    editor.selectModule(null);
    editor.openModuleLibraryModal();
  }

  return <Panel>
    <PanelHeader>
      <span className="title">Modules</span>
      <span className="separator separator--row" />
      <button onClick={handleAddRootModule} className="button button--type-circle">
        <Icon name="plus" />
      </button>
    </PanelHeader>
    <PanelBody>
      <ModuleHierarchy
        onSelect={editor.selectModule}
        onAdd={editor.openModuleLibraryModal}
        onDelete={editor.deleteModule}
        selected={editorState.selectedModuleId}
        className="editor__hierarchy"
        items={moduleHierarchyItems}
      />
    </PanelBody>
    {/* <div className="editor__hierarchy-controls">
  <button onClick={() => {
    handleAction({ type: "add", payload: { id: 0 } })
  }} className="editor__hierarchy-controls-add-button button button--block button--solid">Add</button>
</div> */}
  </Panel>
}

export default EditorModulesPanel
