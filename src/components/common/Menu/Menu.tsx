import React from 'react'
import classNames from 'classnames'
import MenuItem from "./MenuItem";

export interface MenuItemData {
  id: string;
  label: string;
}

export interface MenuProps {
  className?: string;
  items: MenuItemData[];
  popupMenuItems?: MenuItemData[];
  selected?: MenuItemData["id"] | null;
  popup?: boolean;
  onSelect: (item: MenuItemData["id"], popupItemId?: MenuItemData["id"]) => void;
}

const Menu = ({ items, selected, popupMenuItems, popup, className, onSelect }: MenuProps) => {
  return (
    <div className={classNames("menu", { "menu--type-popup": popup }, className)}>
      <ul className="menu__list list">
        {items.map((item) => {
          return <MenuItem
            isSelected={selected === item.id}
            key={item.id}
            item={item}
            popupMenuItems={popupMenuItems}
            onSelect={onSelect} />
        })}
      </ul>
    </div>
  )
}

export default Menu
