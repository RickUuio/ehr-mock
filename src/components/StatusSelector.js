import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaFlagCheckered,
} from "react-icons/fa";
import { AiOutlineStop } from "react-icons/ai";

const StatusSelector = ({
  showReferralStatus,
  currentReferralStatus,
  closeReferralStatusEdit,
  profileName,
}) => {
  const [newReferralStatus, setNewReferralStatus] = useState("");
  const [rejectReason, setRejectReason] = useState({
    value: "Please select a reason ...",
  });
  const [rejectReasonNote, setRejectReasonNote] = useState("");
  const [enforceBusinessRule, setEnforceBusinessRule] = useState(false);

  const closeStatusEdit = () => {
    setNewReferralStatus("");
    setRejectReason({ value: "Please select a reason ..." });
    setRejectReasonNote("");
    closeReferralStatusEdit(null);
  };

  const submitStatusChange = () => {
    setNewReferralStatus(newReferralStatus);
    closeReferralStatusEdit({
      value: newReferralStatus,
      rejectReason: { reason: rejectReason, note: rejectReasonNote },
    });
  };

  const changeStatus = (newStatus) => {
    console.log("new status is: ", newStatus);
    setNewReferralStatus(newStatus);
  };

  const statusEnabled = (status) => {
    if (!enforceBusinessRule) return true;
    // if (profileName === "Logica") return true;

    switch (status) {
      case "requested":
        if (
          currentReferralStatus === "requested" ||
          currentReferralStatus === "accepted" ||
          currentReferralStatus === "rejected" ||
          currentReferralStatus === ""
        )
          return true;
        else return false;
      case "accepted":
      case "rejected":
        if (
          currentReferralStatus === "requested" ||
          currentReferralStatus === "accepted" ||
          currentReferralStatus === "rejected" ||
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
      { display_name: "Other", value: "Other" },
    ];

    return uuRejectReasons.map((option) => {
      return <option value={option.value}>{option.display_name}</option>;
    });
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

  const stageColor = (stage) => {
    const colorDone = rowColor(newReferralStatus || currentReferralStatus);
    const colorNotDone = "table-secondary";
    let newStage = 1;

    switch (newReferralStatus || currentReferralStatus) {
      case "requested":
        newStage = 1;
        break;
      case "accepted":
        newStage = 2;
        break;
      case "in-progress":
        newStage = 3;
        break;
      case "completed":
        newStage = 4;
        break;
      default:
        newStage = 5;
    }
    return newStage < stage ? colorNotDone : "table-" + colorDone;
  };

  return (
    <Modal
      id="referralStatus"
      size="lg"
      show={showReferralStatus}
      onHide={closeStatusEdit}
    >
      <Modal.Header className="bg-light" closeButton>
        <Modal.Title>Update Referral Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row my-3 text-center">
          <div className="col-6">
            {"Current Stauts: "}
            <div
              className={
                "btn disabled btn-outline-" + rowColor(currentReferralStatus)
              }
            >
              {currentReferralStatus}
            </div>
          </div>
          <div className="col-6">
            {"New Status    : "}
            <div
              className={
                "btn active btn-outline-" +
                rowColor(newReferralStatus || currentReferralStatus)
              }
            >
              {newReferralStatus || currentReferralStatus}
            </div>
          </div>
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
                <th className={stageColor(1)}>
                  INITIATE{" "}
                  <span className="float-end">
                    <FaAngleDoubleRight />
                  </span>
                </th>
                <th className={stageColor(2)}>
                  RESPONSE{" "}
                  <span className="float-end">
                    <FaAngleDoubleRight />
                  </span>
                </th>
                <th className={stageColor(3)}>
                  CONFIRM{" "}
                  <span className="float-end">
                    <FaAngleDoubleRight />
                  </span>
                </th>
                <th className={stageColor(4)}>
                  RESOLVE{" "}
                  <span className="float-end">
                    <FaFlagCheckered />
                  </span>
                </th>
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
                      <AiOutlineStop
                        className={
                          statusEnabled("requested") ? "invisible" : "visible"
                        }
                      />{" "}
                      requested <AiOutlineStop className="invisible" />
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
                      <AiOutlineStop
                        className={
                          statusEnabled("cancelled") ? "invisible" : "visible"
                        }
                      />{" "}
                      cancelled{" "}
                      <span className="float-end">
                        <FaFlagCheckered />
                      </span>
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
                      <AiOutlineStop
                        className={
                          statusEnabled("accepted") ? "invisible" : "visible"
                        }
                      />{" "}
                      accepted <AiOutlineStop className="invisible" />
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
                      <AiOutlineStop
                        className={
                          statusEnabled("in-progress") ? "invisible" : "visible"
                        }
                      />{" "}
                      in-progress <AiOutlineStop className="invisible" />
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
                      <AiOutlineStop
                        className={
                          statusEnabled("completed") ? "invisible" : "visible"
                        }
                      />{" "}
                      completed{" "}
                      <span className="float-end">
                        <FaFlagCheckered />
                      </span>
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
                      <AiOutlineStop
                        className={
                          statusEnabled("failed") ? "invisible" : "visible"
                        }
                      />{" "}
                      failed{" "}
                      <span className="float-end">
                        <FaFlagCheckered />
                      </span>
                    </label>
                  </div>
                </td>
              </tr>

              <tr>
                <td colSpan="3">
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
                      <AiOutlineStop
                        className={
                          statusEnabled("rejected") ? "invisible" : "visible"
                        }
                      />{" "}
                      rejected{" "}
                      <span className="float-end">
                        <FaFlagCheckered />
                      </span>
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
        <div className="col form-check form-switch mx-2 float-start text-start">
          <input
            className="form-check-input"
            type="checkbox"
            role="button"
            id="flexSwitchBusinessRule"
            checked={enforceBusinessRule}
            onChange={() => setEnforceBusinessRule(!enforceBusinessRule)}
          />
          <label
            className="form-check-label"
            role="button"
            for="flexSwitchBusinessRule"
          >
            Enforce Epic Business Rules
          </label>
        </div>

        <Button className="col" variant="warning" onClick={closeStatusEdit}>
          Cancel
        </Button>
        <Button className="col" variant="primary" onClick={submitStatusChange}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StatusSelector;
