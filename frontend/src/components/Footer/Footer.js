import './Footer.css';
import { FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';

export const Footer = () => {
  return (
    <footer className='Footer-footer'>
      <p>¿Quieres saber más?</p>
      <div className='Footer-social'>
        <FiInstagram className='Footer-socialIcons-insta' />
        <FiTwitter className='Footer-socialIcons-twitter' />
        <FiFacebook className='Footer-socialIcons-facebook' />
      </div>
      <p>Derechos reservados a Gymap</p>
    </footer>
  );
};
