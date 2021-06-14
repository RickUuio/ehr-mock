import { FaRegUser } from "react-icons/fa";

const Patient = ({patient}) => {
  return (
    <div className="p-2">
      <h4 style = {{ color: "yellow"}}>
          <FaRegUser />
          {patient.firstName} {patient.lastName}
      </h4>
      <h6>
      <span className='badge bg-light text-dark'>DOB</span> : {patient.dob}
      <span>    </span> 
      <span className='badge bg-light text-dark'>Gender</span> : {patient.gender}
      </h6>
      <h6><span className='badge bg-light text-dark'>MRN</span> : {patient.mrn}</h6>
      <h6><span className='badge bg-light text-dark'>FHIR ID</span> : {patient.fhirId}</h6>
    </div>
  );
};

export default Patient;
