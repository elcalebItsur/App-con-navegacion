import { Outlet, Link, NavLink } from 'react-router-dom';

function PublicLayout() {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                Inicio
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                Sobre Nosotros - Publico
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/products"
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                Productos
                            </NavLink>
                            <li><Link to="/login">Iniciar Sesión</Link></li>
                            <li><Link to="/register">Registrarse</Link></li>
                        </li>
                    </ul>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>

            <footer>
                <p>© 2024 Mi Aplicación</p>
            </footer>
        </>
    );
}

export default PublicLayout;