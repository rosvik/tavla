import React, { useMemo } from 'react'
import { compareAsc } from 'date-fns'
import classNames from 'classnames'
import { BusIcon } from '@entur/icons'
import { useSettings } from '../../../../settings/SettingsProvider'
import { useBusTileQuery } from '../../../../../graphql-generated/journey-planner-v3'
import { useStopPlaceIds } from '../../../../logic/use-stop-place-ids/useStopPlaceIds'
import { REFRESH_INTERVAL } from '../../../../constants'
import { toDeparture } from '../../../../logic/use-stop-place-with-estimated-calls/departure'
import { isNotNullOrUndefined } from '../../../../utils/typeguards'
import { toStopPlaceWithEstimatedCalls } from '../../../../logic/use-stop-place-with-estimated-calls/types'
import classes from './BusTile.module.scss'

function BusTile(): JSX.Element {
    const { stopPlaceIds, loading: stopPlaceIdsLoading } = useStopPlaceIds()
    const { data } = useBusTileQuery({
        fetchPolicy: 'cache-and-network',
        pollInterval: REFRESH_INTERVAL,
        skip: stopPlaceIdsLoading,
        variables: {
            ids: stopPlaceIds,
        },
    })

    const [settings] = useSettings()
    const onlyBusShowing =
        settings.hiddenModes.includes('sparkesykkel') &&
        settings.hiddenModes.includes('delebil') &&
        settings.hiddenModes.includes('bysykkel')

    const numberOfLines = onlyBusShowing ? 6 : 3

    const busDepartures = useMemo(
        () =>
            data?.stopPlaces
                ?.map(toStopPlaceWithEstimatedCalls)
                .filter(isNotNullOrUndefined)
                .flatMap((stopPlace) =>
                    stopPlace?.estimatedCalls
                        .filter(isNotNullOrUndefined)
                        .map(toDeparture),
                )
                .sort((a, b) => compareAsc(a.departureTime, b.departureTime))
                .slice(0, numberOfLines) ?? [],
        [data?.stopPlaces, numberOfLines],
    )

    const rowClass = classNames(classes.BusTileRow, {
        [classes.BusTileRowOnlyBus]: onlyBusShowing,
    })

    const routeClass = classNames(classes.BusRoute, {
        [classes.BusRouteOnlyBus]: onlyBusShowing,
    })

    return (
        <>
            <div className={classes.NextBus}>Neste buss</div>
            <div className={classes.BusTile}>
                {busDepartures.map((departure) => {
                    const routeNumber = departure.route.split(' ')[0]
                    const routeDestination = departure.route
                        .split(' ')
                        .slice(1)
                        .join(' ')

                    return (
                        <div key={departure.id} className={rowClass}>
                            <div className={routeClass}>
                                <BusIcon className={classes.Icon} />
                                <span>{routeNumber}</span>
                            </div>
                            <p className={classes.Destination}>
                                {routeDestination}
                            </p>
                            <p className={classes.Time}>{departure.time}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export { BusTile }
