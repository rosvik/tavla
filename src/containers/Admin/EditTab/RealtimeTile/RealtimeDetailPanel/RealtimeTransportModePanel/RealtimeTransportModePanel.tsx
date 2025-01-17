import React, { useCallback, useMemo } from 'react'
import { xor } from 'lodash'
import { ExpandablePanel } from '@entur/expand'
import { TravelSwitch } from '@entur/form'
import { FilterChip } from '@entur/chip'
import { isTransport } from '../../../../../../utils/typeguards'
import { TransportModeIcon } from '../../../../../../components/TransportModeIcon/TransportModeIcon'
import { TransportMode } from '../../../../../../../graphql-generated/journey-planner-v3'
import { Line } from '../../../../../../logic/use-unique-lines/line'
import { useSettings } from '../../../../../../settings/SettingsProvider'
import { transportModeName } from '../transportModeName'
import classes from './RealtimeTransportModePanel.module.scss'

interface Props {
    mode: TransportMode
    realtimeLines: Line[]
}

const RealtimeTransportModePanel: React.FC<Props> = ({
    mode,
    realtimeLines,
}) => {
    const [settings, setSettings] = useSettings()

    const filteredLines = useMemo(
        () => realtimeLines.filter((it) => it.transportMode === mode),
        [mode, realtimeLines],
    )

    const toggleRealtimeDataLineById = useCallback(
        (lineId: string) => () => {
            setSettings({
                hiddenRealtimeDataLineRefs: xor(
                    settings.hiddenRealtimeDataLineRefs,
                    [lineId],
                ),
                hideRealtimeData: false,
            })
        },
        [settings.hiddenRealtimeDataLineRefs, setSettings],
    )

    const toggleRealtimeDataLinesByMode = useCallback(() => {
        setSettings({
            hiddenRealtimeDataLineRefs: xor(
                settings.hiddenRealtimeDataLineRefs,
                filteredLines.map((it) => it.id),
            ),
            hideRealtimeData: false,
        })
    }, [settings.hiddenRealtimeDataLineRefs, setSettings, filteredLines])

    return (
        <div className={classes.RealtimeTransportModePanel}>
            <ExpandablePanel
                title={
                    <div className={classes.Title}>
                        <span className={classes.Name}>
                            {transportModeName(mode)}
                        </span>
                        <span onClick={(e) => e.stopPropagation()}>
                            <TravelSwitch
                                transport={isTransport(mode) ? mode : 'bus'}
                                size="large"
                                checked={filteredLines.some(
                                    ({ id }) =>
                                        !settings.hiddenRealtimeDataLineRefs.includes(
                                            id,
                                        ),
                                )}
                                onChange={toggleRealtimeDataLinesByMode}
                            />
                        </span>
                    </div>
                }
            >
                <div className={classes.Lines}>
                    {filteredLines.map(({ id, publicCode, transportMode }) => (
                        <FilterChip
                            className={classes.FilterChip}
                            key={id}
                            value={id}
                            onChange={toggleRealtimeDataLineById(id)}
                            checked={
                                !settings.hiddenRealtimeDataLineRefs.includes(
                                    id,
                                )
                            }
                        >
                            {publicCode}
                            <TransportModeIcon
                                // Icons from eds don't concatenate classes correctly. Adding a ' ' fixes this.
                                className={' ' + classes.TransportIcon}
                                transportMode={transportMode}
                            />
                        </FilterChip>
                    ))}
                </div>
            </ExpandablePanel>
        </div>
    )
}

export { RealtimeTransportModePanel }
