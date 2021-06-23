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
      <div className="row pt-2 row-cols-1 row-cols-lg-3">
        <div className="col mx-auto text-break">
          <h4>Current Encounter: {currentEncounter}</h4>
        </div>
        <div className="col">
        {!showNewReferral ? (
          
          <button
            className="btn btn-primary btn-block mx-1"
            onClick={toggle}
            disabled={profileName !== "Logica"}
          >
            Create New Referral
          </button>
     
        ) : (
          <button
            className="btn btn-warning btn-block col mx-1"
            onClick={toggle}
          >
            Cancel New Referral
          </button>
        )}
     </div>
     <div className="col">
        <button
          className="btn btn-primary btn-block col mx-1"
          onClick={sendNotification}
        >
          Send Notification to Unite Us
        </button>
      </div>
      </div>
    </div>
  );
};

export default EncounterSummary;
