import classNames from "classnames";

interface ModuleLibraryProps {
  modulesByCategory: {
    [category: string]: Module[],
  },
  onSelect: (category: string, moduleIndex: number) => void;
  selected: {
    moduleIndex: number | null,
    category: string | null
  }
}

const ModuleLibrary = ({ modulesByCategory, onSelect, selected }: ModuleLibraryProps) => {
  const getModuleClickHandler = (category: Parameters<ModuleLibraryProps["onSelect"]>[0], moduleIndex: Parameters<ModuleLibraryProps["onSelect"]>[1]) => () => {
    onSelect(category, moduleIndex);
  }

  return <div className="module-library">
    <ul className="module-library__category-list list">
      {Object.entries(modulesByCategory).map(([category, modules], categoryIndex) => {
        return <li key={categoryIndex} className="module-library__category-list-item">
          <div className="module-library__category">
            <div className="module-library__category-header">
              <h3 className="module-library__category-name">
                {category}
              </h3>
            </div>

            <div className="module-library__category-body">
              <ul className="module-library__module-list list">
                {modules.map((module, moduleIndex) => {
                  return <li key={moduleIndex} className="module-library__module-list-item">
                    <button
                      onClick={getModuleClickHandler(category, moduleIndex)}
                      className={classNames(
                        "module-library__module button",
                        {
                          "is-selected": selected.category === category && selected.moduleIndex === moduleIndex
                        }
                      )}>
                      <div className="module-library__module-header">
                        <h4 className="module-library__module-name">
                          {module.name}
                        </h4>
                      </div>
                    </button>
                  </li>
                })}
              </ul>
            </div>
          </div>
        </li>
      })}
    </ul>
  </div>
}

export default ModuleLibrary;