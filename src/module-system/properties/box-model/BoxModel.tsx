import React, { useState } from 'react'
import { useForm } from "react-hook-form";

interface PropertyProps {
  onChange: (data: any) => void
}

interface Props extends PropertyProps {
}

const BoxModel = ({ onChange }: Props) => {
  const [state, setState] = useState({
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    width: "auto",
    height: "auto",
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    maxWidth: "auto",
    minWidth: "auto"
  });

  return (
    <div>

    </div>
  )
}

export default BoxModel
