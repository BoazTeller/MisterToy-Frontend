import { NavLink, useNavigate } from 'react-router-dom'

export function AppHeader() {
    const navigate = useNavigate()

    const navLinks = [
        { title: 'Home', path: '' },
        { title: 'About', path: 'about' },
        { title: 'Shop', path: 'shop' },
        { title: 'Login', path: 'login' }
    ]

    return (
        <header className="app-header full flex space-between align-center">
            <h1
                className="logo"
                onClick={() => navigate('/')}
                title="Back to home"
            >
                Mister Toy
            </h1>

            <nav className="app-nav">
                {navLinks.map(link =>
                    <NavLink
                        key={link.path}
                        to={`/${link.path}`}
                        className="nav-link"
                        title={`Go to ${link.title}`}
                    >
                        {link.title}
                    </NavLink>
                )}
            </nav>
        </header>
    )
}
