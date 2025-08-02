
import { useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = ReactRouterDOM.useLocation();

  useEffect(() => {
    // If there is a hash, and an element with that id exists, scroll to it
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return; // Exit to prevent scrolling to top
      }
    }

    // Otherwise, scroll to top
    window.scrollTo(0, 0);
  }, [pathname, hash]); // Rerun effect if pathname or hash changes

  return null;
};

export default ScrollToTop;
