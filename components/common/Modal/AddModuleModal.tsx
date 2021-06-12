import ModuleLibrary from '@components/layout/ModuleLibrary'
import moduleMap from 'modules'
import React, { useMemo, useState } from 'react'
import Modal, { ModalProps } from './Modal'
import ModalContent from './ModalContent'
import ModalDialog from './ModalDialog'
import ModalFooter from './ModalFooter'
import ModalHeader from './ModalHeader'

interface Props extends Pick<ModalProps, "open" | "onClose"> {

}

const AddModuleModal = ({ open, onClose }: Props) => {
  const [selected, setSelected] = useState<{
    category: string | null,
    moduleIndex: number | null
  }>({
    category: null,
    moduleIndex: null
  })

  const handleModuleLibrarySelect = (category: string, moduleIndex: number) => {
    setSelected({
      category,
      moduleIndex
    })
  }

  const modulesByCategory = useMemo(() => {
    const result: {
      [category: string]: Module[],
    } = {};

    for (const key in moduleMap) {
      const module = moduleMap[key];
      const category = module.category || "Not specified"

      if (Array.isArray(result[category])) {
        result[category].push(module);
      } else {
        result[category] = [module];
      }
    }

    return result;
  }, []);

  return (
    <Modal onClose={onClose} open={open}>
      <ModalDialog>
        <ModalHeader title="Add module" subtitle="Choose model for the list" onClose={onClose} />
        <ModalContent>
          <ModuleLibrary modulesByCategory={modulesByCategory} onSelect={handleModuleLibrarySelect} selected={selected} />
        </ModalContent>
        <ModalFooter>
          <button className="button">
            add
          </button>
        </ModalFooter>
      </ModalDialog>
    </Modal>
  )
}

export default AddModuleModal
