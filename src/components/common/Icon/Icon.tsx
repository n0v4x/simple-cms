import React from 'react';
import { Plus } from "react-feather";

const icons = {
  "plus": Plus
}

interface IconProps {
  name: keyof typeof icons
}

const Icon = ({ name }: IconProps) => {
  const SpecificIcon = icons[name];

  return <SpecificIcon size="1em" />
}

export default Icon
