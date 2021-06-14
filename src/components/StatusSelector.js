import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaAngleDoubleRight, FaFlagCheckered} from "react-icons/fa"

const StatusSelector = ({
  showReferralStatus,
  currentReferralStatus,
  closeReferralStatusEdit,
  profileName,
}) => {
  const [newReferralStatus, setNewReferralStatus] = useState(
    currentReferralStatus
  );
  const [rejectReason, setRejectReason] = useState({
    value: "Please select a reason ..."
});
  const [rejectReasonNote, setRejectReasonNote] = useState("");

  const closeStatusEdit = () => {
    setNewReferralStatus(currentReferralStatus);
    setRejectReason({value: "Please select a reason ..."});
    setRejectReasonNote("");
    closeReferralStatusEdit(null);
  }

  const submitStatusChange = () => {
    setNewReferralStatus(newReferralStatus);
    closeReferralStatusEdit({value: newReferralStatus, rejectReason: { reason: rejectReason, note: rejectReasonNote}});
  }

  const changeStatus = (newStatus) => {
      console.log('new status is: ', newStatus);
    setNewReferralStatus(newStatus);
  };

  const statusEnabled = (status) => {
    return true;
    if (profileName === "Logica") return true;

    switch (status) {
      case "requested":
      case "accepted":
      case "rejected":
        if (
          currentReferralStatus === "requested" ||
          currentReferralStatus === "in-progress" ||
          currentReferralStatus === "accepted" ||
          currentReferralStatus === ""
        )
          return true;
        else return false;

      case "completed":
      case "failed":
        if (currentReferralStatus === "in-progress") return true;
        else return false;

      default:
        return false;
    }
  };

  const rejectReasonOptions = () => {
    const uuRejectReasons = [
      {
        display_name: "Not Eligible",
        value: "Client is not eligible for our services",
      },
      {
        display_name: "Duplicate",
        value: "Duplicate, case already exists in the system",
      },
      {
        display_name: "No Capacity",
        value: "We do not have capacity to serve client",
      },
      {
        display_name: "Do Not Provide Service",
        value: "We do not provide the services requested/needed",
      },
      {
        display_name: "Unable to Contact Client",
        value: "We were unable to contact the client",
      },
      { display_name: "Other", value: "Other" }
    ];

    //return uuRejectReasons;
    return (
        uuRejectReasons.map(option => {
            return <option value={option.value}>{option.display_name}</option>
        })
    )
  };


  const rowColor = (status) => {
    switch (status) {
      case "accepted":
        return "primary";
      case "in-progress":
        return "info";
      case "rejected":
        return "danger";
      case "failed":
        return "danger";
      case "completed":
        return "success";
      case "cancelled":
        return "danger";
      default:
        return "dark";
    }
  };

  return (
    <Modal
      id="referralStatus"
      size="lg"
      show={showReferralStatus}
      onHide={closeStatusEdit}
    >
      <Modal.Header className="bg-light">
        <Modal.Title>Update Referral Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row my-3 text-center">
        <div className="col-6">{"Current Stauts: "}<div className={"btn disabled btn-outline-" + rowColor(currentReferralStatus)}>{currentReferralStatus}</div></div>
        <div className="col-6">{"New Status    : "}<div className={"btn active btn-outline-" + rowColor(newReferralStatus)}>{newReferralStatus}</div></div>
        </div>
        <div
          className="btn-group mb-2 text-center container-fluid"
          role="group"
          aria-label="Referral status selector"
          id="statusGroup"
        >
          <table className="table table-bordered table-sm">
            <thead>
              <tr>
                <th class="table-light">INITIATE <FaAngleDoubleRight /></th>
                <th>RESPONSE <FaAngleDoubleRight /></th>
                <th class="table-light">CONFIRM <FaAngleDoubleRight /></th>
                <th>RESOLVE <FaFlagCheckered /></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan="3" className="table-light">
                  <div className="d-grid gap-2">
                    <input
                      type="radio"
                      className="btn-check"
                      name="btnStatus"
                      id="statusRequested"
                      autoComplete="off"
                      value="requested"
                      defaultChecked={currentReferralStatus === "requested"}
                      onClick={(e) => {
                        changeStatus(e.target.value);
                      }}
                      disabled={!statusEnabled("requested")}
                    />
                    <label
                      class="btn btn-outline-dark"
                      htmlFor="statusRequested"
                    >
                      requested
                    </label>
                  </div>
                </td>

                <td colSpan="3" className="table-light">
                  <div className="d-grid gap-2">
                    <input
                      type="radio"
                      className="btn-check btn-block"
                      name="btnStatus"
                      id="statusCancelled"
                      autoComplete="off"
                      value="cancelled"
                      defaultChecked={currentReferralStatus === "cancelled"}
                      onClick={(e) => {
                        changeStatus(e.target.value);
                      }}
                      disabled={!statusEnabled("cancelled")}
                    />
                    <label
                      class="btn btn-outline-danger"
                      htmlFor="statusCancelled"
                    >
                      cancelled
                    </label>
                  </div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="d-grid gap-2">
                    <input
                      type="radio"
                      className="btn-check"
                      name="btnStatus"
                      id="statusAccepted"
                      autoComplete="off"
                      value="accepted"
                      defaultChecked={currentReferralStatus === "accepted"}
                      onClick={(e) => {
                        changeStatus(e.target.value);
                      }}
                      disabled={!statusEnabled("accepted")}
                    />
                    <label
                      class="btn btn-outline-primary"
                      htmlFor="statusAccepted"
                    >
                      accepted
                    </label>
                  </div>
                </td>
                <td className="table-light">
                  <div className="d-grid gap-2">
                    <input
                      type="radio"
                      className="btn-check"
                      name="btnStatus"
                      id="statusInProgress"
                      autoComplete="off"
                      value="in-progress"
                      defaultChecked={currentReferralStatus === "in-progress"}
                      onClick={(e) => {
                        changeStatus(e.target.value);
                      }}
                      disabled={!statusEnabled("in-progress")}
                    />
                    <label
                      class="btn btn-outline-info"
                      htmlFor="statusInProgress"
                    >
                      in-progress
                    </label>
                  </div>
                </td>
                <td>
                  <div className="d-grid gap-2">
                    <input
                      type="radio"
                      className="btn-check"
                      name="btnStatus"
                      id="statusCompleted"
                      autoComplete="off"
                      value="completed"
                      defaultChecked={currentReferralStatus === "completed"}
                      onClick={(e) => {
                        changeStatus(e.target.value);
                      }}
                      disabled={!statusEnabled("completed")}
                    />
                    <label
                      class="btn btn-outline-success"
                      htmlFor="statusCompleted"
                    >
                      completed
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="btnStatus"
                      id="statusFailed"
                      autoComplete="off"
                      value="failed"
                      defaultChecked={currentReferralStatus === "failed"}
                      onClick={(e) => {
                        changeStatus(e.target.value);
                      }}
                      disabled={!statusEnabled("failed")}
                    />
                    <label
                      class="btn btn-outline-danger"
                      htmlFor="statusFailed"
                    >
                      failed
                    </label>
                  </div>
                </td>
              </tr>

              <tr>
                <td colspan="3">
                  <div className="d-grid gap-2">
                    <input
                      type="radio"
                      className="btn btn-sm btn-check"
                      name="btnStatus"
                      id="statusRejected"
                      autoComplete="off"
                      value="rejected"
                      onClick={(e) => {
                        changeStatus(e.target.value);
                      }}
                      defaultChecked={currentReferralStatus === "rejected"}
                      disabled={!statusEnabled("rejected")}
                    />
                    <label
                      class="btn btn-outline-danger"
                      htmlFor="statusRejected"
                    >
                      rejected
                    </label>
                    <div
                      className={
                        newReferralStatus === "rejected" ? "" : "d-none"
                      }
                    >
                      <div className="form-group">
                        <label className="col-form-label">REJECT REASON</label>
                        <div>
                          <select
                            className="form-select"
                            value={rejectReason.value}
                            onChange={(e) =>
                              setRejectReason({
                                value: e.target.value,
                                text: e.target.options[e.target.selectedIndex]
                                  .text,
                              })
                            }
                          >
                            <option>Select a reason ...</option>
                            {rejectReasonOptions()}
                          </select>

                        </div>
                      </div>

                      <div className="form-group">
                        <label className="col-form-label">NOTE</label>
                        <div>
                          <textarea
                            className="form-control"
                            rows="3"
                            cols="50"
                            placeholder="Enter a note for the reject reason"
                            value={rejectReasonNote}
                            onChange={(e) =>
                              setRejectReasonNote(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={closeStatusEdit}>
          Cancel
        </Button>
        <Button variant="primary" onClick={submitStatusChange}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StatusSelector;
