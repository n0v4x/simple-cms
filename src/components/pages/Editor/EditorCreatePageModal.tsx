import Modal, { ModalContent, ModalDialog, ModalHeader, ModalProps } from '@components/common/Modal'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Form, { FromControl } from '@components/common/Form';
import Input from '@components/common/Input';

interface FormFields {
  url: string;
  title: string;
  templateId: string;
}

const schema = yup.object().shape({
  url: yup.string().required().matches(/^(\/([a-z0-9-_])+)+$/),
  title: yup.string().required(),
  templateId: yup.string()
});

interface EditorCreatePageModalProps extends Pick<ModalProps, "open" | "onClose"> {
  templates?: TemplateData[];
  onAdd?: (data: FormFields) => void
}

const EditorCreatePageModal = ({ open, onClose, onAdd: onCreate, templates }: EditorCreatePageModalProps) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormFields>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: FormFields) => {
    if (onCreate) {
      onClose();
      onCreate(data);
      reset();
    }
  }

  const formControls: {
    label: string;
    name: keyof FormFields,
    component: typeof Input
  }[] = [{
    label: "Url",
    name: "url",
    component: Input
  },
  {
    label: "Title",
    name: "title",
    component: Input
  }]

  return (
    <Modal className="editor-create-page-modal" open={open} onClose={onClose}>
      {/* <ModalHeader>

      </ModalHeader> */}
      <ModalDialog>
        <ModalContent>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {formControls.map((formControl, i) => {
              const Component = formControl.component;

              return <FromControl key={i} label={formControl.label} error={errors[formControl.name]?.message}>
                <Component {...register(formControl.name)} />
              </FromControl>
            })}

            <select {...register("templateId")}>
              <option value="">
                none
              </option>
              {templates && templates?.map(template => {
                return <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              })}
            </select>

            {/* <FromControl label="Title" error={errors.title?.message}>
              <Input {...register("title")} />
            </FromControl> */}

            <button type="submit">
              Create
            </button>
          </Form>
        </ModalContent>
      </ModalDialog>
    </Modal>
  )
}

export default EditorCreatePageModal
