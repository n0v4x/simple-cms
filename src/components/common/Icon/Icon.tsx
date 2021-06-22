import React from 'react';
import { MoreVertical, Plus, Save } from "react-feather";

const icons = {
  "plus": Plus,
  "more-vertical": MoreVertical,
  "save": Save
}

interface IconProps {
  name: keyof typeof icons,
}

const Icon = ({ name }: IconProps) => {
  const SpecificIcon = icons[name];

  return <SpecificIcon size="1em" />
}

export default Icon
