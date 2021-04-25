import { FaRegUser } from "react-icons/fa";

const Patient = ({patient}) => {
  return (
    <div className="p-2">
      <h4 style = {{ color: "yellow"}}>
          <FaRegUser /> {patient.firstName} {patient.lastName}
      </h4>
      <h6>
      <span className='badge badge-light'>DOB</span> : {patient.dob}
      <span>    </span> 
      <span className='badge badge-light'>Gender</span> : {patient.gender}
      </h6>
      <h6><span className='badge badge-light'>MRN</span> : {patient.mrn}</h6>
    </div>
  );
};

export default Patient;
