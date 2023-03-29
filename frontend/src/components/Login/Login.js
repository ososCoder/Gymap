import './Login.css';
import { toast, Toaster } from 'react-hot-toast';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { loginUserService } from '../../services';
import { FiX, FiLink } from 'react-icons/fi';
import gymapBlack from '../../assets/logo/gymapBlack.svg';

export const Login = ({
  showLogin,
  closeLogin,
  closeMenu,
  showCreateAccount,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  if (!showLogin) return null;

  //Toast
  const errorLogin = (message) => toast.error(<p>{message}</p>);
  //Form
  const handleForm = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await loginUserService({ email, password });

      login(data.token);

      setEmail('');
      setPassword('');
      navigate('/exercises');
      closeMenu();
      closeLogin();
    } catch (error) {
      setError(error.message);

      errorLogin(error.message);
    } finally {
    }
  };

  const goToCreateAccount = () => {
    closeLogin();
    showCreateAccount();
  };

  return (
    <>
      <Toaster />
      <div className="Login-modal">
        <div className="Login-container">
          <header className="Login-header">
            <FiX onClick={closeLogin} className="Login-closeModal" />
            <div>
              <h2>Gymap</h2>
              <img src={gymapBlack} alt="Gymap logo" />
            </div>
          </header>
          <div className="Login-body">
            <form onSubmit={handleForm}>
              <fieldset>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="email@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  required
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>
              <button>Iniciar sesion</button>
              {/* {error ? error : null} */}
              <div className="Login-info">
                <span>¿Aun no tienes una cuenta?</span>
                <span
                  onClick={goToCreateAccount}
                  className="Login-linkToCreateAccount"
                >
                  Creala aquí <FiLink />
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
