const ProfileSelector = ({ profileName, switchProfile }) => {
  return (
    <div className="btn-group mb-2" role="group" aria-label="Profile selector" id="profileGroup">
      <input
        type="radio"
        className="btn-check"
        name="btnProfile"
        id="profileEpic"
        autoComplete="off"
        defaultChecked={profileName === "Epic"}
        onClick={() => {
          profileName = "Epic";
          switchProfile("Epic");
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
        defaultChecked={profileName === "Epic2"}
        onClick={() => {
          profileName = "Epic2";
          switchProfile("Epic2");
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
        defaultChecked={profileName === "Logica"}
        onClick={() => {
          profileName = "Logica";
          switchProfile("Logica");
        }}
      />
      <label className="btn btn-outline-info" htmlFor="profileLogica">
        Beverly @Logica
      </label>
    </div>
  );
};

export default ProfileSelector;
