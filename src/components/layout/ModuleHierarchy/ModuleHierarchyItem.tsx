import { MutableRefObject, ReactNode, useState } from "react";
import classNames from "classnames";
import { ModuleHierarchyGeneralProps } from "./ModuleHierarchy";

import { MoreHorizontal, Plus, ChevronDown, Trash } from "react-feather";
import useModule from "@hooks/useModule";


interface ModuleHierarchyItemProps extends ModuleHierarchyGeneralProps {
  level: number;
  item: ModuleData;
  children?: ReactNode;
  isSelected?: boolean;
  hasChildren?: boolean;
}

const ModuleHierarchyItem = ({ item, level, children, isSelected, onAction, hasChildren }: ModuleHierarchyItemProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const module = useModule(item.module.id);

  if (!module) {
    return null;
  }

  const getHandler = (type: Parameters<ModuleHierarchyGeneralProps["onAction"]>[0]["type"]) => () => {
    onAction({
      type,
      payload: {
        id: item.id
      }
    })
  }

  const handleCollapseClick = () => {
    setIsCollapsed(oldState => !oldState);
  }

  return <li className={classNames(
    "module-hierarchy-item",
    {
      "is-selected": isSelected,
      "is-collapsed": isCollapsed
    }
  )}>
    <div className="module-hierarchy-item__inner">
      <div onClick={getHandler("select")} style={{ paddingLeft: 10 * (level + 1) }} className="module-hierarchy-item__header">
        <div className="module-hierarchy-item__header-inner">

          <div className="module-hierarchy-item__header-left">
            {hasChildren && <button onClick={handleCollapseClick} className="button module-hierarchy-item__collapse-btn">
              <ChevronDown size="1em" />
            </button>}
          </div>
          <p className="module-hierarchy-item__name">
            {module.name}
          </p>
          <ul className="module-hierarchy-item__control-list list">
            <li className="module-hierarchy-item__control-item">
              <button onClick={getHandler("delete")} className="button">
                <Trash size="1em" />
              </button>
            </li>
            <div className="module-hierarchy-item__control-item">
              <button onClick={getHandler("add")} className="button">
                <Plus size="1em" />
              </button>
            </div>
          </ul>
        </div>
      </div>
      {hasChildren && <div className="module-hierarchy-item__body">
        {children}
      </div>}
    </div>
  </li>
}

export default ModuleHierarchyItem;