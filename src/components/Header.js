import PropTypes from 'prop-types';
import Patient from './Patient';
import Provider from './Provider';
import ProfileSelector from './ProfileSelector';
import { FaFire } from 'react-icons/fa';

const Header = ({ title, patient, provider, profileName, switchProfile }) => {
  return (
    <header>
      <div id="navbarTop">
        <div className="row">
          <div className="col-lg-6 col-md-12 order-lg-2">
            <h2 className="pt-4">
              <FaFire style={{ color: '#d60c05ee' }} /> {title}
            </h2>
            <ProfileSelector
              profileName={profileName}
              switchProfile={switchProfile}
            />
          </div>

          <div className="col-lg-3 col-md-6 order-lg-1">
            <Patient patient={patient} />
          </div>

          <div className="col-lg-3 col-md-6 order-lg-3">
            <Provider provider={provider} />
          </div>
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  title: 'Mock EHR : : Social Care Referrals',
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// const headingStyle = {
//   color: "white",
//   backgroundColor: "#2c405a",
// };

export default Header;
