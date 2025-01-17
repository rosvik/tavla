import React from 'react'
import classNames from 'classnames'
import { Tooltip } from '@entur/tooltip'
import { colors } from '@entur/tokens'
import { IconColorType } from '../../../types'
import { RealtimeVehicle } from '../../../logic/use-realtime-vehicle-data/types'
import { useSettings } from '../../../settings/SettingsProvider'
import { getIconColor } from '../../../utils/icon'
import {
    Mode,
    TransportMode,
} from '../../../../graphql-generated/journey-planner-v3'
import { TooltipContent } from './TooltipContent/TooltipContent'
import classes from './RealtimeVehicleTag.module.scss'

interface RealtimeVehicleTagProps {
    realtimeVehicle: RealtimeVehicle
    setHoveredVehicle: (realtimeVehicle: RealtimeVehicle | undefined) => void
    isHovered: boolean
}

const RealtimeVehicleTag = ({
    realtimeVehicle,
    setHoveredVehicle,
    isHovered,
}: RealtimeVehicleTagProps): JSX.Element => {
    const [settings, setSettings] = useSettings()

    return (
        <Tooltip
            placement="top"
            content={<TooltipContent realtimeVehicle={realtimeVehicle} />}
            className={classNames(classes.Tooltip, {
                [classes.Visible]: isHovered,
            })}
            disableHoverListener={true}
            isOpen={true}
            showCloseButton={false}
        >
            <div
                className={classes.CircleOuter}
                onMouseEnter={() => setHoveredVehicle(realtimeVehicle)}
                onMouseLeave={() => setHoveredVehicle(undefined)}
                style={
                    realtimeVehicle.active
                        ? { backgroundColor: 'white' }
                        : { backgroundColor: colors.greys.grey30 }
                }
                onClick={() => {
                    if (
                        settings.permanentlyVisibleRoutesInMap
                            .map((drawableRoute) => drawableRoute.lineRef)
                            .includes(realtimeVehicle.line.lineRef)
                    ) {
                        setSettings({
                            permanentlyVisibleRoutesInMap:
                                settings.permanentlyVisibleRoutesInMap.filter(
                                    ({ lineRef }) =>
                                        lineRef !==
                                        realtimeVehicle.line.lineRef,
                                ),
                        })
                    } else {
                        if (realtimeVehicle.line.pointsOnLink)
                            setSettings({
                                permanentlyVisibleRoutesInMap: [
                                    ...settings.permanentlyVisibleRoutesInMap,
                                    {
                                        pointsOnLink:
                                            realtimeVehicle.line.pointsOnLink,
                                        mode: realtimeVehicle.mode,
                                        lineRef: realtimeVehicle.line.lineRef,
                                    },
                                ],
                            })
                    }
                }}
            >
                <div
                    className={classes.CircleInner}
                    style={
                        realtimeVehicle.active
                            ? {
                                  backgroundColor: getIconColor(
                                      realtimeVehicle.mode.toLowerCase() as
                                          | TransportMode
                                          | Mode
                                          | 'ferry',
                                      IconColorType.DEFAULT,
                                      undefined,
                                  ),
                              }
                            : { backgroundColor: colors.greys.grey30 }
                    }
                >
                    {realtimeVehicle.line.publicCode}
                </div>
            </div>
        </Tooltip>
    )
}

export { RealtimeVehicleTag }
