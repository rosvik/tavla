import React, { useCallback, useState } from 'react'
import { Link, useLocation, useMatch } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { useToast } from '@entur/alert'
import { TopNavigationItem } from '@entur/menu'
import { GithubIcon, LogOutIcon, PrivacyIcon, UserIcon } from '@entur/icons'
import { Contrast } from '@entur/layout'
import { auth, useUser } from '../../UserProvider'
import { TavlaLogo } from '../../assets/icons/TavlaLogo'
import { LoginModal } from '../../components/AccountModals/LoginModal/LoginModal'
import { LoginCase } from '../../components/AccountModals/LoginModal/login-modal-types'
import { Theme } from '../../types'
import classes from './Navbar.module.scss'

interface NavbarProps {
    theme?: Theme
}

const Navbar: React.FC<NavbarProps> = ({ theme }) => {
    const location = useLocation()
    const [displayLoginModal, setDisplayLoginModal] = useState<boolean>(false)
    const user = useUser()
    const userLoggedIn = user && !user.isAnonymous
    const { addToast } = useToast()
    const onMineTavler = useMatch('/tavler')

    const login = useCallback(
        (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
            event.preventDefault()
            setDisplayLoginModal(true)
        },
        [],
    )

    const logout = useCallback(
        (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
            event.preventDefault()
            signOut(auth)
            setDisplayLoginModal(false)
            addToast({
                title: 'Logget ut',
                content: 'Du er nå logget ut av din konto.',
                variant: 'success',
            })
        },
        [addToast],
    )

    return (
        <Contrast>
            <nav className={classes.Navbar}>
                <div>
                    <Link to="/">
                        <TavlaLogo className={classes.Logo} theme={theme} />
                    </Link>
                </div>
                <div>
                    <ul className={classes.List}>
                        {onMineTavler && userLoggedIn && (
                            <li className={classes.Element}>
                                <TopNavigationItem
                                    className={classes.Link}
                                    onClick={logout}
                                    href="/tavler"
                                >
                                    <span className={classes.Text}>
                                        Logg ut
                                    </span>
                                    <LogOutIcon
                                        className={classes.Icon}
                                        size="20"
                                    />
                                </TopNavigationItem>
                            </li>
                        )}
                        {onMineTavler && !userLoggedIn && (
                            <li className={classes.Element}>
                                <TopNavigationItem
                                    className={classes.Link}
                                    onClick={login}
                                >
                                    <span className={classes.Text}>
                                        Logg inn
                                    </span>
                                    <UserIcon
                                        className={classes.Icon}
                                        size="20"
                                    />
                                </TopNavigationItem>
                            </li>
                        )}
                        {!onMineTavler && (
                            <li className={classes.Element}>
                                <TopNavigationItem
                                    className={classes.Link}
                                    as={Link}
                                    to="/tavler"
                                >
                                    <span className={classes.Text}>
                                        Mine tavler
                                    </span>
                                    <UserIcon
                                        className={classes.Icon}
                                        size="20"
                                    />
                                </TopNavigationItem>
                            </li>
                        )}
                        <li className={classes.Element}>
                            <TopNavigationItem
                                className={classes.Link}
                                as={Link}
                                to="/privacy"
                                active={location.pathname === '/privacy'}
                            >
                                <span className={classes.Text}>Personvern</span>
                                <PrivacyIcon
                                    className={classes.Icon}
                                    size="20"
                                />
                            </TopNavigationItem>
                        </li>
                        <li className={classes.Element}>
                            <TopNavigationItem
                                className={classes.Link}
                                as="a"
                                href="https://github.com/entur/tavla"
                            >
                                <span className={classes.Text}>GitHub</span>
                                <GithubIcon
                                    className={classes.Icon}
                                    size="20"
                                />
                            </TopNavigationItem>
                        </li>
                    </ul>
                </div>
                {!userLoggedIn && (
                    <LoginModal
                        open={displayLoginModal}
                        onDismiss={(): void => setDisplayLoginModal(false)}
                        loginCase={LoginCase.default}
                    />
                )}
            </nav>
        </Contrast>
    )
}

export { Navbar }
