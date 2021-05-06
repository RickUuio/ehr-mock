const EncounterSummary = ({
  toggleShowNewReferral,
  showNewReferral,
  currentEncounter,
  sendNotificationUU,
  profileName,
}) => {
  const toggle = () => {
    toggleShowNewReferral();
  };

  const sendNotification = () => {
    console.log("sending an encounter notification to Unite Us...");
    sendNotificationUU();
  };

  return (
    <div className="encounterSummary">
      <div className="h4 pt-2 d-inline-block">
        Current Encounter: {currentEncounter}
      </div>
      <div
        className="btn btn-primary d-inline float-end"
        onClick={sendNotification}
      >
        Send Notification to Unite Us
      </div>
      {!showNewReferral ? (
        <button
          className="btn btn-primary d-inline float-end"
          onClick={toggle}
          disabled = {profileName === 'Epic'}
        >
          Create new referral
        </button>
      ) : (
        <div className="btn btn-warning d-inline float-end" onClick={toggle}>
          Cancel New Referral
        </div>
      )}
    </div>
  );
};

export default EncounterSummary;
