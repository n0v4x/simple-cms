import { memo, MutableRefObject, ReactNode, useMemo, useState } from "react";
import classNames from "classnames";
import { ModuleHierarchyGeneralProps } from "./ModuleHierarchy";

import { MoreHorizontal, MoreVertical, Plus, ChevronDown, Trash } from "react-feather";
import useModule from "@hooks/useModule";
import PopupMenu from "@components/common/PopupMenu";
import Icon from "@components/common/Icon";
import Menu from "@components/common/Menu";


interface ModuleHierarchyItemProps {
  level: number;
  item: ModuleData;
  children?: ReactNode;
  isSelected?: boolean;
  hasChildren?: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onAdd: () => void;
}

const ModuleHierarchyItem = ({ item, level, children, isSelected, hasChildren, onAdd, onDelete, onSelect }: ModuleHierarchyItemProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPopupMenuActive, setIsPopupMenuActive] = useState(false);
  const module = useModule(item.module.id);

  if (!module) {
    return null;
  }

  const handleCollapse = () => {
    setIsCollapsed(oldState => !oldState);
  }

  const headerStyle = useMemo(() => {
    return {
      paddingLeft: 10 * (level + 1)
    }
  }, [level]);

  return <li className={classNames(
    "module-hierarchy-item",
    {
      "is-selected": isSelected,
      "is-collapsed": isCollapsed,
      "has-children": hasChildren
    }
  )}>
    <div className="module-hierarchy-item__inner">
      <div onClick={onSelect} draggable style={headerStyle} className="module-hierarchy-item__header">
        <div className="module-hierarchy-item__header-inner">

          <div className="module-hierarchy-item__header-left">
            {hasChildren && <button onClick={handleCollapse} className="button module-hierarchy-item__collapse-btn">
              <ChevronDown size="1em" />
            </button>}
          </div>
          <div className="module-hierarchy-item__meta">
            <p className="module-hierarchy-item__id">
              {`${module.id}-${item.id}`}
            </p>
            <p className="module-hierarchy-item__name">
              {module.name}
            </p>
          </div>

          {/* <div className="module-hierarchy-item__control-list">
            <button onClick={() => setIsPopupMenuActive((oldState) => !oldState)} className="button">
              <MoreVertical size="1em" />
            </button>
            <PopupMenu className="module-hierarchy-item__popup-menu" onClick={(id) => console.log("id")} show={true} items={[{ id: "add", label: "Add" }, { id: "delete", label: "Delete" }]} />
          </div> */}
          {/* <div className="module-hierarchy-item__popup">
            <button className="button module-hierarchy-item__popup-btn">
              <Icon name="more-vertical" />
            </button>

            <Menu onSelect={() => { }} popup items={[{ id: "delete", label: "Delete" }, { id: "add", label: "Add" }]} />
          </div> */}
          <ul className="module-hierarchy-item__control-list list">
            <li className="module-hierarchy-item__control-item">
              <button onClick={onDelete} className="button">
                <Trash size="1em" />
              </button>
            </li>
            {module.hasChildren && <li className="module-hierarchy-item__control-item">
              <button onClick={onAdd} className="button">
                <Plus size="1em" />
              </button>
            </li>}
          </ul>
        </div>
      </div>
      {hasChildren && <div className="module-hierarchy-item__body">
        {children}
      </div>}
    </div>
  </li>
}

export default memo(ModuleHierarchyItem);