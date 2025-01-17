import React, { useMemo } from 'react'
import { Marker } from 'react-map-gl'
import classNames from 'classnames'
import { uniq } from 'lodash'
import { colors } from '@entur/tokens'
import { useStopPlaceWithEstimatedCalls } from '../../../logic/use-stop-place-with-estimated-calls/useStopPlaceWithEstimatedCalls'
import { getIconColor } from '../../../utils/icon'
import { WalkTrip } from '../../WalkTrip/WalkTrip'
import { TransportModeIcon } from '../../TransportModeIcon/TransportModeIcon'
import { IconColorType } from '../../../types'
import classes from './StopPlaceMarker.module.scss'

interface Props {
    stopPlaceId: string
    className?: string
}

const StopPlaceMarker: React.FC<Props> = ({ className, stopPlaceId }) => {
    const { stopPlaceWithEstimatedCalls, loading } =
        useStopPlaceWithEstimatedCalls({ stopPlaceId })

    const uniqueTransportMode = useMemo(
        () =>
            uniq(
                stopPlaceWithEstimatedCalls?.estimatedCalls.map(
                    (ec) => ec.serviceJourney.journeyPattern.line.transportMode,
                ),
            ),
        [stopPlaceWithEstimatedCalls?.estimatedCalls],
    )

    if (!stopPlaceWithEstimatedCalls || loading) return null

    return (
        <Marker
            latitude={stopPlaceWithEstimatedCalls.latitude}
            longitude={stopPlaceWithEstimatedCalls.longitude}
            offsetLeft={-50}
            offsetTop={-10}
            className={classNames(classes.StopPlaceMarker, className)}
        >
            <div className={classes.StopPlaceTag}>
                <div className={classes.IconRow}>
                    {uniqueTransportMode.map((transportMode) => (
                        <div
                            key={transportMode}
                            className={classes.Icon}
                            style={{
                                backgroundColor: getIconColor(
                                    transportMode,
                                    IconColorType.DEFAULT,
                                    undefined,
                                ),
                            }}
                        >
                            <TransportModeIcon
                                transportMode={transportMode}
                                color={colors.brand.white}
                            />
                        </div>
                    ))}
                </div>
                <div className={classes.StopPlace}>
                    {stopPlaceWithEstimatedCalls.name}
                </div>
                <WalkTrip
                    className={classes.WalkingDistance}
                    coordinates={{
                        longitude: stopPlaceWithEstimatedCalls.longitude,
                        latitude: stopPlaceWithEstimatedCalls.latitude,
                    }}
                />
            </div>
        </Marker>
    )
}

export { StopPlaceMarker }
