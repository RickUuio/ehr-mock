import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaFlagCheckered,
} from "react-icons/fa";
import { IoOpenOutline, IoCloudDownloadSharp } from "react-icons/io5";
import { CgAttachment } from "react-icons/cg";

const AddNote = ({ showAddNote, referral, closeAddNote, baseUrl }) => {
  const [noteText, setNoteText] = useState("");
  const [callResponse, setCallResponse] = useState();
  const [refreshCount, setRefreshCount] = useState(0);
  const [communicationList, setCommunicationList] = useState([]);

  useEffect(() => {
    if (communicationList?.length===0) setCommunicationList(referral?.Communication);
  });

  useEffect(() => {
    const updateList = async () => {
      /*  setCommunicationList(() => {
        communicationList?.push({
          resource: {
            resourceType: "Communication",
            sent: "2021-06-16T22:44:04.929Z",
            recipient: [
              {
                reference: "Practitioner/SMART-1234",
                display: "John Smith",
              },
            ],
            sender: {
              reference: "Organization/14733",
              display: "River City Food Bank",
            },
            payload: [
              {
                contentString: noteText,
              },
            ],
          },
        });
      }); */

      // Fetch Communications for a Task

      const url =
        "https://fhir-crn.uniteustraining.com/rick/mockapi/request/search";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json",
          "x-api-key": "sfsdfddfdsfsdfs32342343",
        },
        body: JSON.stringify({
            "baseUrl": baseUrl,
            "resourceType": "Communication",
            "queryParams": {
                "part-of": referral.Task.resource.id,
            }
        }),
      });
      const data = await res.json();
      console.log("communications: ", data.response?.body?.entry);
      //setCommunicationList(data.response?.body?.entry);
      setCommunicationList(data.response?.body?.entry);
      console.log("communications2: ", communicationList);
    };

    if (referral?.Task) updateList();
    setNoteText("");
    setCallResponse("");
  }, [refreshCount]);

  const sendNote = async () => {
    console.log("sending note ...", noteText);
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
        referralId: referral.trackingItem?.core_referral_id,
        sentAt: Math.floor(Date.now() / 1000),
      }),
    });
    const data = await res.json();
    console.log("Sent note: ", data);
    setCallResponse(JSON.stringify(data));
    setRefreshCount(refreshCount + 1);
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
    if (sender(communication)?.type === "ehr") return "success";
    else return "primary";
  };

  const noteAlign = (communication) => {
    if (sender(communication)?.type === "ehr") return "start";
    else return "end";
  };

  const responseTo = (communication) => {
    const recipients = communication.resource?.recipient;
    let responseToStr = "Sent to: ";
    recipients.forEach((entry) => {
      responseToStr += entry.display + ", ";
    });
    return responseToStr;
  };

  return (
    <Modal id="addNote" size="lg" show={showAddNote} onHide={closeAddNote}>
      <Modal.Header className="bg-light">
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
                          className={`text-${noteAlign(entry)} text-secondary`}
                        >
                          <td className="py-0">{responseTo(entry)}</td>{" "}
                        </tr>
                      ) : (
                        <tr
                          className={`text-${noteAlign(entry)} text-secondary`}
                        >
                          <td className="py-0">{sender(entry).name}</td>
                        </tr>
                      )}
                      <tr className={`text-${noteAlign(entry)}`}>
                        <td>
                          <div
                            className={`btn btn-${noteColor(
                              entry
                            )} disabled mt-0 mx-0 text-start`}
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
        <div className="form-group">
          <div className="d-flex">
            <label className="col-form-label col-6 vertical-bottom">
              NEW NOTE
            </label>
            <div className="btn btn-primary col-6" onClick={sendNote}>
              Send
            </div>
          </div>
          <div>
            <textarea
              className="form-control"
              rows="3"
              cols="50"
              placeholder="Enter a new note"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)} />
            
          </div>
        </div>
        <pre>
          {callResponse}
        </pre>
      </Modal.Body>
      <Modal.Footer>
        <Button className="col" variant="warning" onClick={closeAddNote}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNote;
