import Modal, { ModalContent, ModalDialog, ModalHeader, ModalProps } from '@components/common/Modal'
import React, { FC, useMemo } from 'react'
import { useForm } from 'react-hook-form';

import cloneDeep from "lodash/cloneDeep"

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Form, { FromControl } from '@components/common/Form';
import Input from '@components/common/Input';
import { useApi } from '@contexts/ApiProvider';

import * as data from "@data/index"
import { useEditor, useEditorState } from './Editor';

interface FormFields {
  url: string;
  title: string;
  templateId: string;
}

const schema = yup.object().shape({
  url: yup.string().required().matches(/^((\/([a-z0-9-_])+)+|\/)$/),
  title: yup.string().required(),
  templateId: yup.string()
});

interface EditorCreatePageModalProps { }
const EditorCreatePageModal = ({ }: EditorCreatePageModalProps) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormFields>({
    resolver: yupResolver(schema)
  });
  const editorState = useEditorState();
  const editor = useEditor();
  const api = useApi();

  const onSubmit = ({ title, url, templateId }: FormFields) => {
    const template = data.templates.find(template => template.id === templateId);
    let modules: ModuleData[] = [];

    if (template?.modules) {
      modules = template.modules.map(moduleData => cloneDeep(moduleData))
    }

    const newPage: PageData = {
      id: Date.now().toString(),
      title,
      url,
      modules
    }

    reset();

    editor.closeCreatePageModal();
    editor.addPage(newPage)

    // api.services.page.create(data).then(result => {
    //   if (result.success === 1) {
    //     onClose();
    //     onAdd(result.data);
    //   }
    // });
  }

  const formControls: {
    label: string;
    name: keyof FormFields,
  }[] = [{
    label: "Url",
    name: "url",
  },
  {
    label: "Title",
    name: "title",
  }]

  const templatesOptions = useMemo(() => {
    return [{ value: "", label: "none" }, ...data.templates.map(template => ({ value: template.id, label: template.name }))]
  }, []);


  return (
    <Modal className="editor-create-page-modal" open={editorState.isCreatePageModalOpen} onClose={editor.closeCreatePageModal}>
      <ModalDialog>
        <ModalHeader className="editor-create-page-modal__header" onClose={editor.closeCreatePageModal} title="Add page" subtitle="Add new page" />

        <ModalContent className="editor-create-page-modal__content">
          <Form className="editor-create-page-modal__form" onSubmit={handleSubmit(onSubmit)}>
            {formControls.map((formControl, i) => {
              return <FromControl key={i} label={formControl.label} error={errors[formControl.name]?.message}>
                <Input inputType="text" {...register(formControl.name)} />
              </FromControl>
            })}

            <FromControl label="Template" error={errors["templateId"]?.message}>
              <Input
                options={templatesOptions}
                {...register("templateId")}
                inputType="select"
              />
            </FromControl>

            <button className="editor-create-page-modal__submit-btn button button--solid" type="submit">
              Create
            </button>
          </Form>
        </ModalContent>
      </ModalDialog>
    </Modal>
  )
}

export default EditorCreatePageModal
