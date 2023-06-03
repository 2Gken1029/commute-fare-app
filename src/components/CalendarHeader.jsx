import React, { useContext, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import GlobalContext from "../context/GlobalContext";

import dayjs from "dayjs";

export const CalendarHeader = (props) => {
  const { 
    monthIndex, 
    setMonthIndex, 
    defaultTransportationExpenses, 
    setDefaultTransportationExpenses, 
    savedEvents, 
    dispatchCalEvent,
    setShowOutputModal,
    setShowAllDeleteModal
  } = useContext(GlobalContext);

  useEffect(() => {
    // ローカルストレージから値を読み込む関数
    const loadDefaultTransportationExpenses = () => {
      const storedValue = localStorage.getItem("defaultTransportationExpenses");
      if (storedValue) {
        setDefaultTransportationExpenses(storedValue);
      }
    };
    loadDefaultTransportationExpenses(); // ローカルストレージから値を読み込む
  }, []); // 空の依存配列を指定して初回レンダリング時のみ実行

  const handleDefaultTransportationExpensesChange = (value) => {
    setDefaultTransportationExpenses(value);
    localStorage.setItem("defaultTransportationExpenses", value);
  };

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };
  const handelNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };
  const handleReset = () => {
    // 現在の月を取得
    setMonthIndex(dayjs().month());
  };

  const handleKeyPress = (e) => {
    const keyCode = e.which || e.keyCode;
    const isValidKey = keyCode >= 48 && keyCode <= 57; // 数字のキーコードの範囲：48から57
    if (!isValidKey) {
      e.preventDefault();
    }
  };

  const handleEvent = () => {
    setShowOutputModal(true);
  };

  const resetEvent = () => {
    if(savedEvents.length > 0){
      setShowAllDeleteModal(true);
    };
  };

  const formattedMonthIndex = ((monthIndex % 12) + 12) % 12 + 1; // 負の値に対応

  return (
    <header className="px-4 py-2 flex items-center">
      <h1 className="mr-10 text-xl text-gray-500 fond-bold">Calendar</h1>
      <button onClick={handleReset} className="border rounded py-2 px-4 mr-5 hover:bg-gray-200">
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <span className="cursor-pointer text-gray-600 mx-2">
          <MdChevronLeft />
        </span>
      </button>
      <button onClick={handelNextMonth}>
        <span className="cursor-pointer text-gray-600 mx-2">
          <MdChevronRight />
        </span>
      </button>
      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
      <div className="flex items-center">
        <input
          type="text"
          name="transportationExpenses"
          placeholder="交通費（片道）"
          value={defaultTransportationExpenses}
          pattern="[0-9]*"
          required
          className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
          style={{ textAlign: "center", flexBasis: '60%', marginLeft: '5%' }}
          onChange={(e) => handleDefaultTransportationExpensesChange(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <p className="pt-2 text-gray-600 text-xl font-semibold pb-2 w-full" style={{ flexBasis: '10%' }}>
          円
        </p>
      </div>
      <button onClick={handleEvent} className="mr-1 border border-gray-500 rounded pt-2 text-gray-600 text-xl font-semibold p-3 hover:bg-gray-200">
      {formattedMonthIndex}月の出社情報を出力する
      </button>
      <button onClick={resetEvent} className="ml-1 rounded pt-1.5 text-white bg-red-500 text-lg font-semibold p-2 hover:bg-red-600">
        出社情報を全削除する
      </button>
    </header>
  );
};