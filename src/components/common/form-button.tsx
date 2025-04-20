'use client'

import { ReactNode } from 'react'
import { Button } from '@nextui-org/react'

interface FormButtonProps {
  children: ReactNode
  isLoading: boolean
}

const FormButton = ({ children, isLoading }: FormButtonProps) => {
  return (
    <Button
      type="submit"
      isLoading={isLoading}
    >
      {children}
    </Button>
  )
}

export default FormButton
