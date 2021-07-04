import properties from "./properties";
import styled, { css } from "styled-components";

interface SectionProps extends ModuleProps<ModulePropsProperties<typeof properties>> {

}

const StyledSection = styled.section<{ properties: ModulePropsProperties<typeof properties> }>`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  position: relative;

  ${({ properties }) => {
    const { height, backgroundImage } = properties;

    return css`
      height: ${height};
      background-image: url(${backgroundImage.src});
      background-size: ${backgroundImage.size};
      background-attachment: ${backgroundImage.attachment};
    `
  }}
`

const StyledSectionOverlay = styled.section<{ properties: ModulePropsProperties<typeof properties> }>`
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;

  ${({ properties }) => {
    const { backgroundOverlay } = properties;

    return css`
      background-color: ${backgroundOverlay.color};
      opacity: ${backgroundOverlay.opacity};
    `
  }}
`

const Section = ({ children, ...otherProps }: SectionProps) => {
  return <StyledSection {...otherProps}>
    <StyledSectionOverlay properties={otherProps.properties} />
    {children}
  </StyledSection>
}

export default Section;