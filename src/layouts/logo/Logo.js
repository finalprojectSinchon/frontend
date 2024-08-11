import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import { ReactComponent as LogoDarkIcon } from '../../assets/images/logos/dark-logo-icon.svg';
import { ReactComponent as LogoDarkText } from '../../assets/images/logos/dark-logo-text.svg';
import { ReactComponent as LogoWhiteIcon } from '../../assets/images/logos/white-logo-icon.svg';
import { ReactComponent as LogoWhiteText } from '../../assets/images/logos/white-logo-text.svg';

const Logo = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const toggleMiniSidebar = useSelector((state) => state.customizer.isMiniSidebar);
  const activeTopbarBg = useSelector((state) => state.customizer.topbarBg);
  return (
    <Link to="/main" className="d-flex align-items-center gap-2">
      {isDarkMode || activeTopbarBg !== 'white' ? (
        <>
          {/*<LogoWhiteIcon />*/}
          <img src='https://github.com/user-attachments/assets/1eb2f4c2-a270-4edb-a7f4-f90f301a822e' alt="logo"  width={45}/>
          {toggleMiniSidebar ? '' : <LogoWhiteText />}
        </>
      ) : (
          <>
            {/*<LogoDarkIcon />*/}
            <img src='https://github.com/user-attachments/assets/1eb2f4c2-a270-4edb-a7f4-f90f301a822e' alt="logo"
                 width={45}/>
            {toggleMiniSidebar ? '' : <LogoDarkText/>}
          </>
      )}
    </Link>
  );
};

export default Logo;
