const ProfileSelector = ({ profileName, switchProfile }) => {
  return (
    <div className="mx-1">
      <lable className="form-label px-2">FHIR SERVER :</lable>
      <div
        className="btn-group mb-2"
        role="group"
        aria-label="Profile selector"
        id="profileGroup"
      >
        <input
          type="radio"
          className="btn-check"
          name="btnProfile"
          id="profileEpic"
          autoComplete="off"
          defaultChecked={profileName === 'Epic'}
          onClick={() => {
            profileName = 'Epic';
            switchProfile('Epic');
          }}
        />
        <label className="btn btn-outline-danger" htmlFor="profileEpic">
          Calvin @Epic
        </label>
        <input
          type="radio"
          className="btn-check"
          name="btnProfile"
          id="profileEpic2"
          autoComplete="off"
          defaultChecked={profileName === 'Epic2'}
          onClick={() => {
            profileName = 'Epic2';
            switchProfile('Epic2');
          }}
        />
        <label className="btn btn-outline-danger" htmlFor="profileEpic2">
          Beverly @Epic
        </label>
        <input
          type="radio"
          className="btn-check"
          name="btnProfile"
          id="profileLogica"
          autoComplete="off"
          defaultChecked={profileName === 'Logica'}
          onClick={() => {
            profileName = 'Logica';
            switchProfile('Logica');
          }}
        />
        <label className="btn btn-outline-info" htmlFor="profileLogica">
          Beverly @Logica
        </label>
        <input
          type="radio"
          className="btn-check"
          name="btnProfile"
          id="profileLogica2"
          autoComplete="off"
          defaultChecked={profileName === 'Logica2'}
          onClick={() => {
            profileName = 'Logica2';
            switchProfile('Logica2');
          }}
        />

        {profileName === 'Logica2' ? (
          <input
            type="text"
            className="input-group-text text-primary"
            placeholder="Patient FHIR ID"
            size="14"
            style={{ borderColor: '#5bc0de', fontWeight: 'bold' }}
            onBlur={(e) => {
              profileName = 'Logica2';
              switchProfile('Logica2', e.target.value);
            }}
          ></input>
        ) : (
          <label className="btn btn-outline-info" htmlFor="profileLogica2">
            Enter ID
          </label>
        )}
      </div>
    </div>
  );
};

export default ProfileSelector;
