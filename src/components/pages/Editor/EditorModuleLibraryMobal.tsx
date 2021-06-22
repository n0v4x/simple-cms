// import moduleMap from 'modules'
import React, { useCallback, useMemo, useState } from 'react'
import ModuleLibrary from '@components/layout/ModuleLibrary'
import Modal, {
  ModalProps,
  ModalContent,
  ModalDialog,
  ModalFooter,
  ModalHeader,
} from '@components/common/Modal'
import moduleLibrary from '@module-system/modules'
import { useEditor, useEditorState } from './Editor'

interface EditorModuleLibraryModalProps { }

const EditorModuleLibraryModal = ({ }: EditorModuleLibraryModalProps) => {
  const editorState = useEditorState();
  const editor = useEditor();
  const [selected, setSelected] = useState<{
    category: string | null,
    moduleIndex: number | null
  }>({
    category: null,
    moduleIndex: null
  })

  const modulesByCategory = useMemo(() => {
    const result: {
      [category: string]: Module[],
    } = {};

    for (const key in moduleLibrary) {
      const currentModule = moduleLibrary[key];
      const category = currentModule.category || "Not specified"

      if (Array.isArray(result[category])) {
        result[category].push(currentModule);
      } else {
        result[category] = [currentModule];
      }
    }

    return result;
  }, []);

  const handleModuleLibrarySelect = useCallback((category: string, moduleIndex: number) => {
    setSelected({
      category,
      moduleIndex
    })
  }, []);

  // const handleSelect = () => {

  // }

  const handleSelect = useCallback(() => {
    const { category, moduleIndex } = selected;
    const { selectedPage } = editorState;

    if (category !== null && moduleIndex !== null && selectedPage) {
      const selectedModule = modulesByCategory[category][moduleIndex]
      const parentId = editorState.selectedModuleId || 0;
      const largestModuleId =
        selectedPage.modules && selectedPage.modules.length !== 0
          ? selectedPage.modules.reduce((prev, curr) => prev.id > curr.id ? prev : curr).id
          : 0

      const newModuleData: ModuleData = {
        id: largestModuleId + 1,
        parentId,
        module: {
          id: selectedModule.id
        }
      }

      console.log(newModuleData);

      editor.addModule(newModuleData)
      // api.services.page.addModule(state.selectedPageId, newModuleData).then(result => {
      //   if (result.success === 1) {
      //     editor.addModule(result.data)
      //   }
      // })
    }

  }, [editorState, selected])


  return (
    <Modal className="module-library-modal" onClose={editor.closeModuleLibraryModal} open={editorState.isModuleLibraryModalOpen}>
      <ModalDialog className="module-library-modal__dialog">
        <ModalHeader className="module-library-modal__header" title="Select module" subtitle="Select module in list" onClose={editor.closeModuleLibraryModal} />
        <ModalContent className="module-library-modal__content">
          <div className="module-library-modal__content-scroll">
            <ModuleLibrary modulesByCategory={modulesByCategory} onSelect={handleModuleLibrarySelect} selected={selected} />
          </div>
        </ModalContent>
        <ModalFooter className="module-library-modal__footer">
          <button onClick={editor.closeModuleLibraryModal} className="button module-library-modal__footer-control">
            Close
          </button>
          <button onClick={handleSelect} className="button button--solid module-library-modal__footer-control">
            Select
          </button>
        </ModalFooter>
      </ModalDialog>
    </Modal>
  )
}

export default EditorModuleLibraryModal
