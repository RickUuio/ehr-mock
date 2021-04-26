import EncounterSummary from "./EncounterSummary";
import CreateReferral from "./CreateReferral";
import { useState } from "react";
import ReferralSummary from "./ReferralSummary";

function Referrals({ onCreate, referralList, currentEncounter, sendNotificationUU }) {
  const [showNewReferral, setShowNewReferral] = useState(false);

  const toggleShowNewReferral = () => {
    setShowNewReferral((showNewReferral) => !showNewReferral);
  };

  const onCreateReferral = (referral) => {
    onCreate(referral);
    toggleShowNewReferral();
  };
  return (
    <div className="col-md-9 col-lg-10 px-0">
      <div className="referrals">
        <EncounterSummary
          toggleShowNewReferral={toggleShowNewReferral}
          showNewReferral={showNewReferral}
          currentEncounter={currentEncounter}
          sendNotificationUU={sendNotificationUU}
        />
        {showNewReferral ? (
          <CreateReferral
            onCreate={onCreateReferral}
            toggleShowNewReferral={toggleShowNewReferral}
          />
        ) : null}
        <div className="referralList">
          <div className="h5 py-3">This encounter has {referralList.length > 1 ? referralList.length + ' referrals.' : referralList.length === 1 ? ' 1 referral.' : ' no referrals.'}</div>
          {referralList.length > 0
            ? referralList.map((referral, index) => (
                <ReferralSummary key={index} referral = {referral}/>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default Referrals;
