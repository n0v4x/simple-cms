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
import modules from '@module-system/modules'

interface Props extends Pick<ModalProps, "open" | "onClose"> {
  onSelect: (module: Module) => void;
}

const ModuleLibraryModal = ({ open, onClose, onSelect }: Props) => {
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

    for (const key in modules) {
      const module = modules[key];
      const category = module.category || "Not specified"

      if (Array.isArray(result[category])) {
        result[category].push(module);
      } else {
        result[category] = [module];
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

  const handleSelect = () => {
    const { category, moduleIndex } = selected;

    if (category !== null && moduleIndex !== null) {
      onSelect(modulesByCategory[category][moduleIndex]);
    }
  }

  return (
    <Modal className="module-library-modal" onClose={onClose} open={open}>
      <ModalDialog className="module-library-modal__dialog">
        <ModalHeader className="module-library-modal__header" title="Select module" subtitle="Select module in list" onClose={onClose} />
        <ModalContent className="module-library-modal__content">
          <div className="module-library-modal__content-scroll">
            <ModuleLibrary modulesByCategory={modulesByCategory} onSelect={handleModuleLibrarySelect} selected={selected} />
          </div>
        </ModalContent>
        <ModalFooter className="module-library-modal__footer">
          <button onClick={onClose} className="button module-library-modal__footer-control">
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

export default ModuleLibraryModal
