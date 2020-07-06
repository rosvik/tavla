import React, { Dispatch, SetStateAction } from 'react'

import { GridContainer, GridItem } from '@entur/grid'
import { PrimaryButton } from '@entur/button'
import { Heading3, Paragraph } from '@entur/typography'

import { ModalType } from '../.'

import Check from '../../../../assets/images/check.png'
import retinaCheck from '../../../../assets/images/check@2x.png'

export interface UserResetPassword {
    email: string
}

interface Props {
    setModalType: Dispatch<SetStateAction<ModalType>>
}

const ResetPassword = ({ setModalType }: Props): JSX.Element => {
    return (
        <>
            <div className="centered">
                <img src={Check} srcSet={`${retinaCheck} 2x`} />
            </div>
            <Heading3 margin="none">Sjekk e-posten din!</Heading3>
            <Paragraph>
                Hvis du har en profil hos oss, så har vi sendt deg en e-post
                hvor du kan endre ditt passord.
            </Paragraph>
            <GridContainer spacing="medium">
                <GridItem small={12}>
                    <PrimaryButton
                        width="fluid"
                        type="submit"
                        onClick={(): void => setModalType('LoginEmailModal')}
                        className="modal-submit"
                    >
                        Logg inn
                    </PrimaryButton>
                </GridItem>
            </GridContainer>
        </>
    )
}

export default ResetPassword
