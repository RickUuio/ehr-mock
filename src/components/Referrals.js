import EncounterSummary from "./EncounterSummary";
import CreateReferral from "./CreateReferral";
import ReferralSummary from "./ReferralSummary";
import StatusSelector from "./StatusSelector";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function Referrals({
  onCreate,
  referralList,
  currentEncounter,
  sendNotificationUU,
  profileName,
  updateReferralStatus,
}) {
  const [showNewReferral, setShowNewReferral] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const [showReferralStatus, setShowReferralStatus] = useState(false);
  const [fullJson, setFullJson] = useState();
  const [currentReferralStatus, setCurrentReferralStatus] = useState("");
  //const [newReferralStatus, setNewReferralStatus] = useState(
  //  currentReferralStatus
  //);
  const [editReferralId, setEditReferralId] = useState();

  const toggleShowNewReferral = () => {
    setShowNewReferral((showNewReferral) => !showNewReferral);
  };

  const onCreateReferral = (referral) => {
    onCreate(referral);
    toggleShowNewReferral();
  };

  const showFhirSource = (fullJson, show) => {
    setFullJson(fullJson);
    setShowSource(show);
  };

  const closeWindow = () => setShowSource(false);

  const editReferralStatus = (referralId, currentStatus) => {
    setShowReferralStatus(true);
    setEditReferralId(referralId);
    setCurrentReferralStatus(currentStatus);
    //setNewReferralStatus("");
  };

  const closeReferralStatusEdit = (newStatus) => {
    setShowReferralStatus(false);
    if (newStatus !== null) {
      //setNewReferralStatus(newReferralStatus.value);
      console.log("new status: ", newStatus.value, newStatus.rejectReason);
      updateReferralStatus(editReferralId, newStatus);
    } //else setNewReferralStatus("");
  };

  return (
    <div className="col-md-9 col-lg-10 px-0">
      <div className="referrals">
        <EncounterSummary
          toggleShowNewReferral={toggleShowNewReferral}
          showNewReferral={showNewReferral}
          currentEncounter={currentEncounter}
          sendNotificationUU={sendNotificationUU}
          profileName={profileName}
        />
        {showNewReferral ? (
          <CreateReferral
            onCreate={onCreateReferral}
            toggleShowNewReferral={toggleShowNewReferral}
          />
        ) : null}
        <div className="referralList">
          <div className="h5 py-3">
            This encounter has{" "}
            {referralList.length > 1
              ? referralList.length + " referrals."
              : referralList.length === 1
              ? " 1 referral."
              : " no referrals."}
          </div>
          {referralList.length > 0 ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>DATE SENT</th>
                  <th>STATUS</th>
                  <th>SERVICE TYPE</th>
                  <th>RECEIPIENT</th>
                  <th>EXPAND</th>
                </tr>
              </thead>
              <tbody>
                {referralList.map((referral, index) => (
                  <ReferralSummary
                    key={index}
                    referral={referral}
                    showFhirSource={showFhirSource}
                    editReferralStatus={editReferralStatus}
                  />
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
      </div>
      <Modal id="fhirSource" size="lg" show={showSource} onHide={closeWindow}>
        <Modal.Header className="bg-light" closeButton>
          <Modal.Title>
            {fullJson?.resourceType} : {fullJson?.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre id="json">{JSON.stringify(fullJson, undefined, 2)}</pre>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={closeWindow}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <StatusSelector
        showReferralStatus={showReferralStatus}
        currentReferralStatus={currentReferralStatus}
        closeReferralStatusEdit={closeReferralStatusEdit}
        profileName={profileName}
      ></StatusSelector>
    </div>
  );
}

export default Referrals;
