import React, { ReactElement } from 'react'
import classNames from "classnames";

interface Props {
  show: boolean;
  items: { id: string, label: string }[];
  onClick: (id: string) => void;
  className?: string;
}

function PopupMenu({ items, onClick, className, show }: Props): ReactElement {
  const handleClick = (id: string) => () => {
    onClick(id);
  }

  return (
    <div className={classNames("popup-menu", { "is-active": show }, className)}>
      <ul className="popup-menu__button-list list">
        {items.map(item => {
          return <li key={item.id} className="popup-menu__button-list-item">
            <button onClick={handleClick(item.id)} className="popup-menu__button button">
              {item.label}
            </button>
          </li>
        })}
      </ul>
    </div>
  )
}

export default PopupMenu
