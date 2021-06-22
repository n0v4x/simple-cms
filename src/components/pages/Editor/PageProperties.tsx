import Form, { FromControl } from "@components/common/Form";
import Input from "@components/common/Input";
import { InputConfigType, InputTypes } from "@components/common/Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { memo, useEffect, useMemo } from "react";
import {
  DeepMap,
  DeepPartial,
  FieldError,
  Path,
  SubmitHandler,
  UnpackNestedValue,
  useForm,
} from "react-hook-form";
import * as yup from "yup";
import { AnyObject } from "yup/lib/types";

// const schema = yup.object().shape({
//   url: yup
//     .string()
//     .required()
//     .matches(/^(\/([a-z0-9-_])+)+$/)
//     .not(["/administrator"]),
//   title: yup.string().required(),
// });

interface PagePropertiesFields {
  url: string;
  title: string;
  test: boolean;
}

interface Property {
  name: string;
  description?: string;
  validation?: yup.AnySchema;
  input: InputConfigType;
}

interface PropertiesFields {
  [key: string]: any;
}

export type Properties<PF extends PropertiesFields = PropertiesFields> = {
  [key in keyof PF]: Property;
};

export interface PagePropertiesProps<PF extends PropertiesFields> {
  initialValues?: UnpackNestedValue<DeepPartial<PF>>;
  properties: Properties<PF>;
  onChange?: (fields: {
    data: UnpackNestedValue<PF>;
    errors: DeepMap<PF, FieldError>;
  }) => void;
  onSubmit: (fields: UnpackNestedValue<PF>) => void
}

const PageProperties = <PF extends PropertiesFields>({
  initialValues,
  properties,
  onChange,
  onSubmit
}: PagePropertiesProps<PF>) => {
  const resolver = useMemo(() => {
    const validations = Object.entries(properties).reduce(
      (acc, [id, property]) => {
        if (property.validation) {
          acc[id as keyof PF] = property.validation;
        }
        return acc;
      },
      {} as { [key in keyof PF]: yup.AnySchema }
    );

    const schema = yup.object().shape(validations);

    return yupResolver(schema);
  }, [properties]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    watch,
    setValue,
  } = useForm<PF>({
    resolver,
    mode: "onChange",
  });

  const submitHandler: SubmitHandler<PF> = (data) => {
    onSubmit(data);
  };

  useEffect(() => {
    if (initialValues) {
      clearErrors();

      for (const name in properties) {
        const value = initialValues[name];

        if (value !== undefined) {
          setValue(name as any as Path<PF>, value);
        }
      }
    }
  }, [initialValues]);

  // useEffect(() => {
  //   if (Object.keys(errors).length === 0) {
  //     onChange({ data, errors });
  //   }
  // }, [data, errors]);

  const propertiesEntries = useMemo(() => {
    return Object.entries(properties);
  }, [properties]);

  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
      {propertiesEntries.map(([id, config]) => {
        return (
          <FromControl
            key={id}
            label={config.name}
            error={errors[id] && (errors[id] as FieldError).message}
          >
            <Input {...config.input} {...register(id as Path<PF>)} />
          </FromControl>
        );
      })}

      <button type="submit">Save</button>
    </Form>
  );
};

export default PageProperties;
