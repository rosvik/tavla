import { compareAsc, differenceInMinutes, format, parseISO } from 'date-fns'
import {
    TransportMode,
    TransportSubmode,
} from '../../../graphql-generated/journey-planner-v3'
import { Settings } from '../../settings/settings'
import { EstimatedCall } from './types'

interface Departure {
    id: string
    expectedDepartureTime: EstimatedCall['expectedDepartureTime']
    transportMode: TransportMode
    transportSubmode: TransportSubmode
    time: string
    departureTime: Date
    publicCode: string
    frontText: string
    route: string
    situations: EstimatedCall['situations']
    cancellation: boolean
    quay: EstimatedCall['quay']
}

function formatTime(minDiff: number, departureTime: Date): string {
    if (minDiff > 15) return format(departureTime, 'HH:mm')
    return minDiff < 1 ? 'Nå' : `${minDiff} min`
}

/**
 * Map EstimatedCall to Departure. Departure is similar to the old LineData-type.
 * @param estimatedCall
 */
function toDeparture(estimatedCall: EstimatedCall): Departure {
    const line = estimatedCall.serviceJourney.journeyPattern.line
    const departureTime = parseISO(estimatedCall.expectedDepartureTime)
    const minuteDiff = differenceInMinutes(departureTime, new Date())

    return {
        id: `${estimatedCall.date}::${estimatedCall.aimedDepartureTime}::${estimatedCall.serviceJourney.id}`,
        expectedDepartureTime: estimatedCall.expectedDepartureTime,
        transportMode: line.transportMode,
        transportSubmode: estimatedCall.serviceJourney.transportSubmode,
        time: formatTime(minuteDiff, departureTime),
        departureTime,
        publicCode: line.publicCode || '',
        frontText: estimatedCall.destinationDisplay.frontText,
        route: `${line.publicCode || ''} ${
            estimatedCall.destinationDisplay.frontText
        }`.trim(),
        situations: estimatedCall.situations,
        cancellation: estimatedCall.cancellation,
        quay: estimatedCall.quay,
    }
}

/**
 * Create higher-order function that filters departures based on settings.hiddenRoutes and settings.hiddenStopModes
 * @param stopPlaceId
 * @param settings
 */
const filterHidden =
    (stopPlaceId: string, settings: Settings) =>
    (departure: Departure): boolean =>
        !settings.hiddenRoutes[stopPlaceId]?.includes(departure.route) &&
        !settings.hiddenStopModes[stopPlaceId]?.includes(
            departure.transportMode,
        )

const byDepartureTime = (a: Departure, b: Departure) =>
    compareAsc(a.departureTime, b.departureTime)

export { toDeparture, filterHidden, byDepartureTime }
export type { Departure }
