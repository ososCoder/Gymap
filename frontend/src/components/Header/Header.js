import './Header.css';
import gymap from '../../assets/logo/gymap.svg';
import {
  FiMenu,
  FiX,
  FiUserPlus,
  FiLogIn,
  FiStar,
  FiEdit3,
  FiLogOut,
  FiPlus,
  FiUserX,
} from 'react-icons/fi';

import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreateAccount } from '../CreateAccount/CreateAccount';
import { Login } from '../Login/Login';
import { AuthContext } from '../../context/AuthContext';
import { CreateExercise } from '../CreateExercise/CreateExercise';
import { DeleteUser } from '../DeleteUser/DeleteUser';

import userDefault2 from '../../assets/images/userDefault2.svg';

export const Header = ({ setExercises }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  //modal ejercicio
  const [showCreateExercise, setShowCreateExercise] = useState(false);

  //modal eliminar usuario
  const [showDeleteUser, setShowDeleteUser] = useState(false);

  //CONTEXT
  const { logout, user } = useContext(AuthContext);

  //LOGIN Y CREATE ACCOUNT MODALES
  const createAccountModal = () => {
    setShowCreateAccount(true);
    setShowMenu(false);
  };

  const loginModal = () => {
    setShowLogin(true);
    setShowMenu(false);
  };

  //CERRAR MODAL MENU USER, LOGOUT Y NAVIGATE A HOME
  const navigate = useNavigate();

  //CREATE EXERCISE
  const createExerciseModal = () => {
    setShowCreateExercise(true);
    setShowUserMenu(false);
  };

  //DELETE USER
  const createDeleteUserModal = () => {
    setShowDeleteUser(true);
    setShowUserMenu(false);
  };

  //LOGOUT
  const logoutProcess = () => {
    navigate('/');
    logout();
    setShowUserMenu(false);
  };

  return (
    <>
      <header className='Header-header'>
        <Link to='/' className='Header-gymap'>
          <h1>Gymap</h1>
          <img src={gymap} alt='Gymap logo' />
        </Link>

        {user?.role === 'admin' ? (
          <>
            {!showUserMenu ? (
              <img
                src={
                  user.avatar
                    ? `${process.env.REACT_APP_BACKEND}/${user.avatar}`
                    : userDefault2
                }
                alt={user.name}
                onClick={() => setShowUserMenu(!showUserMenu)}
                className='userImage'
              />
            ) : (
              <FiX
                onClick={() => setShowUserMenu(false)}
                className='UserMenu-menu-button'
              />
            )}

            <div className={`UserMenu-modal-${showUserMenu}`}>
              <div className='UserMenu-container'>
                <nav className='UserMenu-nav'>
                  <header className='UserMenu-header'>
                    <h2>Gymap</h2>
                  </header>
                  <div className='UserMenu-info'>
                    <img
                      src={
                        user.avatar
                          ? `${process.env.REACT_APP_BACKEND}/${user.avatar}`
                          : userDefault2
                      }
                      alt={user.name}
                      className='UserMenu-userImage'
                    />
                    <div>
                      <h3>{user.name}</h3>
                      <h4>{user.email}</h4>
                      <h5>GymHero #{user.id}</h5>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <Link to='/profile' className='links'>
                        <button
                          onClick={() => setShowUserMenu(!showUserMenu)}
                          className='UserMenu-editarPerfilButton'
                        >
                          Editar mi perfil
                          <FiEdit3 />
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link to='/exercises' className='links'>
                        <button
                          onClick={createExerciseModal}
                          className='UserMenu-crearEjercicioButton'
                        >
                          Nuevo ejercicio
                          <FiPlus />
                        </button>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={createDeleteUserModal}
                        className='UserMenu-eliminarUserButton'
                      >
                        Eliminar usuario
                        <FiUserX />
                      </button>
                    </li>
                  </ul>
                  <button onClick={logoutProcess}>LOGOUT</button>
                </nav>
              </div>
            </div>
            <CreateExercise
              showCreateExercise={showCreateExercise}
              closeCreateExercise={() => setShowCreateExercise(false)}
              setExercises={setExercises}
            />
            <DeleteUser
              showDeleteUser={showDeleteUser}
              closeDeleteUser={() => setShowDeleteUser(false)}
            />
          </>
        ) : user?.role === 'member' ? (
          <>
            {!showUserMenu ? (
              <img
                src={
                  user.avatar
                    ? `${process.env.REACT_APP_BACKEND}/${user.avatar}`
                    : userDefault2
                }
                alt={user.name}
                className='userImage'
                onClick={() => setShowUserMenu(!showUserMenu)}
              />
            ) : (
              <FiX
                onClick={() => setShowUserMenu(false)}
                className='UserMenu-menu-button'
              />
            )}
            <div className={`UserMenu-modal-${showUserMenu}`}>
              <div className='UserMenu-container'>
                <nav className='UserMenu-nav'>
                  <header className='UserMenu-header'>
                    <h2>Gymap</h2>
                    <img src={gymap} alt='Gymap' />
                  </header>
                  <div className='UserMenu-info'>
                    <img
                      src={
                        user.avatar
                          ? `${process.env.REACT_APP_BACKEND}/${user.avatar}`
                          : userDefault2
                      }
                      alt={user.name}
                      className='UserMenu-userImage'
                    />
                    <div>
                      <h3>{user.name}</h3>
                      <h4>{user.email}</h4>
                      <h5>GymHero #{user.id}</h5>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <Link to='/exercises/favourites' className='links'>
                        <button
                          onClick={() => setShowUserMenu(!showUserMenu)}
                          className='UserMenu-listaFavsButton'
                        >
                          Mis favoritos
                          <FiStar />
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link to='/profile' className='links'>
                        <button
                          onClick={() => setShowUserMenu(!showUserMenu)}
                          className='UserMenu-editarPerfilButton'
                        >
                          Editar mi Perfil
                          <FiEdit3 />
                        </button>
                      </Link>
                    </li>
                  </ul>
                  <button onClick={logoutProcess}>
                    LOGOUT <FiLogOut />
                  </button>
                </nav>
              </div>
            </div>
          </>
        ) : (
          <>
            {!showMenu ? (
              <FiMenu
                onClick={() => setShowMenu(!showMenu)}
                className='Header-menu-button'
              />
            ) : (
              <FiX
                onClick={() => setShowMenu(false)}
                className='Header-menu-button'
              />
            )}

            <nav className={`Header-nav-${showMenu}`}>
              <ul>
                <li>
                  <button
                    onClick={createAccountModal}
                    className='Header-registrateButton'
                  >
                    Regístrate
                    <FiUserPlus className='Header-registrateButton-icon' />
                  </button>
                </li>
                <li>
                  <button
                    onClick={loginModal}
                    className='Header-iniciarSesionButton'
                  >
                    Iniciar sesión
                    <FiLogIn className='Header-iniciarSesionButton-icon' />
                  </button>
                </li>
              </ul>
            </nav>
            <CreateAccount
              showCreateAccount={showCreateAccount}
              closeCreateAccount={() => setShowCreateAccount(false)}
              setShowLogin={setShowLogin}
            />
            <Login
              showLogin={showLogin}
              closeLogin={() => setShowLogin(false)}
              closeMenu={() => setShowMenu(false)}
              showCreateAccount={() => setShowCreateAccount(true)}
            />
          </>
        )}
      </header>
    </>
  );
};
