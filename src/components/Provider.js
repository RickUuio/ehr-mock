import { FaUserMd } from "react-icons/fa";

const Provider = ({ provider }) => {
  return (
    <div className="p-2">
      <h4 style={{ color: "HotPink" }}>
        {provider.firstName} {provider.lastName} <FaUserMd></FaUserMd>
      </h4>
      <h6><span className='badge badge-light'>FHIR ID</span> : {provider.fhirId}</h6>
      <h6><span className='badge badge-light'>UUID </span> : {provider.uuid}</h6>
    </div>
  );
};

export default Provider;
