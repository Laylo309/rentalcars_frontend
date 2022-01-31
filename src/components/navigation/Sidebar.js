import { React, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DesktopBar from './desktop/DesktopBar';
import MobileBar from './mobile/MobileBar';
import store from '../../redux/configureStore';
import { setActiveDashLink, toggleMobile, toggleMobileModal } from '../../redux/utils/actions/navActions';

const setDefaultWhenUnmount = () => {
  store.dispatch(toggleMobile(false));
  store.dispatch(toggleMobileModal(false));
  store.dispatch(setActiveDashLink('cars'));
};

const handleResize = () => {
  if (window.innerWidth > 1150) {
    store.dispatch(toggleMobile(false));
  }

  store.dispatch(toggleMobile(true));
};

const Sidebar = () => {
  const { isMobile } = useSelector((state) => state.utils.navbar);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', () => {
      handleResize();
    });

    return () => {
      setDefaultWhenUnmount();
    };
  }, []);

  if (isMobile) {
    return (
      <>
        <MobileBar />
      </>
    );
  }

  return (
    <>
      <DesktopBar />
    </>
  );
};

export default Sidebar;
