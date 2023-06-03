import { useState, useEffect, useContext } from "react";

import { getMonth } from "./util";
import { CalendarHeader } from "./components/CalendarHeader";
import { Month } from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import { EventModal } from "./components/EventModal";
import { OutputModal } from "./components/OutputModal";
import { AllDeleteModal } from "./components/AllDeleteModal";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, showOutputModal, showAllDeleteModal} = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      {showAllDeleteModal && <AllDeleteModal/>}
      {showOutputModal && <OutputModal/>}
      {showEventModal && <EventModal />}
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1 mx-5 mb-5">
          <Month month={currentMonth}/>
        </div>
      </div>
    </>
  );
}

export default App;