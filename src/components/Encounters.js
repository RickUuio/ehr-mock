import {FcRefresh, FcCalendar} from 'react-icons/fc'
import {FaCalendarCheck} from 'react-icons/fa'

const Encounters = ({ encounterList, currentEncounter = 'smart-2', changeCurrentEncounter, refreshEncounters }) => {
  const refresh = () => {
    console.log("Retrieving patient's encounters");
    refreshEncounters();
  };

  const setCurrentEncounter = (encounterSelected) => {
    changeCurrentEncounter(encounterSelected)
  }

  return (
    <div className="encounter col-md-3 col-lg-2 mx-0 px-0">
      <div
        className="btn btn-default btn-lg btn-block table-hover mx-0"
        onClick={refresh}
      >
        All Encounters
        <div className="badge badge-primary mx-2">{encounterList.length}</div>
        <FcRefresh />
      </div>

      <dl>
        {encounterList.map((encounter, index) => {
          const selected = (encounter.resource.id === currentEncounter)
          const eClassName = selected
            ? "row table-hover m-0 px-2 selected"
            : "row table-hover m-0 px-2";
          const visible = selected
            ? "visible"
            : "invisible";

            return <div key={index} className={eClassName} onClick={() => setCurrentEncounter(encounter.resource.id)}>
            <dt>
              <a href={encounter.fullUrl}>{encounter.resource.id} <FaCalendarCheck className={visible} /></a>
            </dt>
            <dd>
              { <div>{encounter.resource.period.start.split("T")[0]}</div> }
              { <div> {encounter.resource.class.display}</div> }
            </dd>
          </div>
        }
        )
      }
      </dl>
    </div>
  );
};

export default Encounters;
