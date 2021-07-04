import React, { CSSProperties, useMemo } from 'react'
import classNames from "classnames";
import properties from "./properties";
import styled from 'styled-components';
import draftToHtml from 'draftjs-to-html';

interface TextProps extends ModuleProps<ModulePropsProperties<typeof properties>> {

}

const StyledText = styled.div`

`

const Text = ({ properties, ...otherProps }: TextProps) => {
  // console.log(properties.richText);
  return (
    <StyledText {...otherProps}>
      <div className="text__content" dangerouslySetInnerHTML={{ __html: properties.richText }} />
    </StyledText>
  )
}

export default Text
