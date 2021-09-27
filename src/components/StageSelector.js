const StageSelector = ({ stageName, switchStage }) => {
  return (
    <div className="mx-1">
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
        <input
          type="radio"
          className="btn-check"
          name="btnStage"
          id="stageDevqa"
          autoComplete="off"
          defaultChecked={stageName === 'devqa'}
          onClick={() => {
            stageName = 'devqa';
            switchStage('devqa');
          }}
        />
        <label className="btn btn-outline-danger" htmlFor="stageDevqa">
          Dev QA
        </label>
        <input
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
        </label>

        {/*         <input
          type="radio"
          className="btn-check"
          name="btnStage"
          id="stageRick"
          autoComplete="off"
          defaultChecked={stageName === 'rick'}
          onClick={() => {
            stageName = 'rick';
            switchStage('rick');
          }}
        />
        <label className="btn btn-outline-info" htmlFor="stageRick">
          Rick
        </label> */}
      </div>
    </div>
  );
};

export default StageSelector;
