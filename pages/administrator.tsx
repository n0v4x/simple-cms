import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GetServerSideProps, GetStaticProps } from 'next'

import ModuleViewport from '@components/layout/ModuleViewport'
import ModuleHierarchy from '@components/layout/ModuleHierarchy'
import ModuleLibraryModal from "@components/layout/ModuleLibraryModal";
import ModuleProperties from "@components/layout/ModuleProperties";
// import Panel, { PanelSection } from '@components/common/Panel'
import ScaleRange from '@components/common/ScaleRange';
import axios from "axios";
import api from "@api/index";
import { useApi } from '../src/contexts/ApiProvider';
import usePrevState from '@hooks/usePrevState';
import classNames from 'classnames';
import PanelBody from '@components/common/Panel/PanelBody';
import PanelFooter from '@components/common/Panel/PanelFooter';

interface EditorProps {
  largestModuleId: number;
  modules: ModuleData[];
}

const Editor = ({ modules, largestModuleId }: EditorProps) => {
  const api = useApi();
  const [isModuleLibraryModalOpen, setIsModuleLibraryModalOpen] = useState(false);
  const [modulesData, setModulesData] = useState(modules);
  const largestModuleIdRef = useRef(largestModuleId);
  const [selected, setSelected] = useState<ModuleData>();
  const moduleIdToAddRef = useRef<ModuleData["id"]>();
  const [isEditorMode, setIsEditorMode] = useState(true);
  const [scale, setScale] = useState(1);
  const prevSelected = usePrevState(selected);

  const handleAction = useCallback(({ type, payload }: {
    type: "add" | "select" | "delete",
    payload: {
      id: ModuleData["id"]
    }
  }) => {

    switch (type) {
      case "delete": {
        const { id } = payload;
        api.module.deleteOne(id).then(({ data }) => {
          if (data.data && data.data.deletedCount > 0) {
            setModulesData(modulesData.filter(moduleData => moduleData.id !== id));
          }
        }).catch((err) => {
          console.log(err);
        })

        break;
      }

      case "select": {
        setSelected(modulesData.find(moduleData => moduleData.id === payload.id));

        break;
      }

      case "add": {
        setIsModuleLibraryModalOpen(true);

        moduleIdToAddRef.current = payload.id;

        break;
      }
    }
  }, [modulesData]);

  const handleModuleLibraryModalClose = () => {
    setIsModuleLibraryModalOpen(false)
  }

  const handleModuleLibraryModalSelect = (module: Module) => {
    setIsModuleLibraryModalOpen(false);

    const moduleIdToAdd = moduleIdToAddRef.current;

    if (moduleIdToAdd !== undefined) {
      const newModuleDataItem = {
        parentId: moduleIdToAdd,
        module: {
          id: module.id
        }
      }

      api.module.create(newModuleDataItem)
        .then(({ data }) => {
          const addedModuleData = data.data;

          if (addedModuleData !== undefined) {
            setModulesData(oldState => {
              return [
                ...oldState,
                addedModuleData
              ]
            });

            setSelected(addedModuleData);
          }
        }).catch(err => {
          console.log(err);
        });

      moduleIdToAddRef.current = undefined;
    }
  }

  const handleModulePropertiesChange = (moduleData: ModuleData) => {
    setModulesData(modulesData.map((modulesDataItem) => {
      if (modulesDataItem.id === moduleData.id) {
        return moduleData;
      }

      return modulesDataItem
    }));

    setSelected(moduleData);
  }

  // useEffect(() => {
  //   if (selected && prevSelected && selected.id !== prevSelected.id) {
  //     api.module.update(prevSelected.id, prevSelected).then((data) => {
  //       return;
  //     }).catch((err) => {
  //       return;
  //     });
  //   }
  // }, [selected]);


  const propertiesHaveChanged = selected && prevSelected && selected.id === prevSelected.id && selected !== prevSelected;

  console.log(propertiesHaveChanged);

  const handleSaveChanges = useCallback(() => {
    if (propertiesHaveChanged && selected) {
      api.module.update(selected.id, selected).then((data) => {
        return;
      }).catch((err) => {
        return;
      });
    }
  }, [propertiesHaveChanged, selected]);

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
      {isEditorMode ? (
        <div className="editor">
          {/* <Panel className="editor__panel editor__panel--left">
            <PanelSection title="Module hierarchy">
              <ModuleHierarchy
                className="editor__hierarchy"
                onAction={handleAction}
                items={modulesData}
                selected={selected}
              />
              <div className="editor__hierarchy-controls">
                <button onClick={() => {
                  handleAction({ type: "add", payload: { id: 0 } })
                }} className="editor__hierarchy-controls-add-button button button--block button--solid">Add</button>
              </div>
            </PanelSection>
          </Panel> */}

          <div className="editor__viewport">
            <div className="editor__viewport-modules">
              <div style={{ transform: `scale(${scale})` }} className="editor__viewport-modules-scaler">
                <ModuleViewport
                  onSelect={(moduleData) => setSelected(moduleData)}
                  selected={selected && selected.id}
                  showModulesBoundaries={true}
                  items={modulesData}
                />
              </div>
            </div>
            <div className="editor__viewport-footer">
              <ScaleRange value={scale} onChange={(scale) => setScale(scale)} />
            </div>
          </div>

          {/* <Panel className="editor__panel editor__panel--right">
            <PanelSection title="Module properties">
              {selected ? <>
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
              </> : null}
            </PanelSection>
          </Panel> */}

          <ModuleLibraryModal
            onSelect={handleModuleLibraryModalSelect}
            onClose={handleModuleLibraryModalClose}
            open={isModuleLibraryModalOpen}
          />
        </div>
      ) : <ModuleViewport items={modulesData} />}
    </div>
  </div>

}

export default Editor;


export const getServerSideProps: GetServerSideProps = async () => {
  let modules: ModuleData[] = [];

  try {
    const resData = (await api.module.getAll()).data;

    if (resData.data) {
      modules = resData.data
    }
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      largestModuleId: 0,
      modules
    }
  }
}