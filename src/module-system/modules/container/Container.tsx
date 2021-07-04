import properties from "./properties";
import styled, { css } from "styled-components";

interface Container extends ModuleProps<ModulePropsProperties<typeof properties>> {
}

const StyledContainer = styled.div<{ properties: ModulePropsProperties<typeof properties> }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 15px;
  max-width: 992px;
  margin: 0 auto; 
  width: 100%;

  ${({ properties }) => css`
    max-width: ${properties.maxWidth};
    justify-content:  ${properties.alignItems.horizontal};
    align-items:  ${properties.alignItems.vertical};
  `}
`

const Container = ({ ...otherProps }: Container) => {
  return <StyledContainer {...otherProps} />
}

export default Container;