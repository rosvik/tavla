import React from 'react'

import copy from 'copy-to-clipboard'

import { useToast } from '@entur/alert'
import { IconButton } from '@entur/button'
import { LinkIcon } from '@entur/icons'
import { Tooltip } from '@entur/tooltip'

export const BoardLink = ({ boardID }: Props): JSX.Element => {
    const { addToast } = useToast()

    return (
        <div className="share-page__link">
            <Tooltip placement="bottom-right" content="Kopier lenke">
                <IconButton
                    onClick={() => {
                        copy(`${window.location.host}/t/${boardID}`)
                        addToast({
                            title: 'Kopiert',
                            content:
                                'Linken har nå blitt kopiert til din utklippstavle.',
                            variant: 'success',
                        })
                    }}
                    style={{ marginLeft: '-8px' }}
                >
                    <LinkIcon className="share-page__link__icon" />
                    <span className="share-page__link__description">
                        {`${window.location.host}/t/${boardID}`}
                    </span>
                </IconButton>
            </Tooltip>
        </div>
    )
}

interface Props {
    boardID: string
}

export default BoardLink
