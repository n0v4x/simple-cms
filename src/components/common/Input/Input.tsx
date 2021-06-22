// import React, { forwardRef, Ref } from 'react'
// import Checkbox, { CheckboxProps, CheckboxRef } from './Checkbox';
// import Select, { SelectProps, SelectRef } from './Select';
// import TextField, { TextFieldProps, TextFieldRef } from './TextField';

// const inputs = {
//   text: TextField,
//   select: Select,
//   checkbox: Checkbox
// }

// // interface InputPropsType {
// // }

// export type InputTypes = keyof typeof inputs;

// export interface CommonInputProps {
//   inputType: InputTypes
// }

// interface InputTextFiled extends TextFieldProps, CommonInputProps {
//   inputType: "text";
// }

// interface InputSelect extends SelectProps, CommonInputProps {
//   inputType: "select";
// }

// interface InputCheckbox extends CheckboxProps, CommonInputProps {
//   inputType: "checkbox";
// }

// type InputProps = InputTextFiled | InputSelect | InputCheckbox;
// type InputRef = SelectRef | TextFieldRef | CheckboxRef;

// const Input = ({ inputType, ...inputProps }: InputProps, ref: Ref<InputRef>) => {
//   const SpecificInput = inputs[inputType];

//   //@ts-ignore
//   return <SpecificInput ref={ref} {...inputProps} />
// }

// export default forwardRef<InputRef, InputProps>(Input)


import React, { forwardRef, Ref } from 'react'
import Checkbox, { CheckboxProps, CheckboxRef } from './Checkbox';
import ColorPicker, { ColorPickerProps } from './ColorPicker';
import Range, { RangeProps } from './Range';
import Select, { SelectProps, SelectRef } from './Select';
import TextField, { TextFieldProps, TextFieldRef } from './TextField';

const inputs = {
  text: TextField,
  select: Select,
  checkbox: Checkbox,
  color: ColorPicker,
  range: Range
}

export type InputTypes = keyof typeof inputs;

export interface InputConfig {
  inputType: InputTypes
}

interface InputTextFiledConfig extends InputConfig {
  inputType: "text";
}

interface InputSelectConfig extends InputConfig {
  inputType: "select";
  options: SelectProps["options"]
}

interface InputCheckboxConfig extends InputConfig {
  inputType: "checkbox";
}

interface InputColorPickerConfig extends InputConfig {
  inputType: "color";
}

interface InputRangeConfig extends InputConfig, Pick<RangeProps, "min" | "max" | "step"> {
  inputType: "range";
}


export type InputConfigType =
  | InputTextFiledConfig
  | InputSelectConfig
  | InputCheckboxConfig
  | InputColorPickerConfig
  | InputRangeConfig;

interface InputTextFiled extends InputTextFiledConfig, TextFieldProps { }
interface InputSelect extends InputSelectConfig, SelectProps { }
interface InputCheckbox extends InputCheckboxConfig, CheckboxProps { }
interface InputColorPickerProps extends InputColorPickerConfig, ColorPickerProps { }
interface InputRangeProps extends InputRangeConfig, RangeProps { }


type InputProps = InputTextFiled | InputSelect | InputCheckbox | InputColorPickerProps | InputRangeProps;
type InputRef = SelectRef | TextFieldRef | CheckboxRef;

const Input = ({ inputType, ...inputProps }: InputProps, ref: Ref<InputRef>) => {
  const SpecificInput = inputs[inputType];

  return <div className="input">
    {/*//@ts-ignore */}
    <SpecificInput className={`input__${inputType}`} ref={ref} {...inputProps} />
  </div>
}

export default forwardRef<InputRef, InputProps>(Input)