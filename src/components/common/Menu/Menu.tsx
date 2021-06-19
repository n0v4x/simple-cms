import classNames from 'classnames'
import React from 'react'

interface MenuItem {
  id: string;
  label: string;
}

interface MenuProps {
  items: MenuItem[],
  selected?: MenuItem["id"],
  onSelect?: (item: MenuItem["id"]) => void
}

const Menu = ({ items, selected, onSelect }: MenuProps) => {
  return (
    <div className="menu">
      <ul className="menu__list list">
        {items.map(item => {
          return <li
            onClick={onSelect && (() => onSelect(item.id))}
            key={item.id}
            className={classNames("menu__item", { "is-selected": selected && selected === item.id })}
          >
            {item.label}
          </li>
        })}
      </ul>
    </div>
  )
}

export default Menu
