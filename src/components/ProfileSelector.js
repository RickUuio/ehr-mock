const ProfileSelector = ({ profileName, switchProfile }) => {
  return (
    <div className="btn-group mb-2" role="group" aria-label="Basic mixed styles example">
      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="profileEpic"
        autocomplete="off"
        checked={profileName === "Epic"}
        onClick={() => {
          profileName = "Epic";
          switchProfile("Epic");
        }}
      />
      <label class="btn btn-outline-danger" for="profileEpic">
        Epic AppOrchard
      </label>

      <input
        type="radio"
        className="btn-check"
        name="btnradio"
        id="profileLogica"
        autocomplete="off"
        checked={profileName === "Logica"}
        onClick={() => {
          profileName = "Logica";
          switchProfile("Logica");
        }}
      />
      <label class="btn btn-outline-info" for="profileLogica">
        Logica Health
      </label>
    </div>
  );
};

export default ProfileSelector;
