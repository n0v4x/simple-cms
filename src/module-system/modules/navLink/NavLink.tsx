import background, { ModulePropertyBackgroundData } from "@module-system/properties/background";
import { CSSProperties, ReactNode, useEffect, useMemo } from "react"
import classNames from "classnames";
import properties from "./properties";
import styled, { css } from 'styled-components'
import NavLink from "@components/common/NavLink";


interface NavLinkProps extends ModuleProps<ModulePropsProperties<typeof properties>> {

}

const StyledNavLink = styled.a`
  color: rgba(255, 255, 255, 0.5);
  padding: 15px 0;
  transition: all 0.2s;

  &:hover {
    color: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 0 0 rgba(255, 255, 255, 1);
  }
`

const Component = ({ properties, isEditorMode, children, ...otherProps }: NavLinkProps) => {
  const { link } = properties;

  return <NavLink href={link.href}>
    <StyledNavLink {...otherProps}>
      {link.label}
      {children}
    </StyledNavLink>
  </NavLink>
}

export default Component;