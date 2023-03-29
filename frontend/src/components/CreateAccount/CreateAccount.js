import './CreateAccount.css';
import { toast, Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { createAccountService } from '../../services';
import gymapBlack from '../../assets/logo/gymapBlack.svg';
import { FiX, FiLink } from 'react-icons/fi';

export const CreateAccount = ({
  showCreateAccount,
  closeCreateAccount,
  setShowLogin,
}) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!showCreateAccount) return null;

  //Toast
  const createAccountError = (message) => toast.error(<p>{message}</p>);

  //Form
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      await createAccountService({ userName, email, password });

      setUserName('');
      setEmail('');
      setPassword('');
      closeCreateAccount();
      setShowLogin(true);
    } catch (error) {
      setPassword('');
      createAccountError(error.message);
    }
  };

  const goToLogin = () => {
    closeCreateAccount();
    setShowLogin(true);
  };

  return (
    <>
      <Toaster />
      <div className='CreateAccount-modal'>
        <div className='CreateAccount-container'>
          <header className='CreateAccount-header'>
            <FiX
              className='CreateAccount-closeModal'
              onClick={closeCreateAccount}
            />
            <div>
              <h2>Gymap</h2>
              <img src={gymapBlack} alt='Gymap logo' />
            </div>
          </header>
          <div className='CreateAccount-body'>
            <form onSubmit={handleForm}>
              <fieldset>
                <label htmlFor='userName'>Nombre de Usuario</label>
                <input
                  type='text'
                  id='userName'
                  required
                  placeholder='usuario'
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  id='email'
                  required
                  placeholder='email@email.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label htmlFor='password'>Contraseña</label>
                <input
                  type='password'
                  id='password'
                  required
                  placeholder='********'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>
              <button>Crear Cuenta</button>
              {/* {error ? <p>{error}</p> : null} */}
              <div className='CreateAccount-info'>
                <span>¿Ya tienes una cuenta?</span>
                <span onClick={goToLogin} className='CreateAccount-linkToLogin'>
                  Accede desde aquí <FiLink />
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
