import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import './HomePage.css';
import homeImageSmall from '../../assets/images/homeImageSmall.jpg';

export const HomePage = () => {
  return (
    <section className='HomePage-section'>
      <h2>
        Tus ejercicios de gimnasio con <span>Gymap</span>
      </h2>
      <h2>
        From <span>zero</span> to <span>GymHero</span>
      </h2>
      <img src={homeImageSmall} alt='Gymap Home' className='HomePage-image' />
      <Link to='/exercises' className='HomePage-Link'>
        <button className='HomePage-button'>
          Ir a ejercicios
          <FiArrowRight className='HomePage-button-icon' />
        </button>
      </Link>
    </section>
  );
};
