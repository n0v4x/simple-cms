import styled from 'styled-components'
import properties from "./properties";

interface NavLinkProps extends ModuleProps<ModulePropsProperties<typeof properties>> {

}

const StyledNavbar = styled.nav<ModulePropsProperties<typeof properties>>`
  display: grid;
  grid-gap: ${(props) => props.gap};
  grid-auto-flow: column;
  justify-content: ${(props) => props.alignItems.horizontal};
`;

const Component = ({ properties, children, ...otherProps }: NavLinkProps) => {
  return <StyledNavbar {...properties} {...otherProps}>
    {children}
  </StyledNavbar>
}

export default Component;