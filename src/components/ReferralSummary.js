import { IoOpenOutline } from "react-icons/io5";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function ReferralSummary({ referral }) {
  const [show, setShow] = useState(false);
  const [fullJson, setFullJson] = useState();
  var cboUUID;

  const showSource = (fullJson) => {
    setFullJson(fullJson);
    setShow(true);
  };

  const closeWindow = () => setShow(false);

  let findUUID = (resource) => {
    const cboUUID = resource.identifier.find(
      (entry) =>
        entry.system.toUpperCase() ===
        "HTTPS://UNITEUS.COM/IO/STRUCTUREDEFINITION/CBO-UUID"
    );
    return cboUUID;
  };

  return (
    <>
      <div className="row table-hover px-3">
        <table className="table table-sm align-middle text-start">
          <tbody>
            <tr>
              <th scoope="row">
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => showSource(referral.ServiceRequest.resource)}
                >
                  {referral.ServiceRequest.resource.resourceType}{" "}
                  <IoOpenOutline />
                </button>
              </th>
              <td>
                Referral was authored on{" "}
                <div className="btn btn-outline-primary disabled">
                  {referral.ServiceRequest.resource.authoredOn}
                </div>{" "}
                by{" "}
                <div
                  className="btn btn-outline-primary"
                  onClick={() => showSource(referral.Practitioner.resource)}
                >
                  {referral.ServiceRequest.resource.requester.display}{" "}
                  <IoOpenOutline />
                </div>
                .{" "}
                {referral.ServiceRequest.resource.orderDetail ? (
                  <span>
                    {"Service type is "}
                    <div className="btn btn-outline-primary disabled">
                      {referral.ServiceRequest.resource.orderDetail[0].text}
                    </div>
                    .
                  </span>
                ) : (
                  "Service type has not been confirmed yet."
                )}
                {referral.ServiceRequest.resource.supportingInfo ? (
                  <span>
                    {" "}
                    Attached is a supporting document of
                    <div
                      className="btn btn-outline-primary"
                      onClick={() => showSource(referral.DocumentReference[0])}
                    >
                      {referral.DocumentReference[0].type.text}{" "}
                      <IoOpenOutline />
                    </div>
                  </span>
                ) : null}
              </td>
            </tr>
            <tr>
              <th scoope="row">
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => showSource(referral.Task.resource)}
                >
                  {referral.Task.resource.resourceType} <IoOpenOutline />
                </button>
              </th>
              <td>
                <span>
                  Referral status is{" "}
                  <div className="btn btn-outline-primary disabled">
                    {referral.Task?.resource?.status}
                  </div>
                  , last modified on{" "}
                  <div className="btn btn-outline-primary disabled">
                    {referral.Task?.resource?.lastModified}
                  </div>
                </span>{" "}
                <span>
                  Recipient is{" "}
                  <div
                    className="btn btn-outline-primary"
                    onClick={() => showSource(referral.Organization?.resource)}
                  >
                    {referral.Task?.resource?.owner?.display} <IoOpenOutline />
                  </div>
                </span>
              </td>
            </tr>
            {referral.Organization ? (
              <tr>
                <th scoope="row">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => showSource(referral.Organization.resource)}
                  >
                    {referral.Organization.resource.resourceType}{" "}
                    <IoOpenOutline />
                  </button>
                </th>
                <td>
                  <span>
                    Recipient is{" "}
                    <div className="btn btn-outline-primary disabled">
                      {referral.Organization.resource.name}
                    </div>
                  </span>
                  {findUUID(referral.Organization.resource) ? (
                    <span>
                      Their Unite Us UUID is{" "}
                      <div className="btn btn-outline-primary disabled">
                        {findUUID(referral.Organization.resource).value}
                      </div>
                    </span>
                  ) : null}
                </td>
              </tr>
            ) : null}
            {referral.Patient ? (
              <tr>
                <th scoope="row">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => showSource(referral.Patient.resource)}
                  >
                    {referral.Patient.resource.resourceType} <IoOpenOutline />
                  </button>
                </th>
                <td>
                  <div className="btn btn-outline-primary disabled">
                    {referral.Patient.resource.name[0].family}, {referral.Patient.resource.name[0].given[0]}
                  </div>
                </td>
              </tr>
            ) : null}
            {referral.Practitioner ? (
              <tr>
                <th scoope="row">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => showSource(referral.Practitioner.resource)}
                  >
                    {referral.Practitioner.resource.resourceType}{" "}
                    <IoOpenOutline />
                  </button>
                </th>
                <td>
                  <div className="btn btn-outline-primary disabled">
                    {referral.Practitioner.resource.name[0].family}, {referral.Practitioner.resource.name[0].given[0]}
                  </div>
                </td>
              </tr>
            ) : null}

            {referral.Consent?.map((consent, index) => {
              return (
                <tr key={index}>
                  <th scoope="row">
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() => showSource(consent.resource)}
                    >
                      {consent.resource.resourceType}
                      <IoOpenOutline />
                    </button>
                  </th>
                  <td>
                    <span>
                      Consent status is{" "}
                      <div className="btn btn-outline-primary disabled">
                        {consent.resource.status}
                      </div>
                      . Scope is{" "}
                      <div className="btn btn-outline-primary disabled">
                        {consent.resource.scope?.text}
                      </div>.
                      {" "}Provision period is from 
                      <div className="btn btn-outline-primary disabled">
                        {consent.resource.provision?.period?.start}
                      </div>
                       to 
                       <div className="btn btn-outline-primary disabled">
                        {consent.resource.provision?.period?.end}
                      </div>
                    </span>
                  </td>
                </tr>
              );
            })}


            {referral.DocumentReference?.map((documentReference, index) => {
              return (
                <tr key={index}>
                  <th scoope="row">
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() => showSource(documentReference)}
                    >
                      {documentReference.resourceType}
                      <IoOpenOutline />
                    </button>
                  </th>
                  <td>
                    <span>
                      Document type is{" "}
                      <div className="btn btn-outline-primary disabled">
                        {documentReference.type.text}
                      </div>
                      . Document filename is{" "}
                      <div className="btn btn-outline-primary disabled">
                        {documentReference.description}
                      </div>
                    </span>
                  </td>
                </tr>
              );
            })}

            {referral.Communication?.map((communication, index) => {
              return (
                <tr key={index}>
                  <th scoope="row">
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() => showSource(communication.resource)}
                    >
                      {communication.resource.resourceType} <IoOpenOutline />
                    </button>
                  </th>
                  <td>
                    <span>
                      On{" "}
                      <div className="btn btn-outline-primary disabled">
                        {communication.resource?.sent}
                      </div>
                      , sent from{" "}
                      <div className="btn btn-outline-primary disabled">
                        {communication.resource?.sender.display}
                      </div>
                      to{" "}
                      <div className="btn btn-outline-primary disabled">
                        {communication.resource?.recipient[0].display}
                      </div>
                      .
                    </span>
                    {communication.resource.payload ? (
                      <p>
                        {" "}
                        Note message:{" "}
                        <div className="btn btn-outline-primary disabled">
                          {communication.resource.payload[0].contentString}
                        </div>
                      </p>
                    ) : (
                      <span> Note message is empty.</span>
                    )}
                    {communication.resource.payload &&
                    communication.resource.payload[1]?.contentReference ? (
                      <p>
                        {" "}
                        A{" "}
                        <div
                          className="btn btn-outline-primary"
                          onClick={() =>
                            showSource(referral.DocumentReference[0])
                          }
                        >
                          document <IoOpenOutline />
                        </div>{" "}
                        was attached to the communication.
                      </p>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal size="lg" show={show} onHide={closeWindow}>
        <Modal.Header closeButton>
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
    </>
  );
}

export default ReferralSummary;
