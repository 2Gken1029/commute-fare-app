import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";

import dayjs from "dayjs";

export const Day = (props) => {
  const { day, rowIdx } = props;
  const [dayEvents, setDayEvents] = useState([]);
  const { setDaySelected, setShowEventModal, savedEvents, setSelectedEvent } =
    useContext(GlobalContext);

  // 今日の日付を色付けする
  const getCurrentDayClass = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  };

  // 登録データを日付が一致する日に表示
  useEffect(() => {
    const events = savedEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [savedEvents, day]);

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {/* 1行目に曜日を表示 */}
        {rowIdx === 0 && <p className="text-sm mt-1">{day.format("ddd")}</p>}
        <p className={`text-sm p-1 my-1 text-center" ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer m-2"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-neutral-100 p-1 text-gray-600 text-sm flex items-center justify-center h-auto rounded truncate`}
            style={{ height: '100%' }}
          >
            <p className={`pt-3 font-bold text-4xl text-blue-600`}>
              {"出社"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};