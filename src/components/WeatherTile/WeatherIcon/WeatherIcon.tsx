import React from 'react'
import {
    CloudIcon,
    CloudLightningIcon,
    CloudRainIcon,
    CloudSnowIcon,
    SunCloudIcon,
    SunCloudRainIcon,
    SunIcon,
} from '@entur/icons'
import classes from './WeatherIcon.module.scss'

const contains = (a: string[], b: string[]): boolean =>
    a.some((v) => b.includes(v))

const getWeatherIconEntur = (APIconName: string): JSX.Element => {
    const stripedAPIIconName = APIconName.replace(
        /heavy|light|showers|_|day|night/g,
        '',
    )
    const weatherConditions = stripedAPIIconName.split('and')

    const cloud = ['cloudy', 'fog']
    const sunCloud = ['fair', 'partlycloudy']
    const rain = ['rain']
    const lightning = ['thunder']
    const snow = ['snow', 'sleet']
    const sunCloudRain = ['rainshowers']
    const sun = ['clearsky']

    if (contains(weatherConditions, lightning)) return <CloudLightningIcon />
    if (contains(weatherConditions, sunCloudRain)) return <SunCloudRainIcon />
    if (contains(weatherConditions, snow)) return <CloudSnowIcon />
    if (contains(weatherConditions, rain)) return <CloudRainIcon />
    if (contains(weatherConditions, sunCloud)) return <SunCloudIcon />
    if (contains(weatherConditions, cloud)) return <CloudIcon />
    if (contains(weatherConditions, sun))
        return <SunIcon className={classes.Sun} />
    return <div>?</div>
}

interface WeatherIconProps {
    symbolCode?: string
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ symbolCode }) => (
    <div>
        {symbolCode ? (
            <div className={classes.WeatherIcon}>
                {getWeatherIconEntur(symbolCode)}
            </div>
        ) : (
            '…'
        )}
    </div>
)

export { WeatherIcon }
