import background, { ModulePropertyBackgroundData } from "@module-system/properties/background";
import { CSSProperties, ReactNode, useEffect, useMemo } from "react"
import classNames from "classnames";
import properties from "./properties";
import styled, { css } from 'styled-components'


interface HeaderProps extends ModuleProps<ModulePropsProperties<typeof properties>> {

}

const StyledHeader = styled.header<Pick<HeaderProps, "isEditorMode">>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
`;

const Header = ({ children, properties, className, isEditorMode, id }: HeaderProps) => {
  const styles = useMemo(() => {
    const overlay: CSSProperties = {
      opacity: properties.backgroundOverlay.opacity,
      backgroundColor: properties.backgroundOverlay.color
    }

    return {
      overlay
    }
  }, [properties]);

  return <StyledHeader isEditorMode={isEditorMode} id={id}>
    <div style={styles.overlay} className="overlay" />
    <div className="header__inner">
      {children}
    </div>
  </StyledHeader>
}

export default Header;