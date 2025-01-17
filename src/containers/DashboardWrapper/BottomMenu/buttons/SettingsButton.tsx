import React, { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ConfigurationIcon } from '@entur/icons'
import { MenuButton } from '../MenuButton/MenuButton'
import { useSettings } from '../../../../settings/SettingsProvider'
import { useUser } from '../../../../UserProvider'

const SettingsButton = () => {
    const [settings] = useSettings()
    const navigate = useNavigate()
    const user = useUser()

    const { documentId } = useParams<{ documentId: string }>()

    const onSettingsButtonClick = useCallback(() => {
        navigate(`/admin/${documentId}`)
    }, [documentId, navigate])

    if (settings.owners.length > 0) {
        if (!user) return null
        if (!settings.owners.includes(user.uid)) return null
    }

    return (
        <MenuButton
            title="Rediger"
            icon={<ConfigurationIcon size={21} />}
            callback={onSettingsButtonClick}
        />
    )
}

export { SettingsButton }
