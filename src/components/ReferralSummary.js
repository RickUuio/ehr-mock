import { IoOpenOutline } from "react-icons/io5";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function ReferralSummary({ referral }) {
  const [show, setShow] = useState(false);
  const [fullJson, setFullJson] = useState();

  const showSource = (fullJson) => {
    setFullJson(fullJson);
    setShow(true);
  };

  const closeWindow = () => setShow(false);

  return (
    <>
      <div className="row table-hover px-3">
        <table className="table table-sm align-middle text-start">
          <tbody>
            <tr>
              <th scoope="row">
                {referral.ServiceRequest.resource.resourceType}
              </th>
              <td>
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => showSource(referral.ServiceRequest.resource)}
                >
                  {referral.ServiceRequest.resource.id} <IoOpenOutline />
                </button>
              </td>
            </tr>
            <tr>
              <th scoope="row">{referral.Task.resource.resourceType}</th>
              <td>
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => showSource(referral.Task.resource)}
                >
                  {referral.Task.resource.id} <IoOpenOutline />
                </button>
              </td>
            </tr>
            {referral.Organization ? (
              <tr>
                <th scoope="row">{referral.Organization.resource.resourceType}</th>
                <td>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => showSource(referral.Organization.resource)}
                  >
                    {referral.Organization.resource.id} <IoOpenOutline />
                  </button>
                </td>
              </tr>
            ) : null}
            {referral.Patient ? (
              <tr>
                <th scoope="row">{referral.Patient.resource.resourceType}</th>
                <td>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => showSource(referral.Patient.resource)}
                  >
                    {referral.Patient.resource.id} <IoOpenOutline />
                  </button>
                </td>
              </tr>
            ) : null}
            {referral.Practitioner ? (
              <tr>
                <th scoope="row">
                  {referral.Practitioner.resource.resourceType}
                </th>
                <td>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => showSource(referral.Practitioner.resource)}
                  >
                    {referral.Practitioner.resource.id} <IoOpenOutline />
                  </button>
                </td>
              </tr>
            ) : null}
            {referral.Communication?.map((communication, index) => {
              return (
                <tr key={index}>
                  <th scoope="row">{communication.resource.resourceType}</th>
                  <td>
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() => showSource(communication.resource)}
                    >
                      {communication.resource.id} <IoOpenOutline />
                    </button>
                  </td>
                </tr>
              );
            })}
            {referral.DocumentReference?.map((documentReference, index) => {
              return (
                <tr key={index}>
                  <th scoope="row">{documentReference.resourceType}</th>
                  <td>
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() => showSource(documentReference)}
                    >
                      {documentReference.id} <IoOpenOutline />
                    </button>
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
