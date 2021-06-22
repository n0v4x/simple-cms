import classNames from 'classnames'
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react'
import Icon from '@components/common/Icon';
import Menu, { MenuItemData, MenuProps } from './Menu'

interface MenuItemProps extends Pick<MenuProps, "onSelect" | "popupMenuItems"> {
  item: MenuItemData;
  isSelected?: boolean;

}

const MenuItem = ({ item, isSelected, popupMenuItems, onSelect }: MenuItemProps) => {
  return (
    <li onClick={(e) => {
      onSelect(item.id);
      e.stopPropagation();
    }} className={classNames("menu__item", {
      // "is-popup-menu-open": isPopupMenuOpen,
      "is-selected": isSelected
    })}>
      <span className="menu__item-label">
        {item.label}
      </span>

      { popupMenuItems ? <span className="menu__item-popup">
        <button className="button button--type-circle menu__item-popup-btn">
          <Icon name="more-vertical" />
        </button>
        <Menu
          popup
          className="menu__item-popup-menu"
          onSelect={(popupMenuItemId: MenuItemData["id"]) => {
            onSelect(item.id, popupMenuItemId);
          }}
          items={popupMenuItems}
        />
      </span> : null}
    </li>
  )
}

export default MenuItem
