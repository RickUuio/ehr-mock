import { IoOpenOutline, IoCloudDownloadSharp } from 'react-icons/io5';
import { useState } from 'react';
// import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { FaEdit } from 'react-icons/fa';
import { BiMessageEdit } from 'react-icons/bi';

function ReferralSummary({
  referral,
  showFhirSource,
  editReferralStatus,
  showAddNoteWindow,
  baseUrl,
  sendUUNotification,
}) {
  const [expandReferralId, setExpandReferralId] = useState('');

  const showSource = (fullJson) => {
    showFhirSource(fullJson, true);
  };

  const editStatus = (referralId, currentStatus) => {
    editReferralStatus(referralId, currentStatus);
  };

  let findUUID = (resource) => {
    const cboUUID = resource.identifier.find(
      (entry) =>
        entry.system.toUpperCase() ===
        'HTTPS://UNITEUS.COM/IO/STRUCTUREDEFINITION/CBO-UUID'
    );
    return cboUUID;
  };

  const toggleExpand = (referralId) => {
    if (expandReferralId === referralId) setExpandReferralId('');
    else setExpandReferralId(referralId);
  };

  const expandStatus = (referralId) => {
    return expandReferralId === referralId;
  };

  const rowColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'primary';
      case 'in-progress':
        return 'info';
      case 'rejected':
        return 'danger';
      case 'failed':
        return 'danger';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'danger';
      default:
        return 'light';
    }
  };

  const removeReferral = async () => {
    const fullUrl = referral.trackingItem.full_url;
    console.log('remove referral: ', fullUrl);
    const url =
      'https://5yhugddpmk.execute-api.us-east-1.amazonaws.com/rick/mockapi/resource_tracking/delete';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        'x-api-key': 'sfsdfddfdsfsdfs32342343',
      },
      body: JSON.stringify({
        full_url: fullUrl,
      }),
    });
    const data = await res.json();
    const item = data.response;
    referral.trackingItem = null;
    setExpandReferralId('');
    console.log('remove item: ', item);
    return item;
  };

  const sendCommunicationNotification = (fhirId) => {
    console.log('sending a communication notification to Unite Us...');
    sendUUNotification(fhirId, 'Communication');
  };

  const sendTaskNotification = (fhirId) => {
    console.log('sending a task notification to Unite Us...');
    sendUUNotification(fhirId, 'Task');
  };

  return (
    <>
      <tr
        className={
          'align-middle table-' + rowColor(referral.Task?.resource?.status)
        }
        data-bs-toggle="collapse"
        data-bs-target={'#referral' + referral.ServiceRequest.resource.id}
        aria-expanded="false"
        aria-controls={'referral' + referral.ServiceRequest.resource.id}
        onClick={() => toggleExpand(referral.ServiceRequest.resource.id)}
        role="button"
      >
        <td>{referral.ServiceRequest.resource.authoredOn}</td>
        <td>
          <div
            className="btn btn-outline-primary my-0"
            data-bs-toggle="tooltip"
            title="Click to edit referral status"
            data-bs-placement="top"
            onClick={() =>
              editStatus(
                referral.Task?.resource?.id,
                referral.Task?.resource?.status
              )
            }
          >
            {referral.Task?.resource?.status} <FaEdit></FaEdit>
          </div>
        </td>
        <td>
          {referral.ServiceRequest.resource.orderDetail
            ? referral.ServiceRequest.resource.orderDetail[0].text
            : 'Not Confirmed'}
        </td>
        <td>{referral.Task?.resource?.owner?.display}</td>
        <td>
          <div role="button" onClick={() => showAddNoteWindow(referral)}>
            <div className="badge bg-primary">
              {referral.Communication?.length || '0'}
            </div>{' '}
            <BiMessageEdit className="text-primary " />
          </div>
        </td>
        {/* <td>
          <div className="form-check form-switch mx-2 text-start">
            <input
              className="form-check-input"
              type="checkbox"
              role="button"
              id={"flexSwitchCheck" + referral.ServiceRequest.resource.id}
              checked={expandStatus(referral.ServiceRequest.resource.id)}
              onChange={() => toggleExpand(referral.ServiceRequest.resource.id)}
            />
            <label
              className="form-check-label"
              role="button"
              for={"flexSwitchCheck" + referral.ServiceRequest.resource.id}
            >
              Fhir Resources{" "}
              {expandStatus(referral.ServiceRequest.resource.id) ? (
                <MdExpandLess></MdExpandLess>
              ) : (
                <MdExpandMore></MdExpandMore>
              )}
            </label>
          </div>
        </td> */}
        <td>
          {referral.trackingItem ? (
            <a
              href={`https://app.uniteustraining.com/dashboard/referrals/sent/all/${referral.trackingItem.core_referral_id}`}
              data-bs-toggle="tooltip"
              title={referral.trackingItem.core_referral_id}
              data-bs-placement="top"
              target="_blank"
              rel="noreferrer noopener"
            >
              {'...' + referral.trackingItem.core_referral_id.split('-').pop()}
            </a>
          ) : null}
        </td>
        <td>{expandStatus(referral.ServiceRequest.resource.id) ? '-' : '+'}</td>
      </tr>
      <tr
        className={
          expandStatus(referral.ServiceRequest.resource.id)
            ? 'table-light'
            : 'collapse'
        }
        id={'referral' + referral.ServiceRequest.resource.id}
      >
        <td colSpan="7">
          <div className="row px-3">
            <table className="table table-sm align-middle text-start">
              <tbody>
                {referral.trackingItem ? (
                  <tr>
                    <th scoope="row">
                      <button
                        type="button"
                        className="btn btn-link"
                        onClick={() => showSource(referral.trackingItem)}
                      >
                        Task Tracking <IoOpenOutline />
                      </button>
                    </th>
                    <td>
                      Referral created in Unite Us{' '}
                      <a
                        href={`https://app.uniteustraining.com/dashboard/referrals/sent/all/${referral.trackingItem.core_referral_id}`}
                        data-bs-toggle="tooltip"
                        title={referral.trackingItem.core_referral_id}
                        data-bs-placement="top"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {referral.trackingItem.core_referral_id}
                      </a>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={removeReferral}
                      >
                        Remove Referral Link
                      </button>
                    </td>
                  </tr>
                ) : null}
                <tr>
                  <th scoope="row">
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() =>
                        showSource(referral.ServiceRequest.resource)
                      }
                    >
                      {referral.ServiceRequest.resource.resourceType}{' '}
                      <IoOpenOutline />
                    </button>
                  </th>
                  <td colSpan="2">
                    Referral was authored on{' '}
                    <div className="btn btn-outline-primary disabled">
                      {referral.ServiceRequest.resource.authoredOn}
                    </div>{' '}
                    by{' '}
                    <div
                      className="btn btn-outline-primary"
                      onClick={() => showSource(referral.Practitioner.resource)}
                    >
                      {referral.ServiceRequest.resource.requester.display}{' '}
                      <IoOpenOutline />
                    </div>
                    .{' '}
                    {referral.ServiceRequest.resource.orderDetail ? (
                      <span>
                        {'Service type is '}
                        <div className="btn btn-outline-primary disabled">
                          {referral.ServiceRequest.resource.orderDetail[0].text}
                        </div>
                        .
                      </span>
                    ) : (
                      'Service type has not been confirmed yet.'
                    )}
                    {referral.ServiceRequest.resource.supportingInfo ? (
                      <span>
                        {' '}
                        Attached is a supporting document of
                        <div
                          className="btn btn-outline-primary"
                          onClick={() =>
                            showSource(referral.DocumentReference[0])
                          }
                        >
                          {referral.DocumentReference[0].type.text}{' '}
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
                      Referral status is{' '}
                      <div className="btn btn-outline-primary disabled">
                        {referral.Task?.resource?.status}
                      </div>
                      , last modified on{' '}
                      <div className="btn btn-outline-primary disabled">
                        {referral.Task?.resource?.lastModified}
                      </div>
                    </span>{' '}
                    <span>
                      Recipient is{' '}
                      <div
                        className="btn btn-outline-primary"
                        onClick={() =>
                          showSource(referral.Organization?.resource)
                        }
                      >
                        {referral.Task?.resource?.owner?.display}{' '}
                        <IoOpenOutline />
                      </div>
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() =>
                        sendTaskNotification(referral.Task?.resource?.id)
                      }
                    >
                      Send Task Notification
                    </button>
                  </td>
                </tr>
                {referral.Organization ? (
                  <tr>
                    <th scoope="row">
                      <button
                        type="button"
                        className="btn btn-link"
                        onClick={() =>
                          showSource(referral.Organization.resource)
                        }
                      >
                        {referral.Organization.resource.resourceType}{' '}
                        <IoOpenOutline />
                      </button>
                    </th>
                    <td>
                      <span>
                        Recipient is{' '}
                        <div className="btn btn-outline-primary disabled">
                          {referral.Organization.resource.name}
                        </div>
                      </span>
                      {findUUID(referral.Organization.resource) ? (
                        <span>
                          Their Unite Us UUID is{' '}
                          <div className="btn btn-outline-primary disabled">
                            {findUUID(referral.Organization.resource).value}
                          </div>
                        </span>
                      ) : null}
                    </td>
                    <td>
                      {/*                       <button className="btn btn-sm btn-primary disabled">
                        Look up UU Provider
                      </button> */}
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
                        {referral.Patient.resource.resourceType}{' '}
                        <IoOpenOutline />
                      </button>
                    </th>
                    <td>
                      <div className="btn btn-outline-primary disabled">
                        {referral.Patient.resource.name[0].family},{' '}
                        {referral.Patient.resource.name[0].given[0]}
                      </div>
                    </td>
                    <td>
                      {/*                       <button className="btn btn-sm btn-primary disabled">
                        Look up UU Client
                      </button> */}
                    </td>
                  </tr>
                ) : null}
                {referral.Practitioner ? (
                  <tr>
                    <th scoope="row">
                      <button
                        type="button"
                        className="btn btn-link"
                        onClick={() =>
                          showSource(referral.Practitioner.resource)
                        }
                      >
                        {referral.Practitioner.resource.resourceType}{' '}
                        <IoOpenOutline />
                      </button>
                    </th>
                    <td>
                      <div className="btn btn-outline-primary disabled">
                        {referral.Practitioner.resource.name[0].family},{' '}
                        {referral.Practitioner.resource.name[0].given[0]}
                      </div>
                    </td>
                    <td>
                      {/*                       <button className="btn btn-sm btn-primary disabled">
                        Look up UU User
                      </button> */}
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
                          {consent.resource.resourceType} <IoOpenOutline />
                        </button>
                      </th>
                      <td>
                        <span>
                          Consent status is{' '}
                          <div className="btn btn-outline-primary disabled">
                            {consent.resource.status}
                          </div>
                          . Scope is{' '}
                          <div className="btn btn-outline-primary disabled">
                            {consent.resource.scope?.text}
                          </div>
                          . Provision period is from
                          <div className="btn btn-outline-primary disabled">
                            {consent.resource.provision?.period?.start}
                          </div>
                          to
                          <div className="btn btn-outline-primary disabled">
                            {consent.resource.provision?.period?.end}
                          </div>
                        </span>
                      </td>
                      <td>
                        {/*                         <button className="btn btn-sm btn-primary disabled">
                          Check UU Consent
                        </button> */}
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
                          {documentReference.resourceType} <IoOpenOutline />
                        </button>
                      </th>
                      <td>
                        <span>
                          Document type is{' '}
                          <div className="btn btn-outline-primary disabled">
                            {documentReference.type.text}
                          </div>
                          . Document description is{' '}
                          <div className="btn btn-outline-primary disabled">
                            {documentReference.description}
                          </div>
                        </span>
                      </td>
                      <td>
                        {/*                         <button className="btn btn-sm btn-primary disabled">
                          Check Document Status
                        </button> */}
                      </td>
                    </tr>
                  );
                })}

                {referral.Binary?.map((binary, index) => {
                  return (
                    <tr key={index}>
                      <th scoope="row">
                        <button
                          type="button"
                          className="btn btn-link"
                          onClick={() => showSource(binary)}
                        >
                          {binary.resourceType} <IoOpenOutline />
                        </button>
                      </th>
                      <td colSpan="2">
                        <span>
                          Content type is{' '}
                          <div className="btn btn-outline-primary disabled">
                            {binary.contentType}
                          </div>
                          .
                        </span>{' '}
                        <div className="btn btn-link">
                          <a
                            download="Epic_CRN.pdf"
                            href={`data:application/pdf;base64,${binary.data}`}
                            title="Download pdf document"
                          >
                            Click to download PDF file <IoCloudDownloadSharp />
                          </a>
                        </div>
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
                          {communication.resource.resourceType}{' '}
                          <IoOpenOutline />
                        </button>
                      </th>
                      <td>
                        <span>
                          On{' '}
                          <div className="btn btn-outline-primary disabled">
                            {communication.resource?.sent}
                          </div>
                          , sent from{' '}
                          <div className="btn btn-outline-primary disabled">
                            {communication.resource?.sender.display}
                          </div>
                          to{' '}
                          <div className="btn btn-outline-primary disabled">
                            {communication.resource?.recipient[0].display}
                          </div>
                          .
                        </span>
                        {communication.resource.payload ? (
                          <div>
                            {' '}
                            Note message:{' '}
                            <div className="btn btn-outline-primary disabled">
                              {communication.resource.payload[0].contentString}
                            </div>
                          </div>
                        ) : (
                          <span> Note message is empty.</span>
                        )}
                        {communication.resource.payload &&
                        communication.resource.payload[1]?.contentReference ? (
                          <div>
                            {' '}
                            A{' '}
                            <div
                              className="btn btn-outline-primary"
                              onClick={() =>
                                showSource(referral.DocumentReference[0])
                              }
                            >
                              document <IoOpenOutline />
                            </div>{' '}
                            was attached to the communication.
                          </div>
                        ) : null}
                      </td>
                      <td>
                        {communication.resource.sender.reference.includes(
                          'Practitioner/'
                        ) ? (
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() =>
                              sendCommunicationNotification(
                                communication.resource.id
                              )
                            }
                          >
                            Send Communication Notification
                          </button>
                        ) : (
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() => showAddNoteWindow(referral)}
                          >
                            Add a new note
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </>
  );
}

export default ReferralSummary;
