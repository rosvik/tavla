import React, { Dispatch, SetStateAction } from 'react'
import type { User } from 'firebase/auth'
import { GridContainer, GridItem } from '@entur/grid'
import { PrimaryButton } from '@entur/button'
import { Heading3, Paragraph } from '@entur/typography'
import { CloseButton } from '../../../CloseButton/CloseButton'
import Check from '../../../../assets/images/check.png'
import retinaCheck from '../../../../assets/images/check@2x.png'
import { ModalType } from '../login-modal-types'
import classes from '../../AccountModals.module.scss'

interface EmailSentProps {
    setModalType: Dispatch<SetStateAction<ModalType>>
    onDismiss: (user?: User) => void
}

const EmailSent: React.FC<EmailSentProps> = ({ setModalType, onDismiss }) => {
    const handleClose = (): void => {
        setModalType(ModalType.LoginOptionsModal)
        onDismiss()
    }
    return (
        <>
            <CloseButton onClick={handleClose} />
            <img
                src={Check}
                srcSet={`${retinaCheck} 2x`}
                className={classes.Image}
            />
            <Heading3 margin="none">Sjekk e-posten din!</Heading3>
            <Paragraph className={classes.Paragraph}>
                Hvis du har en profil hos oss, så har vi sendt deg en e-post
                hvor du kan endre ditt passord.
            </Paragraph>
            <GridContainer spacing="medium" className={classes.GridContainer}>
                <GridItem small={12}>
                    <PrimaryButton
                        width="fluid"
                        type="submit"
                        onClick={(): void =>
                            setModalType(ModalType.LoginEmailModal)
                        }
                        className="modal-submit"
                    >
                        Logg inn
                    </PrimaryButton>
                </GridItem>
            </GridContainer>
        </>
    )
}

export { EmailSent }
