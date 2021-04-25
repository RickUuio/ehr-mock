const EncounterSummary = ({
  toggleShowNewReferral,
  showNewReferral,
  currentEncounter,
  sendNotificationUU
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
        <div className="h4 pt-2 d-inline-block">Current Encounter: {currentEncounter}</div>
      <div
        className="btn btn-primary d-inline float-right"
        onClick={sendNotification}
      >
        Send Notification to Unite Us
      </div>
      {!showNewReferral ? (
        <div className="btn btn-primary d-inline float-right" onClick={toggle}>
          Create new referral
        </div>
      ) : (
        <div className="btn btn-warning d-inline float-right" onClick={toggle}>
          Cancel New Referral
        </div>
      )}
    </div>
  );
};

export default EncounterSummary;
