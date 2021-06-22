import React, { useCallback, useEffect, useMemo } from 'react'
import Panel, { PanelBody, PanelFooter, PanelHeader } from "@components/common/Panel"
import { useEditor, useEditorState } from './Editor'
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Form, { FromControl } from '@components/common/Form';
import Input, { InputConfigType } from '@components/common/Input/Input';
import Icon from '@components/common/Icon';
import classNames from 'classnames';

interface EditorPagePropertiesPanelProps {

}


interface PagePropertiesFields {
  url: string;
  title: string;
}

interface PropertiesFields {
  [key: string]: any;
}

interface Property {
  label: string;
  // options: RegisterOptions
  input: InputConfigType;
}

type Properties<PF extends PropertiesFields = PropertiesFields> = {
  [key in keyof PF]: Property;
};


const properties: Properties<PagePropertiesFields> = {
  url: {
    label: "Url",
    input: {
      inputType: "text",
    }
  },
  title: {
    label: "Title",
    input: {
      inputType: "text",
    }
  }
}

const EditorPagePropertiesPanel = (props: EditorPagePropertiesPanelProps) => {
  const editor = useEditor();
  const editorState = useEditorState();
  const yupSchema = useMemo(() => {
    const schema = yup.object().shape({
      url: yup
        .string()
        .required()
        .matches(/^(\/([a-z0-9-_])+)+$/)
        .not(["/administrator"]),
      title: yup.string().required(),
    });
    return schema
  }, []);
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    control,
    watch,
    reset,
    formState: { errors, isValid, isSubmitted, isDirty },
  } = useForm<PagePropertiesFields>({
    // resolver: yupResolver(yupSchema),
    // shouldUseNativeValidation: true
  });
  const watchedFields = watch();

  const defaultValues = useMemo(() => {
    const result: PagePropertiesFields = { url: "", title: "" };

    if (editorState.selectedPage) {
      for (const name in properties) {
        const value = editorState.selectedPage[name as keyof PagePropertiesFields];

        if (value !== undefined) {
          result[name as keyof PagePropertiesFields] = value;
        }
      }
    }

    return result;
  }, [editorState.selectedPageId]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);


  const submitHandler: SubmitHandler<PagePropertiesFields> = useCallback((data) => {
    if (editorState.selectedPageId) {
      editor.updatePage(editorState.selectedPageId, data);
    }
  }, [editorState.selectedPageId]);

  const submit = useMemo(() => handleSubmit(submitHandler), [submitHandler]);

  useEffect(() => {
    if (isDirty && isValid) {
      console.log(editorState.selectedPageId);
      submit();
      reset(watchedFields);
    }
  }, [watchedFields]);

  const notAvailableUrls = useMemo(() => {
    const result = ["/administrator"];

    editorState.pages.forEach(page => {
      if (page.id !== editorState.selectedPageId) {
        result.push(page.url);
      }
    })

    return result;
  }, [editorState.selectedPageId]);

  return (
    <Panel>
      <PanelHeader>
        <span className="title u-nowrap">Page properties</span>
        <span className="separator separator--row" />
      </PanelHeader>
      <PanelBody>
        <Form onSubmit={submit}>
          <FromControl
            label={"Url"}
            error={errors["url"]?.message}
          >
            <Input inputType="text" {...register("url", {
              required: "Required field",
              pattern: {
                value: /^(\/|(\/([a-z0-9-_])+)+)$/,
                message: "Not valid url"
              },
              validate: {
                uniqueUrl: (value) => notAvailableUrls.indexOf(value) === -1 || "Should be unique"
              }
            })} />
          </FromControl>
          <FromControl
            label={"Title"}
            error={errors["title"]?.message}
          >
            <Input inputType="text" {...register("title", {
              required: "Required field"
            })} />
          </FromControl>
          {/* {Object.entries(properties).map(([name, config]) => {
            return (
              <FromControl
                key={name}
                label={config.label}
                error={errors[name as keyof PagePropertiesFields]?.message}
              >
                <Input {...config.input} {...register(name as keyof PagePropertiesFields, {})} />
              </FromControl>
            );
          })} */}
        </Form>
      </PanelBody>
    </Panel>
  )
}

export default EditorPagePropertiesPanel
