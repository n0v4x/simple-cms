import { MouseEventHandler, ReactNode } from "react";
import classNames from "classnames";
import { ModuleViewportGeneralProps } from "./ModuleViewport";
import useModule from "@hooks/useModule";

interface ModuleViewportItemProps extends ModuleViewportGeneralProps {
  item: ModuleData,
  level: number,
  children?: ReactNode;
  isSelected?: boolean;
  hasChildren?: boolean;
}

const ModuleItem = ({ item, children, showModulesBoundaries, level, isSelected, onSelect, hasChildren }: ModuleViewportItemProps) => {
  const module = useModule(item.module.id);

  if (!module) {
    return null;
  }

  const Component = module.component;

  if (!showModulesBoundaries) {
    return <Component properties={item.module.properties}>
      {children}
    </Component>
  }

  const handleSelect: MouseEventHandler<HTMLDivElement> = (e) => {
    if (onSelect) {
      onSelect(item);

      e.stopPropagation();
    }
  }

  return <div onClick={handleSelect} className={classNames("module", `module--type-${module.id}`, {
    "is-selected": isSelected,
    "show-box-model": hasChildren
  })}>
    <div className="module__inner">
      <header className="module__header">
        <p className="module__title">
          {module.name}
        </p>
      </header>
      <div className="module__body">
        <Component id={`${module.id}-${item.id}`} className="module__layout" properties={item.module.properties}>
          <div className={classNames("module__layout-content", { "is-empty": !hasChildren })}>
            {hasChildren ? children : "empty"}
          </div>
        </Component>
      </div>
    </div>
  </div>
}

export default ModuleItem;