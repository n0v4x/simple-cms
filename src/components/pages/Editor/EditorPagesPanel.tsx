import React, { useMemo } from 'react'
import Panel, { PanelBody, PanelFooter, PanelHeader } from "@components/common/Panel";
import Icon from '@components/common/Icon';
import Menu from '@components/common/Menu';
import { useEditor, useEditorState } from './Editor';

interface EditorPagesPanelProps {

}

const popupMenuItems = [{ id: "delete", label: "Delete" }];

const EditorPagesPanel = (props: EditorPagesPanelProps) => {
  const editor = useEditor();
  const editorState = useEditorState();

  const menuItems = useMemo(() => editorState.pages.map(pageData => ({
    id: pageData.id,
    label: pageData.title,
  })), [editorState.pages]);

  const handleMenuSelect = (id: string, popupMenuItemId?: string) => {
    editor.selectPage(id);

    if (popupMenuItemId) {
      if (popupMenuItemId === "delete") {
        editor.deletePage(id);

        // api.services.page.deleteOne(id).then(result => {
        //   if (result.success === 1) {
        //     editor.deletePage(id);
        //   }
        // })
      }
    }
  }

  return (
    <Panel>
      <PanelHeader>
        <span className="title">Pages</span>
        <span className="separator separator--row" />
        <button onClick={editor.openCreatePageModal} className="button button--type-circle">
          <Icon name="plus" />
        </button>
      </PanelHeader>
      <PanelBody>
        <Menu
          selected={editorState.selectedPageId}
          onSelect={handleMenuSelect}
          items={menuItems}
          popupMenuItems={popupMenuItems}
        />
      </PanelBody>
    </Panel>
  )
}

export default EditorPagesPanel
