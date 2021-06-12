import classNames from "classnames";

interface ModuleLibraryModuleListProps {
  modules: Module[];
  selectedIndex?: number;
  onSelect: (moduleIndex: number) => void
}

const ModuleLibraryModuleList = ({ modules, selectedIndex, onSelect }: ModuleLibraryModuleListProps) => {
  const getModuleClickHandler = (moduleIndex: number) => () => {
    onSelect(moduleIndex);
  }

  return <ul className="module-library__module-list list">
    {modules.map((module, moduleIndex) => {
      return <li
        key={moduleIndex}
        onClick={getModuleClickHandler(moduleIndex)}
        className={classNames("module-library-module module-library__module", { "is-selected": moduleIndex === selectedIndex })}
      >
        <div className="module-library-module__header">
          <h3 className="module-library-module__name">
            {module.name}
          </h3>
        </div>
      </li>
    })}
  </ul>
}

export default ModuleLibraryModuleList;
