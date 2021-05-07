const ProfileSelector = ({ profileName, switchProfile }) => {
  return (
    <div className="btn-group mb-2" role="group" aria-label="Basic mixed styles example">
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="profileEpic"
        autoComplete="off"
        defaultChecked={profileName === "Epic"}
        onClick={() => {
          profileName = "Epic";
          switchProfile("Epic");
        }}
      />
      <label class="btn btn-outline-danger" htmlFor="profileEpic">
        Epic AppOrchard
      </label>

      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="profileLogica"
        autoComplete="off"
        defaultChecked={profileName === "Logica"}
        onClick={() => {
          profileName = "Logica";
          switchProfile("Logica");
        }}
      />
      <label className="btn btn-outline-info" htmlFor="profileLogica">
        Logica Health
      </label>
    </div>
  );
};

export default ProfileSelector;
