import { Reducer, useMemo, useReducer } from 'react'

import classNames from 'classnames';

import Sidebar from '@components/common/Sidebar';
import EditorCreatePageModal from './EditorCreatePageModal';
import { findChildrenModules } from '@utils/module';

import {
  useSafeContext,
  createSafeContext,
} from "@contexts/helpers";

import EditorPagesPanel from './EditorPagesPanel';
import EditorModulesPanel from './EditorModulesPanel';
import EditorPagePropertiesPanel from './EditorPagePropertiesPanel';
import EditorModulePropertiesPanel from './EditorModulePropertiesPanel';
import EditorViewport from './EditorViewport';
import EditorModuleLibraryModal from './EditorModuleLibraryMobal';
import EditorHeader from './EditorHeader';

interface EditorState {
  pages: PageData[];
  selectedPageId?: PageData["id"] | null;
  selectedModuleId?: ModuleData["id"] | null;

  isModuleLibraryModalOpen: boolean;
  isCreatePageModalOpen: boolean;

  viewMode: "editor" | "preview"
}

const initialState: EditorState = {
  pages: [],

  selectedPageId: null,
  selectedModuleId: null,

  isModuleLibraryModalOpen: false,
  isCreatePageModalOpen: false,

  viewMode: "editor"
}

const OPEN_CREATE_MODAL = "OPEN_CREATE_MODAL";
const CLOSE_CREATE_MODAL = "CLOSE_CREATE_MODAL";

const CREATE_PAGE = "CREATE_PAGE";
const SELECT_PAGE = "SELECT_PAGE";
const DELETE_PAGE = "DELETE_PAGE";
const UPDATE_PAGE = "UPDATE_PAGE";

const SELECT_MODULE = "SELECT_MODULE";
const DELETE_MODULE = "DELETE_MODULE";
const ADD_MODULE = "ADD_MODULE";
const UPDATE_MODULE_PROPERTIES = "UPDATE_MODULE_PROPERTIES";

const CHANGE_VIEW_MODE = "SET_VIEW_MODE";

const OPEN_MODULE_LIBRARY_MODAL = "OPEN_MODULE_LIBRARY_MODAL";
const CLOSE_MODULE_LIBRARY_MODAL = "CLOSE_MODULE_LIBRARY_MODAL";

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

interface DeletePageAction {
  type: typeof DELETE_PAGE,
  payload: PageData["id"]
}

interface UpdatePageAction {
  type: typeof UPDATE_PAGE,
  payload: {
    id: PageData["id"],
    data: Partial<Omit<PageData, "id">>
  }
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
interface UpdateModulePropertiesAction {
  type: typeof UPDATE_MODULE_PROPERTIES,
  payload: {
    moduleId: ModuleData["id"],
    properties: ModuleDataProperties
  }
}

interface OpenModuleLibraryModalAction {
  type: typeof OPEN_MODULE_LIBRARY_MODAL,
}

interface CloseModuleLibraryModalAction {
  type: typeof CLOSE_MODULE_LIBRARY_MODAL,
}

interface ChangeViewModeAction {
  type: typeof CHANGE_VIEW_MODE,
  payload: EditorState["viewMode"]
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

const getDeletePageAction = (id: PageData["id"]): DeletePageAction => ({
  type: DELETE_PAGE,
  payload: id
});

const getUpdatePageAction = (id: UpdatePageAction["payload"]["id"], data: UpdatePageAction["payload"]["data"]): UpdatePageAction => ({
  type: UPDATE_PAGE,
  payload: {
    id,
    data
  }
});

/* MODULE */

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

const getUpdateModulePropertiesAction = (moduleId: ModuleData["id"], properties: ModuleDataProperties): UpdateModulePropertiesAction => ({
  type: UPDATE_MODULE_PROPERTIES,
  payload: {
    moduleId,
    properties
  }
});

const getOpenModuleLibraryModalAction = (): OpenModuleLibraryModalAction => ({
  type: OPEN_MODULE_LIBRARY_MODAL,
})

const getCloseModuleLibraryModalAction = (): CloseModuleLibraryModalAction => ({
  type: CLOSE_MODULE_LIBRARY_MODAL,
})

const getChangeViewMode = (mode: ChangeViewModeAction["payload"]): ChangeViewModeAction => ({
  type: CHANGE_VIEW_MODE,
  payload: mode
})

type EditorActions =
  | OpenCreatePageModalAction
  | CloseCreatePageModalAction
  | CreatePageAction
  | SelectPageAction
  | DeletePageAction
  | SelectModuleAction
  | DeleteModuleAction
  | AddModuleAction
  | OpenModuleLibraryModalAction
  | CloseModuleLibraryModalAction
  | UpdatePageAction
  | ChangeViewModeAction
  | UpdateModulePropertiesAction

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

    case OPEN_MODULE_LIBRARY_MODAL: {
      return {
        ...state,
        isModuleLibraryModalOpen: true
      }
    }
    case CLOSE_MODULE_LIBRARY_MODAL: {
      return {
        ...state,
        isModuleLibraryModalOpen: false
      }
    }
    /* PAGE */
    case CREATE_PAGE: {
      return {
        ...state,
        pages: [...state.pages, action.payload],
        selectedPageId: action.payload.id
      }
    }
    case SELECT_PAGE: {
      return state.selectedPageId !== action.payload ? {
        ...state,
        selectedModuleId: null,
        selectedPageId: action.payload
      } : state
    }
    case DELETE_PAGE: {
      return {
        ...state,
        pages: state.pages.filter(page => page.id !== action.payload),
        selectedModuleId: null,
        selectedPageId: null
      }
    }
    case UPDATE_PAGE: {
      return {
        ...state,
        pages: state.pages.map(page => {
          if (page.id === action.payload.id) {
            return {
              ...page,
              ...action.payload.data
            }
          }

          return page
        }),
      }
    }

    /* MODULE */
    case SELECT_MODULE: {
      return {
        ...state,
        selectedModuleId: action.payload
      }
    }

    case DELETE_MODULE: {
      const pages = state.pages.map(page => {
        if ((state.selectedPageId && state.selectedPageId === page.id) && page.modules) {
          const childrenIdsToDelete = [action.payload, ...findChildrenModules(page.modules, action.payload, (module) => module.id)]

          return {
            ...page,
            modules: page.modules.filter(module => childrenIdsToDelete.indexOf(module.id) === -1)
          }
        }

        return page
      })

      return {
        ...state,
        selectedModuleId: null,
        pages,
      }
    }

    case ADD_MODULE: {
      const pages = state.pages.map(page => {
        if (state.selectedPageId && state.selectedPageId === page.id) {
          return {
            ...page,
            modules: page.modules ? [...page.modules, action.payload] : [action.payload]
          }
        }

        return page
      })

      return {
        ...state,
        selectedModuleId: action.payload.id,
        pages,
        isModuleLibraryModalOpen: false
      }
    }

    case UPDATE_MODULE_PROPERTIES: {
      if (state.selectedPageId) {
        return {
          ...state,
          pages: state.pages.map(page => {
            if ((page.id === state.selectedPageId) && page.modules) {
              return {
                ...page,
                modules: page.modules.map(moduleData => {
                  if (moduleData.id === action.payload.moduleId) {
                    return {
                      ...moduleData,
                      module: {
                        ...moduleData.module,
                        properties: {
                          ...moduleData.module.properties,
                          ...action.payload.properties
                        }
                      }
                    }
                  }

                  return moduleData;
                })
              }
            }

            return page;
          })
        }
      }

      return state;
    }

    case CHANGE_VIEW_MODE: {
      return {
        ...state,
        viewMode: action.payload
      }
    }

    default: {
      return state
    }
  }
}

interface EditorProps {
  initialData: PageData[];
}


interface EditorContextValue {
  selectPage: (id: PageData["id"]) => void,
  deletePage: (id: PageData["id"]) => void,
  updatePage: (id: PageData["id"], data: Partial<Omit<PageData, "id">>) => void,
  addPage: (data: PageData) => void,

  // module
  selectModule: (id: ModuleData["id"] | null) => void,
  deleteModule: (id: ModuleData["id"]) => void,
  addModule: (data: ModuleData) => void,
  updateModuleProperties: (id: ModuleData['id'], properties: ModuleDataProperties) => void;

  // create page modal
  openCreatePageModal: () => void,
  closeCreatePageModal: () => void,

  // module library modal
  closeModuleLibraryModal: () => void,
  openModuleLibraryModal: () => void,

  changeViewMode: (mode: ChangeViewModeAction["payload"]) => void

}

interface EditorStateContextValue extends EditorState {
  selectedPage?: PageData,
  selectedModule?: ModuleData
}

const EditorContext = createSafeContext<EditorContextValue>();
const EditorStateContext = createSafeContext<EditorStateContextValue>();

export const useEditor = () => useSafeContext(EditorContext);
export const useEditorState = () => useSafeContext(EditorStateContext);

const Editor = ({ initialData }: EditorProps) => {
  const editorInitialState = useMemo(() => {
    return {
      ...initialState,
      pages: initialData,
      selectedPageId: initialData[0] ? initialData[0].id : undefined
    }
  }, []);
  const [state, dispatch] = useReducer(reducer, editorInitialState);

  const selectedPage = useMemo(() => {
    if (state.selectedPageId) {
      return state.pages.find(page => page.id === state.selectedPageId);
    }

    return undefined;
  }, [state]);

  const selectedModule = useMemo(() => {
    if (selectedPage && state.selectedModuleId && selectedPage.modules) {
      return selectedPage.modules.find(module => module.id === state.selectedModuleId);
    }

    return undefined;
  }, [state.selectedModuleId, selectedPage]);

  const editor = useMemo(() => {
    return {
      // page
      selectPage: (id: PageData["id"]) => dispatch(getSelectPageAction(id)),
      deletePage: (id: PageData["id"]) => dispatch(getDeletePageAction(id)),
      updatePage: (id: PageData["id"], data: Partial<Omit<PageData, "id">>) => dispatch(getUpdatePageAction(id, data)),
      addPage: (data: PageData) => dispatch(getCreatePageAction(data)),

      // module
      selectModule: (id: ModuleData["id"] | null) => dispatch(getSelectModuleAction(id)),
      deleteModule: (id: ModuleData["id"]) => dispatch(getDeleteModuleAction(id)),
      addModule: (data: ModuleData) => dispatch(getAddModuleAction(data)),
      updateModuleProperties: (id, properties) => dispatch(getUpdateModulePropertiesAction(id, properties)),


      // create page modal
      openCreatePageModal: () => dispatch(getOpenCreatePageModalAction()),
      closeCreatePageModal: () => dispatch(getCloseCreatePageModalAction()),

      // module library modal
      closeModuleLibraryModal: () => dispatch(getCloseModuleLibraryModalAction()),
      openModuleLibraryModal: () => dispatch(getOpenModuleLibraryModalAction()),

      changeViewMode: (mode: ChangeViewModeAction["payload"]) => dispatch(getChangeViewMode(mode))
    } as EditorContextValue;
  }, [dispatch]);


  const editorState = useMemo(() => {
    return {
      ...state,
      selectedPage,
      selectedModule
    }
  }, [state, selectedPage]);

  console.log(state.selectedModuleId);

  return <EditorStateContext.Provider value={editorState}>
    <EditorContext.Provider value={editor}>
      <div className={classNames("editor", `editor--view-mode-${state.viewMode}`)}>
        <EditorHeader />
        <div className="editor__body">
          <Sidebar className="editor__sidebar editor__sidebar--left">
            <EditorPagesPanel />
            <EditorModulesPanel />
          </Sidebar>

          <EditorViewport />

          <Sidebar className="editor__sidebar editor__sidebar--left">
            <EditorPagePropertiesPanel />
            <EditorModulePropertiesPanel />
          </Sidebar>

          <EditorCreatePageModal />
          <EditorModuleLibraryModal />
        </div>
      </div>
    </EditorContext.Provider>
  </EditorStateContext.Provider>
}

export default Editor;