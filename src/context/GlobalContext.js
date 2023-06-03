import React from "react";

const GlobalContext = React.createContext();

export const GlobalContextProvider = ({ children }) => {
  
  const contextValue = {
    monthIndex: 0,
    setMonthIndex: (index) => {},
    daySelected: null,
    setDaySelected: (day) => {},
    showEventModal: false,
    setShowEventModal: () => {},
    showOutputModal: false,
    setShowOutputModal: () => {},
    showAllDeleteModal: false,
    setShowAllDeleteModal: () => {},
    dispatchCalEvent: ({ type, payload }) => {},
    savedEvents: [],
    selectedEvent: null,
    setSelectedEvent: () => {},
    defaultTransportationExpenses: 0,
    setDefaultTransportationExpenses: () => {}
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
