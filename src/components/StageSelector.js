const StageSelector = ({ stageName, switchStage }) => {
  return (
    <div className="mx-1">
      {/*      <div className="form-group">
        <label className="row-form-label">STAGE</label>
        <div>
          <select
            className="row-form-select"
            value={stageName}
            onChange={(e) => switchStage(e)}
          >
            <option value="staging">Staging</option>
            <option value="training">Training</option>
            <option value="poc">POC</option>
          </select>
        </div>
      </div> */}
      <lable className="form-label px-2">UU SERVER :</lable>
      <div
        className="btn-group mb-2"
        role="group"
        aria-label="Stage selector"
        id="stageGroup"
      >
        <input
          type="radio"
          className="btn-check"
          name="btnStage"
          id="stageStaging"
          autoComplete="off"
          defaultChecked={stageName === 'staging'}
          onClick={() => {
            stageName = 'staging';
            switchStage('staging');
          }}
        />
        <label className="btn btn-outline-warning" htmlFor="stageStaging">
          Staging
        </label>
        <input
          type="radio"
          className="btn-check"
          name="btnStage"
          id="stageTraining"
          autoComplete="off"
          defaultChecked={stageName === 'training'}
          onClick={() => {
            stageName = 'training';
            switchStage('training');
          }}
        />
        <label className="btn btn-outline-success" htmlFor="stageTraining">
          Training
        </label>
        {/*         <input
          type="radio"
          className="btn-check"
          name="btnStage"
          id="stagePOC"
          autoComplete="off"
          defaultChecked={stageName === 'poc'}
          onClick={() => {
            stageName = 'poc';
            switchStage('poc');
          }}
        />
        <label className="btn btn-outline-info" htmlFor="stagePOC">
          POC
        </label> */}
      </div>
    </div>
  );
};

export default StageSelector;
