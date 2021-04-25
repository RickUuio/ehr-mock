import { useState } from "react";

export const CreateReferral = ({ onCreate, toggleShowNewReferral }) => {
  const [referredToGroupIds, setReferredToGroupIds] = useState("");
  const [referredFromGroupId, setReferredFromGroupId] = useState("");
  const [networkId, setNetworkId] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");

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
    });

    setReferredToGroupIds("");
    setReferredFromGroupId("demo-hospital");
    setNetworkId("demo-network");
    setServiceType("");
    setDescription("");
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
                  className="form-control"
                  type="text"
                  placeholder="Healthy Demo Network"
                  readOnly
                  value={networkId}
                  onChange={(e) => setNetworkId(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="col-form-label">SENDER</label>
              <div>
                <input
                  className="form-control"
                  type="text"
                  readOnly
                  placeholder="Local Hospital Center"
                  value={referredFromGroupId}
                  onChange={(e) => setReferredFromGroupId(e.target.value)}
                />
              </div>
            </div>
          
            <div className="form-group">
              <label className="col-form-label">SERVICE TYPE</label>
              <div>
                <select
                  className="form-control"
                  value={serviceType.value}
                  onChange={(e) => setServiceType({value: e.target.value, text: e.target.options[e.target.selectedIndex].text})}
                >
                  <option>Select a service ...</option>
                  <option value="e281c5da-5fbd-41ea-a32e-6efc32f0a156">Clothing and Household Goods</option>
                  <option value="ba3eb996-9647-453f-abe4-c04dc84c319e">Food Assistance</option>
                  <option value="5c7dec03-e340-4b48-8d4b-f24af7410a3a">Housing and Shelter</option>
                  <option value="eceb120f-4888-4c42-957f-c90fd5582f83">Transportation</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-6">

          <div className="form-group">
              <label className="col-form-label">RECEIVING NETWORK</label>
              <div>
                <input
                  className="form-control"
                  type="text"
                  readOnly
                  placeholder="Healthy Demo Network"
                  value={networkId}
                  onChange={(e) => setNetworkId(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="col-form-label">RECEIPIENT</label>
              <div>
                <select
                  className="form-control"
                  value={referredToGroupIds.value}
                  onChange={(e) => setReferredToGroupIds({value: e.target.value, text: e.target.options[e.target.selectedIndex].text})}
                >
                  <option>Select an organization ...</option>
                  <option value="b8835025-bf3f-455f-9b1d-5efda6772b98">BusRides Sustainable Transportation Act</option>
                  <option value="ebea1516-6343-4f76-980f-a637e580cfd3">Housing California</option>
                  <option value="3491714a-aa7e-4a9c-a4d7-c8fe7c6b0bc0">River City Food Bank</option>
                  <option value="9dd692cb-4eb3-46cb-a178-ab9eda2c83f6">St. Mary's Shelter</option>
                </select>
              </div>
            </div>
            

            <div className="form-group">
              <label className="col-form-label">DESCRIPTION</label>
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
          </div>
        </div>

        <div className="row my-2 float-right">

        <input
            value="Cancel"
            className="btn btn-warning"
            onClick={cancelReferralCreation}
            readOnly
          />

          <input
            value="Submit"
            className="btn btn-primary"
            onClick={onSubmit}
            readOnly
          />

        </div>
      </form>
    </div>
  );
};

export default CreateReferral;
