import React from 'react'
import QRCode from 'react-qr-code'
import { colors } from '@entur/tokens'
import { Paragraph } from '@entur/typography'
import { CustomTile, Theme } from '../../types'
import { useSettings } from '../../settings/SettingsProvider'
import classes from './QRBox.module.scss'

const QRBox = ({ sourceUrl, description }: CustomTile): JSX.Element => {
    const [settings] = useSettings()

    return (
        <div className={classes.Wrapper}>
            <div className={classes.Code}>
                <QRCode
                    value={sourceUrl}
                    size={80}
                    fgColor={
                        settings.theme !== Theme.DARK
                            ? colors.brand.blue
                            : 'black'
                    }
                    level="L"
                ></QRCode>
            </div>
            {description && (
                <Paragraph className={classes.Description}>
                    {description}
                </Paragraph>
            )}
        </div>
    )
}

export { QRBox }