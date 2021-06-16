import { useCallback, useMemo, useRef, useState } from 'react'
import { GetStaticProps } from 'next'

import ModuleList from '@components/layout/ModuleList'
import ModuleHierarchy from '@components/layout/ModuleHierarchy'
import Modal from '@components/common/Modal'
import ModalDialog from '@components/common/Modal/ModalDialog'
import ModalHeader from '@components/common/Modal/ModalHeader'
import AddModuleModal from '@components/common/Modal/AddModuleModal'
import Panel, { PanelSection } from '@components/common/Panel'
import ModulePropertyList from '@components/layout/ModulePropertyList'

import { getModules } from 'src/services/modules'

interface HomeProps {
  largestModuleId: number;
  modules: ModuleData[];
}

const Home = ({ modules, largestModuleId }: HomeProps) => {
  const [isAddModuleModalOpen, setIsAddModuleModalOpen] = useState(false);
  const [modulesData, setModulesData] = useState(modules);
  const largestModuleIdRef = useRef(largestModuleId);
  const [selected, setSelected] = useState<ModuleData["id"]>()

  // const [isEditorMode, setIsEditorMode] = useState(true);
  // const selectedRef = useRef<ModuleData>(null)
  // const addModuleCallbackRef = useRef<((newModule: ModuleData) => ModuleData[]) | null>(null);

  // const [selectedModule, setSelectedModule] = useState<ModuleData>();
  // // const module = useModule(selectedModule?.module.id);

  // const handleUpdate = useCallback((updatedModules: ModuleData[]) => {
  //   // console.log(updatedModules);
  //   setState(updatedModules);
  // }, []);

  // const updateModuleProperties = (items: ModuleData[], id: ModuleData["id"], moduleProperties: ModuleProperties): ModuleData[] => {
  //   // for (let i = 0; i < items.length; ++i) {
  //   //   if (items[i].id === id) {
  //   //     items[i] = {
  //   //       ...items[i],
  //   //       module: {
  //   //         ...items[i].module,
  //   //         properties: moduleProperties
  //   //       }
  //   //     }

  //   //     break;
  //   //   } else {
  //   //     if (items[i].children) {
  //   //       items[i].children = updateModuleProperties(items[i].children!, id, moduleProperties);
  //   //     }
  //   //   }
  //   // }

  //   // return items;

  //   return items.map((item) => {
  //     if (item.id === id) {
  //       return {
  //         ...item,
  //         module: {
  //           ...item.module,
  //           properties: moduleProperties
  //         }
  //       }
  //     } else {
  //       if (item.children) {
  //         item.children = updateModuleProperties(item.children, id, moduleProperties);
  //       } else {
  //         return item;
  //       }
  //     }

  //     return item
  //   });
  // }


  // const handleAdd = useCallback((addModule: (newModule: ModuleData) => ModuleData[]) => {
  //   addModuleCallbackRef.current = addModule;
  //   setIsAddModuleModalOpen(true);
  // }, []);

  // const handleDelete = (deleteModule: () => ModuleData[]) => {
  //   setState(deleteModule());
  // }

  // const handleSelect = (module: ModuleData) => {
  //   console.log(module);
  //   setSelectedModule(module)
  // }

  // const handleModalAdd = useCallback((module: Module) => {
  //   if (addModuleCallbackRef.current !== null) {
  //     const newModule: ModuleData = {
  //       id: Date.now().toString(),
  //       module: {
  //         id: module.id
  //       }
  //     }

  //     setState(addModuleCallbackRef.current(newModule));
  //   }

  //   addModuleCallbackRef.current = null
  //   setIsAddModuleModalOpen(false);
  // }, [])

  // const handleModalClose = () => {
  //   // setAddModuleCallback(null);
  //   addModuleCallbackRef.current = null;
  //   setIsAddModuleModalOpen(false)
  // }

  // const handleEditorModeSwitch = () => {
  //   setIsEditorMode((oldState) => !oldState);
  // }

  // const moduleProperties = useMemo(() => {
  //   const result: {
  //     property: ModuleProperty,
  //     data?: any
  //   }[] = [];

  //   if (selectedModule) {
  //     const module = getModule(selectedModule.module.id);

  //     if (module && module.properties) {
  //       const moduleConfigProperties = selectedModule.config?.properties;

  //       module.properties.forEach(property => {
  //         result.push({
  //           property,
  //           data: moduleConfigProperties && moduleConfigProperties[property.id]
  //         })
  //       });
  //     }
  //   }

  //   return result
  // }, [selectedModule]);

  // console.log(state);
  const handleAction = useCallback(({ type, payload }: {
    type: "add" | "select" | "delete",
    payload: {
      id: ModuleData["id"]
    }
  }) => {
    switch (type) {
      case "delete": {
        setModulesData(modulesData.filter(moduleData => moduleData.id !== payload.id));

        break;
      }
      case "select": {
        setSelected(payload.id);

        break;
      }

      case "add": {
        setModulesData(oldState => {
          return [
            ...oldState,
            {
              id: ++largestModuleIdRef.current,
              parentId: payload.id,
              module: {
                id: "section"
              }
            }
          ]
        })

        break;
      }

    }
  }, [modulesData]);

  return (
    <>
      <div className="editor">
        <Panel className="editor__panel editor__panel--left">
          <PanelSection title="Module hierarchy">
            <ModuleHierarchy
              onAction={handleAction}
              items={modulesData}
              selected={selected}
            />
          </PanelSection>
        </Panel>

        <div className="editor__viewport">
          <div className="editor__viewport-menubar">
            {/* <input onChange={handleEditorModeSwitch} className="menu-bar__editor-mode-switch" type="checkbox" checked={isEditorMode} /> */}
          </div>
          <div className="editor__viewport-modules">
            <div className="editor__viewport-modules-inner">
              {/* <ModuleList isEditorMode={isEditorMode} items={state} /> */}
            </div>
          </div>
        </div>

        {/* <Panel className="editor__panel editor__panel--right">
          <PanelSection title="Module properties">
            {selectedModule ? <ModulePropertyList
              data={selectedRef.current?.module.properties || {}}
              properties={module?.properties || {}}
              onChange={(data) => {
                if (selectedRef.current) {
                  console.log(data, selectedRef.current);
                  setState((oldState) => {
                    if (selectedRef.current?.id) {
                      return updateModuleProperties(oldState, selectedRef.current.id, data)
                    } else {
                      return oldState;
                    }
                  });
                  // console.log("update", data, selectedModule);
                  // const updatedItem = {
                  //   ...selectedModule,
                  //   module: {
                  //     id: selectedModule.module.id,
                  //     properties: {
                  //       ...selectedModule.module.properties,
                  //       ...data
                  //     }
                  //   }
                  // }
                  // console.log("updated", updatedItem)
                  // selectedRef.current.update(updatedItem)
                }
              }}
            /> : null}
          </PanelSection>
        </Panel> */}
      </div>
      {/* <AddModuleModal
        onAdd={handleModalAdd}
        onClose={handleModalClose}
        open={isAddModuleModalOpen}
      /> */}
    </>
  )
}

export default Home;

interface Breakpoint {
  name: string,
  breakpoint: number
}

export const getStaticProps: GetStaticProps = async () => {
  // const modules: ModuleData[] = [{
  //   id: "1",
  //   module: {
  //     id: "layout",
  //   },
  //   children: [{
  //     id: "2",
  //     module: {
  //       id: "section",
  //       properties: {
  //         background: {
  //           image: "https://image.isu.pub/170416132554-e415d2b34826378f257ceb78e5881d91/jpg/page_13.jpg",
  //           size: "cover",
  //           fixed: true
  //         },
  //         height: {
  //           height: "100vh"
  //         }
  //       }
  //     },
  //     children: [{
  //       id: "3",
  //       module: {
  //         id: "container",
  //       },
  //       children: [
  //         {
  //           id: "6",
  //           module: {
  //             id: "text",
  //             properties: {
  //               text: {
  //                 text: "<p>Быстрый и простой<p>"
  //               }
  //             }
  //           }
  //         }
  //       ]
  //     }]
  //   },
  //   {
  //     id: "4",
  //     module: {
  //       id: "section",
  //       properties: {
  //         background: {
  //           image: "https://image.isu.pub/170416132554-e415d2b34826378f257ceb78e5881d91/jpg/page_13.jpg",
  //           size: "cover",
  //           fixed: true
  //         },
  //         height: {
  //           height: "100vh"
  //         }
  //       }
  //     },
  //   },
  //   {
  //     id: "5",
  //     module: {
  //       id: "section",
  //       properties: {
  //         background: {
  //           image: "https://image.isu.pub/170416132554-e415d2b34826378f257ceb78e5881d91/jpg/page_13.jpg",
  //           size: "cover",
  //           fixed: true
  //         },
  //         height: {
  //           height: "100vh"
  //         }
  //       }
  //     },
  //   }]
  // }];

  const modules = getModules();
  const moduleWithLargestId = modules.reduce((prev, curr) => {
    return prev.id > curr.id ? prev : curr
  });

  const largestModuleId = moduleWithLargestId ? moduleWithLargestId.id : 0;


  return {
    props: {
      largestModuleId,
      modules
    }
  }
}