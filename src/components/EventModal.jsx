import React, { useState, useContext } from "react";
import { MdDeleteForever, MdClose } from "react-icons/md";
import GlobalContext from "../context/GlobalContext";

export const EventModal = () => {
  const { daySelected, setShowEventModal, dispatchCalEvent, selectedEvent, defaultTransportationExpenses } = useContext(GlobalContext);
  const [transportationExpenses, setTransportationExpenses] = useState(selectedEvent ? selectedEvent.transportationExpenses : defaultTransportationExpenses);

  const handleSubmit = (e) => {
    e.preventDefault();
    const calendarEvent = {
      transportationExpenses: transportationExpenses,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }
    setShowEventModal(false);
  };

  const handleKeyPress = (e) => {
    const keyCode = e.which || e.keyCode;
    const isValidKey = keyCode >= 48 && keyCode <= 57; // 数字のキーコードの範囲：48から57
    if (!isValidKey) {
      e.preventDefault();
    }
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/6">
        <header className="bg-gray-100 px-4 py-2 flex justify-end">
          <div className="text-gray-400">
            {selectedEvent && (
              <button
                onClick={() => {
                  dispatchCalEvent({ type: "delete", payload: selectedEvent });
                  setShowEventModal(false);
                }}
              >
                <MdDeleteForever />
              </button>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <MdClose />
            </button>
          </div>
        </header>
        <div className="p-2">
          <div className="grid grid-cols-1/7 items-end gap-y-7">
            <div className="flex items-center justify-between">
              <p className="pt-3 text-blue-600 text-4xl font-semibold pb-2 w-full" style={{ flexBasis: '40%' }}>
                出社
              </p>
              <div className="flex items-center" style={{ flexBasis: '60%' }}>
              <input
                type="text"
                name="transportationExpenses"
                placeholder="交通費"
                value={transportationExpenses*2}
                required
                className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                style={{ textAlign: "center", width: '100%'}}
                onChange={(e) => setTransportationExpenses(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <p className="pt-2 text-gray-600 text-xl font-semibold pb-2 w-full"  style={{ flexBasis: '10%' }}>
                円
              </p>
              </div>
            </div>
            <p>{daySelected.format("MMMM DD (ddd)")}</p>

          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};