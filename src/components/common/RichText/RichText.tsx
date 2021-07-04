import React, { memo, useEffect, useState } from "react";

// Components
import { EditorState, convertToRaw, ContentState, RawDraftContentState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import "./WYSIWYG.scss";

export interface RichTextProps {
  onChange: (value: RawDraftContentState) => void;
  initialState: RawDraftContentState
}

const RichText = ({ onChange, initialState }: RichTextProps) => {
  const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(initialState)));
  const onEditorStateChange = (editorState: EditorState) => {

    onChange(convertToRaw(editorState.getCurrentContent()));
  };


  return <div className="rich-text">
    <Editor
      editorState={editorState}
      wrapperClassName="rich-text__wrapper"
      editorClassName="rich-text__editor"
      onEditorStateChange={onEditorStateChange}
    />
  </div>
};

export default memo(RichText);
