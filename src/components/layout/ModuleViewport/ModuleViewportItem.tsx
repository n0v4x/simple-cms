import { MouseEventHandler, ReactNode, useMemo } from "react";
import classNames from "classnames";
import { ModuleViewportGeneralProps } from "./ModuleViewport";
import useModule from "@hooks/useModule";
import { cloneDeep } from "lodash";
import { useModuleProperties } from "@hooks/useModuleProperties";
import ModuleBox from "@components/common/ModuleBox";

interface ModuleViewportItemProps extends ModuleViewportGeneralProps {
  item: ModuleData,
  level: number,
  children?: ReactNode;
  isSelected?: boolean;
  hasChildren?: boolean;
}

const ModuleItem = ({ item, children, showModulesBoundaries, level, isSelected, onSelect, hasChildren, isEditorMode }: ModuleViewportItemProps) => {
  const module = useModule(item.module.id);

  if (!module) {
    return null;
  }

  const properties = useModuleProperties(item);

  const Component = module.component;

  if (!showModulesBoundaries) {
    return <Component properties={properties}>
      {children}
    </Component>
  }

  return (<Component data-module-id={module.id} isEditorMode={isEditorMode} id={`${module.id}-${item.id}`} className={classNames("module", `module--type-${module.id}`, {
    "is-selected": isSelected,
    "show-box-model": hasChildren
  })} properties={properties}>
    <ModuleBox module={module} isSelected={isSelected} />
    {children}
  </Component>)
}

export default ModuleItem;