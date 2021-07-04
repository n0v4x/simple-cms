import React, { useCallback, useEffect, useMemo } from 'react'
import Panel, { PanelBody, PanelHeader } from "@components/common/Panel"
import { useEditor, useEditorState } from './Editor';
import useModule from '@hooks/useModule';
import Form from '@components/common/Form';
import { FormProvider, useForm } from 'react-hook-form';
import { useModuleProperties } from '@hooks/useModuleProperties';

interface EditorModulePropertiesPanelProps {

}

const EditorModulePropertiesPanel = (props: EditorModulePropertiesPanelProps) => {
  const editorState = useEditorState();
  const editor = useEditor();
  const module = useModule(editorState.selectedModule?.module.id);
  const defaultProperties = useModuleProperties(editorState.selectedModule);

  const formMethods = useForm();
  const watchAllFields = formMethods.watch();

  const submitHandler = useCallback((data: any) => {
    if (editorState.selectedModuleId) {
      editor.updateModuleProperties(editorState.selectedModuleId, data);
    }
  }, [editorState.selectedModuleId]);

  const submit = useMemo(() => formMethods.handleSubmit(submitHandler), [submitHandler]);

  useEffect(() => {
    formMethods.reset(defaultProperties);
  }, [editorState.selectedModule]);

  useEffect(() => {
    let timeoutId: number;

    if (formMethods.formState.isDirty) {
      timeoutId = window.setTimeout(() => {
        formMethods.reset(watchAllFields);
        submit();
      }, 400);
    }

    return () => {
      window.clearTimeout(timeoutId);
    }
  }, [watchAllFields]);

  return (
    <Panel>
      <PanelHeader>
        <span className="title u-nowrap">Module properties</span>
        <span className="separator separator--row" />
      </PanelHeader>
      { module && module.properties && <>
        <PanelBody>
          <FormProvider {...formMethods}>
            <Form onSubmit={submit}>
              {Object.entries(module.properties).map(([id, property]: [string, Property]) => {
                const PropertyComponent = property.component;

                return <PropertyComponent name={id} key={id} />
              })}
            </Form>
          </FormProvider>
        </PanelBody>
      </>}
    </Panel>
  )
}

export default EditorModulePropertiesPanel
