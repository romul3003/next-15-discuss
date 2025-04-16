'use client'

import { ReactNode } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'

interface ProvidersProps {
  children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  )
}

export default Providers
