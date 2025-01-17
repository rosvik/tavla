import differenceInSeconds from 'date-fns/differenceInSeconds'
import parseISO from 'date-fns/parseISO'

function timeUntil(time: string): number {
    return differenceInSeconds(parseISO(time), new Date())
}

const getLastUpdated = (lastUpdated: string): number =>
    differenceInSeconds(new Date(), parseISO(lastUpdated))

const DAYS = [
    'søndag',
    'mandag',
    'tirsdag',
    'onsdag',
    'torsdag',
    'fredag',
    'lørdag',
]
const MONTHS = [
    'januar',
    'februar',
    'mars',
    'april',
    'mai',
    'juni',
    'juli',
    'august',
    'september',
    'oktober',
    'november',
    'desember',
]

function createTimeString(date: Date): string {
    const currentYear = new Date().getFullYear()

    const dateString = `${DAYS[date.getDay()]} ${date.getDate()}. ${
        MONTHS[date.getMonth()]
    }`
    const hours = `${date.getHours()}`.padStart(2, '0')
    const minutes = `${date.getMinutes()}`.padStart(2, '0')
    const timeString = `${hours}:${minutes}`
    const yearString =
        currentYear == date.getFullYear() ? '' : `${date.getFullYear()}`
    return `${dateString} ${yearString} ${timeString}`
}

const getFeedbackString = (lastUpdated: number): string => {
    if (lastUpdated < 60) return `${lastUpdated} sekunder siden`
    if (lastUpdated < 120) return '> 1 minutt siden'
    return ` > ${Math.floor(lastUpdated / 60)} minutter siden`
}

export { timeUntil, getLastUpdated, createTimeString, getFeedbackString }
