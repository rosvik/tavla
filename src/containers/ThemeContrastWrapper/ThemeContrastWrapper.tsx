import React from 'react'
import { Contrast } from '@entur/layout'

interface Props {
    children: React.ReactNode
    useContrast?: boolean
    className?: string
}

const ThemeContrastWrapper = ({
    children,
    useContrast = false,
    className,
}: Props): JSX.Element => {
    if (useContrast) {
        return <Contrast className={className}>{children}</Contrast>
    } else {
        return <div className={className}>{children}</div>
    }
}

export { ThemeContrastWrapper }
