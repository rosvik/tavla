import type { TravelSwitchProps } from '@entur/form'

function isNotNullOrUndefined<T>(thing: T | undefined | null): thing is T {
    return thing !== undefined && thing !== null
}

const isTransport = (mode: string): mode is TravelSwitchProps['transport'] =>
    [
        'bus',
        'rail',
        'water',
        'air',
        'tram',
        'bike',
        'metro',
        'scooter',
        'airportLinkRail',
        'airportLinkBus',
    ].includes(mode)

export { isNotNullOrUndefined, isTransport }
