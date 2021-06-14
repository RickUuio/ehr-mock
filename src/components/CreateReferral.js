import { useState } from "react";
import { GrAttachment } from "react-icons/gr";

export const CreateReferral = ({ onCreate, toggleShowNewReferral }) => {
  const [referredToGroupIds, setReferredToGroupIds] = useState("");
  const [referredFromGroupId, setReferredFromGroupId] = useState("");
  const [networkId, setNetworkId] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [attachDocument, setAttachDocument] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!serviceType) {
      alert("Please select a service for the referral!");
      return;
    }

    onCreate({
      serviceType,
      description,
      referredToGroupIds,
      referredFromGroupId,
      networkId,
      attachDocument,
    });

    setReferredToGroupIds("");
    setReferredFromGroupId("demo-hospital");
    setNetworkId("demo-network");
    setServiceType("");
    setDescription("");
    setAttachDocument(false);
  };

  const cancelReferralCreation = () => {
    toggleShowNewReferral();
  };
  return (
    <div className="newReferral">
      <form className="add-form" onSubmit={onSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <div className="form-group">
              <label className="col-form-label">SENDING NETWORK</label>
              <div>
                <input
                  className="form-select"
                  type="text"
                  placeholder="Healthy Demo Network"
                  readOnly
                  disabled
                  value={networkId}
                  onChange={(e) => setNetworkId(e.target.value)}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="col-form-label">RECEIVING NETWORK</label>
              <div>
                <input
                  className="form-select"
                  type="text"
                  readOnly
                  disabled
                  placeholder="Healthy Demo Network"
                  value={networkId}
                  onChange={(e) => setNetworkId(e.target.value)}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="col-form-label">SENDER</label>
              <div>
                <input
                  className="form-select"
                  type="text"
                  readOnly
                  disabled
                  placeholder="Local Hospital Center"
                  value={referredFromGroupId}
                  onChange={(e) => setReferredFromGroupId(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="form-group">
              <label className="col-form-label">SERVICE TYPE</label>
              <div>
                <select
                  className="form-select"
                  value={serviceType.value}
                  onChange={(e) =>
                    setServiceType({
                      value: e.target.value,
                      text: e.target.options[e.target.selectedIndex].text,
                    })
                  }
                >
                  <option>Select a service ...</option>
                  <option value="f020d616-5016-4fb7-9fad-91d8d99cd7a1">
                    Emergency Food
                  </option>
                  <option value="f6760383-7fc4-442b-b686-fc5055bfec06">
                    Emergency Housing
                  </option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="col-form-label">RECEIPIENT</label>
              <div>
                <select
                  className="form-select"
                  value={referredToGroupIds.value}
                  onChange={(e) =>
                    setReferredToGroupIds({
                      value: e.target.value,
                      text: e.target.options[e.target.selectedIndex].text,
                    })
                  }
                >
                  <option>Select an organization ...</option>
                  <option value="14742">Housing California</option>
                  <option value="14733">River City Food Bank</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="col-form-label">INITIAL COMMUNICATION</label>
              <div>
                <textarea
                  className="form-control"
                  rows="3"
                  cols="50"
                  placeholder="Enter a description for the referral"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-check form-switch mx-2 text-start">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  checked={attachDocument}
                  onChange={(e) => setAttachDocument(e.target.checked)}
                />
                <label
                  className="form-check-label"
                  for="flexSwitchCheckDefault"
                >
                  Attach document to the communication{" "}
                  <GrAttachment></GrAttachment>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="row d-inline">
          <input
            value="Cancel"
            className="btn btn-warning col-md-6 mt-4"
            onClick={cancelReferralCreation}
            readOnly
          />

          <input
            value="Submit"
            className="btn btn-primary col-md-6 mt-4"
            onClick={onSubmit}
            readOnly
          />
        </div>
      </form>
    </div>
  );
};

export default CreateReferral;
