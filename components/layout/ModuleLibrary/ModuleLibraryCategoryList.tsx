import ModuleLibraryModuleList from "./ModuleLibraryModuleList"

interface ModuleLibraryCategoryListProps {
  modulesByCategory: {
    category: string;
    modules: Module[]
  }[];
  selectedCategoryIndex?: number;
  selectedModuleIndex?: number;
  onSelect: (categoryIndex: number, moduleIndex: number) => void;
}

const ModuleLibraryCategoryList = ({ modulesByCategory, selectedModuleIndex, selectedCategoryIndex, onSelect }: ModuleLibraryCategoryListProps) => {
  const getModuleClickHandler = (categoryIndex: number, moduleIndex: number) => () => {
    onSelect(categoryIndex, moduleIndex);
  }

  return <ul className="module-library__category-list list">
    {modulesByCategory.map(({ category, modules }, categoryIndex) => {
      return <li key={categoryIndex} className="module-library-category module-library__category">
        <div className="module-library-category__header">
          <h2 className="module-library-category__title">
            {category}
          </h2>
        </div>

        <div className="module-library-category__body">
          {/* <ModuleLibraryModuleList modules={modules} selectedIndex={selectedModuleIndex} /> */}
        </div>
      </li>
    })}
  </ul>
}

export default ModuleLibraryCategoryList;
