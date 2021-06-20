import { useState, useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { BiMessage } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";

import {
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaFlagCheckered,
} from "react-icons/fa";
import { IoOpenOutline, IoCloudDownloadSharp } from "react-icons/io5";
import { CgAttachment } from "react-icons/cg";

const AddNote = ({ showAddNote, referral, closeAddNote, baseUrl }) => {
  const [noteText, setNoteText] = useState("");
  const [callResponse, setCallResponse] = useState("");
  const [refreshCount, setRefreshCount] = useState(0);
  const [showMessageToast, setShowMessageToast] = useState(false);
  const [communicationList, setCommunicationList] = useState([]);
  const [waitMessage, setWaitMessage] = useState(
    "Sending communication note ..."
  );

  useEffect(() => {
    setCommunicationList(referral?.Communication);
    console.log("useEffect cl:", communicationList);
  }, [referral]);

  useEffect(() => {
    const updateList = async () => {
      setWaitMessage("Retriving communcation notes ...");
      setShowMessageToast(true);

      const url =
        "https://fhir-crn.uniteustraining.com/rick/mockapi/request/search";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          "x-api-key": "sfsdfddfdsfsdfs32342343",
        },
        body: JSON.stringify({
          baseUrl: baseUrl,
          resourceType: "Communication",
          queryParams: {
            "part-of": referral?.Task.resource.id,
          },
        }),
      });
      const data = await res.json();

      if (data.response?.body?.total > 0) {
        setCommunicationList(data.response?.body?.entry);
        referral.Communication = data.response?.body?.entry;
      }

      setShowMessageToast(false);
    };

    if (referral?.Task) updateList();
    setNoteText("");
    //setCallResponse("");
  }, [refreshCount]);

  const sendNote = async () => {
    setWaitMessage("Sending communication note ...");
    setShowMessageToast(true);
    const url =
      "https://fhir-crn.uniteustraining.com/rick/mockapi/communication_out/process";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "x-api-key": "sfsdfddfdsfsdfs32342343",
      },
      body: JSON.stringify({
        note: noteText,
        referralId: referral?.trackingItem?.core_referral_id,
        sentAt: Math.floor(Date.now() / 1000),
      }),
    });
    const data = await res.json();
    setCallResponse(JSON.stringify(data));
    setRefreshCount(refreshCount + 1);
    setShowMessageToast(false);
    return;
  };

  const sender = (communication) => {
    if (communication) {
      const senderName = communication.resource?.sender?.display;
      let senderType;

      if (
        communication.resource?.sender?.reference?.split("/")[0] ===
        "Organization"
      )
        senderType = "cbo";
      else senderType = "ehr";
      const senderInfo = { name: senderName, type: senderType };
      return senderInfo;
    }

    return null;
  };

  const noteColor = (communication) => {
    if (sender(communication)?.type === "ehr") return "seashell";
    else return "aliceblue";
  };

  const noteAlign = (communication) => {
    if (sender(communication)?.type === "ehr") return "start";
    else return "end";
  };

  const responseTo = (communication) => {
    const recipients = communication.resource?.recipient;
    let responseToStr = "Replied to: ";
    recipients.forEach((entry) => {
      responseToStr += entry.display + ", ";
    });
    return responseToStr;
  };

  const closeAddNoteWindow = () => {
    //setCommunicationList([]);
    setCallResponse("");
    closeAddNote();
  };

  return (
    <>
      <Modal
        id="addNote"
        size="lg"
        show={showAddNote}
        onHide={closeAddNoteWindow}
      >
        <Modal.Header className="bg-light" closeButton>
          <Modal.Title>Referral Communications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-responsive table-hover">
            <tbody>
              {communicationList?.map((entry, index) => (
                <tr>
                  <td className="p-0">
                    <table className="table table-borderless m-0 p-0">
                      <tbody>
                        <tr>
                          <td className="text-center text-secondary">
                            {entry.resource?.sent}
                          </td>
                        </tr>

                        {sender(entry).type === "cbo" ? (
                          <tr
                            className={`text-${noteAlign(
                              entry
                            )} text-secondary`}
                          >
                            <td className="py-0">{responseTo(entry)}</td>{" "}
                          </tr>
                        ) : (
                          <tr
                            className={`text-${noteAlign(
                              entry
                            )} text-secondary`}
                          >
                            <td className="py-0">From: {sender(entry).name}</td>
                          </tr>
                        )}
                        <tr className={`text-${noteAlign(entry)}`}>
                          <td style={{ backgroundColor: noteColor(entry) }}>
                            <div
                              className={`btn mt-0 mx-0 text-start disabled text-body`}
                              style={{ opacity: 1 }}
                            >
                              {entry.resource?.payload
                                ? entry.resource?.payload[0]?.contentString
                                : "[empty]"}
                            </div>
                            {entry.resource?.payload &&
                            entry.resource?.payload[1]?.contentReference ? (
                              <p>
                                <CgAttachment />
                                Document attachment
                              </p>
                            ) : null}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {referral?.trackingItem ? (
            <div className="form-group">
              <div className="d-flex">
                <label className="col-form-label col-6 vertical-bottom">
                  NEW NOTE
                </label>
                <div className="btn btn-primary col-6" onClick={sendNote}>
                  Send
                </div>
              </div>
              <div
                className={
                  showMessageToast
                    ? "toast bg-warning text-secondary show"
                    : "toast"
                }
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                id="messageToastModal"
              >
                <div className="toast-header">
                  <strong className="me-auto">Please Wait ...</strong>
                </div>
                <div className="toast-body">
                  {waitMessage}{" "}
                  <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">...</span>
                  </div>
                </div>
              </div>
              <div>
                <textarea
                  className="form-control"
                  rows="3"
                  cols="50"
                  placeholder="Enter a new note"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                />
              </div>
              {callResponse === "" ? null : (
                <div className="row">
                  <div className="col-10">
                    <pre>{callResponse}</pre>{" "}
                  </div>
                  <div className="col-2">
                    <TiDeleteOutline
                      calssName="col-2"
                      onClick={() => {
                        setCallResponse("");
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="col"
            variant="warning"
            onClick={closeAddNoteWindow}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddNote;
