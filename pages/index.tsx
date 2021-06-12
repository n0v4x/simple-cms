import { useCallback, useState } from 'react'
import { GetStaticProps } from 'next'

import ModuleList from '@components/common/ModuleList'
import ModuleHierarchy from '@components/common/ModuleHierarchy'
import Modal from '@components/common/Modal'
import ModalDialog from '@components/common/Modal/ModalDialog'
import ModalHeader from '@components/common/Modal/ModalHeader'
import AddModuleModal from '@components/common/Modal/AddModuleModal'

interface HomeProps {
  modules: ModuleData[]
}

const Home = ({ modules }: HomeProps) => {
  const [isAddModuleModalOpen, setIsAddModuleModalOpen] = useState(true);
  const [state, setState] = useState(modules);
  const [isEditorMode, setIsEditorMode] = useState(true);

  const handleUpdate = useCallback((updatedModules: ModuleData[]) => {
    setState(updatedModules);
  }, []);

  return (
    <>
      <div className="editor">
        <div className="editor__sidebar">
          <ModuleHierarchy onUpdate={handleUpdate} items={state} />
        </div>
        <div className="editor__content">
          <ModuleList isEditorMode={isEditorMode} onUpdate={handleUpdate} items={state} />
        </div>
      </div>
      {/* <Modal onClose={() => setIsAddModuleModalOpen(false)} open={isAddModuleModalOpen}>
        <ModalDialog>
          <ModalHeader title="Add module" subtitle="Choose model for the list" onClose={() => setIsAddModuleModalOpen(false)} />
        </ModalDialog>
      </Modal> */}
      <AddModuleModal onClose={() => setIsAddModuleModalOpen(false)} open={isAddModuleModalOpen} />
    </>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const modules: ModuleData[] = [{
    id: 1,
    type: "layout",
    children: [{
      id: 2,
      type: "section",
      children: [{
        id: 3,
        type: "container"
      }]
    },
    {
      id: 4,
      type: "section",
    },
    {
      id: 5,
      type: "section",
    }]
  }]

  return {
    props: {
      modules
    }
  }
}