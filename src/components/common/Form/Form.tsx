import classNames from 'classnames'
import React from 'react'

interface FormProps extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {

}

const Form = ({ className, ...formProps }: FormProps) => {
  return (
    <form className={classNames("form", className)}  {...formProps} />
  )
}

export default Form
