import { Reducer, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { GetServerSideProps, GetStaticProps } from 'next'

import ModuleViewport from '@components/layout/ModuleViewport'
import ModuleHierarchy from '@components/layout/ModuleHierarchy'
import ModuleLibraryModal from "@components/layout/ModuleLibraryModal";
import ModuleProperties from "@components/layout/ModuleProperties";
import Panel, { PanelHeader } from '@components/common/Panel'
import ScaleRange from '@components/common/ScaleRange';
import axios from "axios";
import api from "@api/index";
import { useApi } from '@contexts/ApiProvider';
import usePrevState from '@hooks/usePrevState';
import classNames from 'classnames';
import PanelBody from '@components/common/Panel/PanelBody';
import PanelFooter from '@components/common/Panel/PanelFooter';
import pagesData from "@data/pages.json";
import modulesData from "@data/modules.json";
import Sidebar from '@components/common/Sidebar';
import Menu from '@components/common/Menu';
import { Plus } from 'react-feather';
import Icon from '@components/common/Icon';
import EditorCreatePageModal from './EditorCreatePageModal';
import { findChildrenModules } from '@utils/module';



interface EditorState {
  pages: PageData[];
  selectedPage?: PageData | null;
  selectedModule?: ModuleData | null;
  isCreatePageModalOpen: boolean;
}

const initialState: EditorState = {
  pages: [],
  selectedPage: null,
  isCreatePageModalOpen: true,
  selectedModule: null
}

const OPEN_CREATE_MODAL = "OPEN_CREATE_MODAL";
const CLOSE_CREATE_MODAL = "CLOSE_CREATE_MODAL";

const CREATE_PAGE = "CREATE_PAGE";
const SELECT_PAGE = "SELECT_PAGE";

const SELECT_MODULE = "SELECT_MODULE";
const DELETE_MODULE = "DELETE_MODULE";
const ADD_MODULE = "ADD_MODULE";

interface OpenCreatePageModalAction {
  type: typeof OPEN_CREATE_MODAL
}

interface CloseCreatePageModalAction {
  type: typeof CLOSE_CREATE_MODAL
}

interface CreatePageAction {
  type: typeof CREATE_PAGE;
  payload: PageData
}

interface SelectPageAction {
  type: typeof SELECT_PAGE,
  payload: PageData["id"]
}

interface SelectModuleAction {
  type: typeof SELECT_MODULE,
  payload?: ModuleData["id"] | null
}
interface DeleteModuleAction {
  type: typeof DELETE_MODULE,
  payload: ModuleData["id"]
}

interface AddModuleAction {
  type: typeof ADD_MODULE,
  payload: ModuleData
}

const getOpenCreatePageModalAction = (): OpenCreatePageModalAction => ({
  type: OPEN_CREATE_MODAL
});

const getCloseCreatePageModalAction = (): CloseCreatePageModalAction => ({
  type: CLOSE_CREATE_MODAL
});

const getCreatePageAction = (pageData: PageData): CreatePageAction => ({
  type: CREATE_PAGE,
  payload: pageData
});

const getSelectPageAction = (id: PageData["id"]): SelectPageAction => ({
  type: SELECT_PAGE,
  payload: id
});

const getSelectModuleAction = (id?: ModuleData["id"] | null): SelectModuleAction => ({
  type: SELECT_MODULE,
  payload: id
});

const getDeleteModuleAction = (id: ModuleData["id"]): DeleteModuleAction => ({
  type: DELETE_MODULE,
  payload: id
});

const getAddModuleAction = (moduleData: ModuleData): AddModuleAction => ({
  type: ADD_MODULE,
  payload: moduleData
});

type EditorActions = OpenCreatePageModalAction | CloseCreatePageModalAction | CreatePageAction | SelectPageAction | SelectModuleAction | DeleteModuleAction | AddModuleAction;

const reducer: Reducer<EditorState, EditorActions> = (state, action) => {
  switch (action.type) {
    case OPEN_CREATE_MODAL: {
      return {
        ...state,
        isCreatePageModalOpen: true
      }
    }
    case CLOSE_CREATE_MODAL: {
      return {
        ...state,
        isCreatePageModalOpen: false
      }
    }
    case CREATE_PAGE: {
      return {
        ...state,
        pages: [...state.pages, action.payload]
      }
    }
    case SELECT_PAGE: {
      return state.selectedPage && state.selectedPage.id === action.payload ? state : {
        ...state,
        selectedModule: null,
        selectedPage: action.payload ? state.pages.find(page => page.id === action.payload) : null
      }
    }
    case SELECT_MODULE: {
      return {
        ...state,
        selectedModule:
          action.payload && state.selectedPage && state.selectedPage.modules
            ? state.selectedPage.modules.find(moduleData => moduleData.id === action.payload)
            : null
      }
    }
    case DELETE_MODULE: {
      const pages = state.pages.map(page => {
        if ((state.selectedPage && state.selectedPage.id === page.id) && page.modules) {
          const childrenIdsToDelete = [action.payload, findChildrenModules(page.modules, action.payload, (module) => module.id)]

          return {
            ...page,
            modules: page.modules.filter(module => childrenIdsToDelete.indexOf(module.id) === -1)
          }
        }

        return page
      })

      const selectedPage = state.selectedPage ? pages.find(page => page.id === state.selectedPage!.id) : null

      return {
        ...state,
        selectedModule: null,
        pages,
        selectedPage
      }
    }
    case ADD_MODULE: {
      return state
    }
    default: {
      return state
    }
  }
}

interface EditorProps {
  initialData: PageData[];
}

const Editor = ({ initialData }: EditorProps) => {
  const editorInitialState = useMemo(() => {
    return {
      ...initialState,
      pages: initialData,
      selectedPage: initialData[0]
    }
  }, []);
  const [state, dispatch] = useReducer(reducer, editorInitialState);

  const [selected, setSelected] = useState<ModuleData>();
  const [isEditorMode, setIsEditorMode] = useState(true);
  const [scale, setScale] = useState(1);

  // const handleAction = useCallback(({ type, payload }: {
  //   type: "add" | "select" | "delete",
  //   payload: {
  //     id: ModuleData["id"]
  //   }
  // }) => {

  //   switch (type) {
  //     case "delete": {
  //       const { id } = payload;
  //       api.module.deleteOne(id).then(({ data }) => {
  //         if (data.data && data.data.deletedCount > 0) {
  //           setModulesData(modulesData.filter(moduleData => moduleData.id !== id));
  //         }
  //       }).catch((err) => {
  //         console.log(err);
  //       })

  //       break;
  //     }

  //     case "select": {
  //       setSelected(modulesData.find(moduleData => moduleData.id === payload.id));

  //       break;
  //     }

  //     case "add": {
  //       setIsModuleLibraryModalOpen(true);

  //       moduleIdToAddRef.current = payload.id;

  //       break;
  //     }
  //   }
  // }, [modulesData]);

  // const handleModuleLibraryModalClose = () => {
  //   setIsModuleLibraryModalOpen(false)
  // }

  // const handleModuleLibraryModalSelect = (module: Module) => {
  //   setIsModuleLibraryModalOpen(false);

  //   const moduleIdToAdd = moduleIdToAddRef.current;

  //   if (moduleIdToAdd !== undefined) {
  //     const newModuleDataItem = {
  //       parentId: moduleIdToAdd,
  //       module: {
  //         id: module.id
  //       }
  //     }

  //     api.module.create(newModuleDataItem)
  //       .then(({ data }) => {
  //         const addedModuleData = data.data;

  //         if (addedModuleData !== undefined) {
  //           setModulesData(oldState => {
  //             return [
  //               ...oldState,
  //               addedModuleData
  //             ]
  //           });

  //           setSelected(addedModuleData);
  //         }
  //       }).catch(err => {
  //         console.log(err);
  //       });

  //     moduleIdToAddRef.current = undefined;
  //   }
  // }

  // const handleModulePropertiesChange = (moduleData: ModuleData) => {
  //   setModulesData(modulesData.map((modulesDataItem) => {
  //     if (modulesDataItem.id === moduleData.id) {
  //       return moduleData;
  //     }

  //     return modulesDataItem
  //   }));

  //   setSelected(moduleData);
  // }

  // // useEffect(() => {
  // //   if (selected && prevSelected && selected.id !== prevSelected.id) {
  // //     api.module.update(prevSelected.id, prevSelected).then((data) => {
  // //       return;
  // //     }).catch((err) => {
  // //       return;
  // //     });
  // //   }
  // // }, [selected]);


  // const propertiesHaveChanged = selected && prevSelected && selected.id === prevSelected.id && selected !== prevSelected;

  // console.log(propertiesHaveChanged);

  // const handleSaveChanges = useCallback(() => {
  //   if (propertiesHaveChanged && selected) {
  //     api.module.update(selected.id, selected).then((data) => {
  //       return;
  //     }).catch((err) => {
  //       return;
  //     });
  //   }
  // }, [propertiesHaveChanged, selected]);

  // console.log({pagesData.map(pageData => ({
  //   id: pageData.id,
  //   label: pageData.title
  // })), pagesData)

  console.log(state.pages, state.pages.map(pageData => ({
    id: pageData.id,
    label: pageData.title
  })))

  const pagesMenuItems = state.pages.map(pageData => ({
    id: pageData.id,
    label: pageData.title
  }))

  const handlePagesMenuSelect = (id: string) => {
    dispatch(getSelectPageAction(id));
  }

  const openCreatePageModal = () => {
    dispatch(getOpenCreatePageModalAction());
  }

  const closeCreatePageModal = () => {
    dispatch(getCloseCreatePageModalAction());
  }

  const handleAddPage = ({ url, title }: { url: string, title: string }) => {
    const newPageData: PageData = { id: Date.now().toString(), url, title }

    dispatch(getCreatePageAction(newPageData));
  }

  const handleSelectModule = (id: ModuleData["id"]) => {
    dispatch(getSelectModuleAction(id));
  }

  const handleDeleteModule = (id: ModuleData["id"]) => {
    dispatch(getDeleteModuleAction(id));
  }

  const handleAddModule = (id: ModuleData["id"]) => {
    // dispatch(getAddModuleAction(moduleData));
  }

  // const handleAddPage = () => {
  // }

  return <div className="view">
    <div className="view__header">
      <div className="view__header-left"></div>

      <div className="view__header-center">
        <div className="label-switch">
          <span onClick={() => setIsEditorMode(true)} className={classNames("label-switch__label", { "is-active": isEditorMode })}>
            Editor
          </span>
          <span className="label-switch__label-separator">
            /
          </span>
          <span onClick={() => setIsEditorMode(false)} className={classNames("label-switch__label", { "is-active": !isEditorMode })}>
            View
          </span>
        </div>
      </div>

      <div className="view__header-right"></div>
    </div>
    <div className="view__body">
      <div className="editor">
        <Sidebar className="editor__sidebar editor__sidebar--left">
          <Panel>
            <PanelHeader>
              <span className="title">Pages</span>
              <span className="separator separator--row" />
              <button onClick={openCreatePageModal} className="button button--circle">
                <Icon name="plus" />
              </button>
            </PanelHeader>
            <PanelBody>
              <Menu
                selected={state.selectedPage?.id}
                onSelect={handlePagesMenuSelect}
                items={pagesMenuItems}
              />
            </PanelBody>
          </Panel>

          <Panel>
            <PanelHeader>
              <span className="title">Modules</span>
              <span className="separator separator--row" />
              <button className="button button--circle">
                <Icon name="plus" />
              </button>
            </PanelHeader>
            <PanelBody>
              <ModuleHierarchy
                onSelect={handleSelectModule}
                onAdd={handleAddModule}
                onDelete={handleDeleteModule}
                selected={state.selectedModule}
                className="editor__hierarchy"
                items={state.selectedPage?.modules || []}
              // selected={selected}
              />
            </PanelBody>
            {/* <div className="editor__hierarchy-controls">
                <button onClick={() => {
                  handleAction({ type: "add", payload: { id: 0 } })
                }} className="editor__hierarchy-controls-add-button button button--block button--solid">Add</button>
              </div> */}
          </Panel>
        </Sidebar>

        <div className="editor__viewport">
          <div className="editor__viewport-modules">
            <div style={{ transform: `scale(${scale})` }} className="editor__viewport-modules-scaler">
              {/* <ModuleViewport
                  onSelect={(moduleData) => setSelected(moduleData)}
                  selected={selected && selected.id}
                  showModulesBoundaries={true}
                  items={modulesData}
                /> */}
            </div>
          </div>
          <div className="editor__viewport-footer">
            <ScaleRange value={scale} onChange={(scale) => setScale(scale)} />
          </div>
        </div>

        <Panel className="editor__panel editor__panel--right">
          <Panel>
            <PanelHeader>
              <span className="title u-nowrap">Page properties</span>
              <span className="separator separator--row" />
            </PanelHeader>
            <PanelBody>

            </PanelBody>
            {/* {selected ? <>
                <PanelBody>
                  <ModuleProperties
                    moduleData={selected}
                    onChange={handleModulePropertiesChange}
                  />
                </PanelBody>
                {propertiesHaveChanged && <PanelFooter>
                  <div className="editor__properties-controls">
                    <button onClick={handleSaveChanges} className={classNames("editor__hierarchy-controls-add-button button button--block button--solid")}>Save changes</button>
                  </div>
                </PanelFooter>
                }
              </> : null} */}
          </Panel>
          <Panel>
            <PanelHeader>
              <span className="title u-nowrap">Module properties</span>
              <span className="separator separator--row" />
            </PanelHeader>
            <PanelBody>

            </PanelBody>
          </Panel>
        </Panel>

        <EditorCreatePageModal
          templates={[{ id: "1", name: "my template", modules: [] }, { id: "2", name: "my template 2", modules: [] }]}
          onClose={closeCreatePageModal}
          onAdd={handleAddPage}
          open={state.isCreatePageModalOpen} />

        {/* <ModuleLibraryModal
            onSelect={handleModuleLibraryModalSelect}
            onClose={handleModuleLibraryModalClose}
            open={isModuleLibraryModalOpen}
          /> */}
      </div>
    </div>
  </div>

}

export default Editor;