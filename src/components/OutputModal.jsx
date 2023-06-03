import React, { useContext, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import GlobalContext from "../context/GlobalContext";

export const OutputModal = () => {
  const { setShowOutputModal, savedEvents, monthIndex, defaultTransportationExpenses } = useContext(GlobalContext);
  const [showMessage1, setShowMessage1] = useState(false);
  const [showMessage2, setShowMessage2] = useState(false);
  const [showMessage3, setShowMessage3] = useState(false);

  const formattedMonthIndex = ((monthIndex % 12) + 12) % 12; // 負の値に対応

  const attendanceDateOutput = () => {
    const currentMonthAttendanceDates = savedEvents
      .filter((event) => new Date(event.day).getMonth() === formattedMonthIndex)
      .map((event) => new Date(event.day).getDate());
    if (currentMonthAttendanceDates.length > 0) {
      currentMonthAttendanceDates.sort((a, b) => a - b);
      return currentMonthAttendanceDates.join(", ");
    } else {
      return `${(formattedMonthIndex % 12 + 1)}月は出社していません`;
    };
  };

  const attendanceDateCount = () => {
    const currentMonthAttendanceDates = savedEvents
      .filter((event) => new Date(event.day).getMonth() === formattedMonthIndex)
      .map((event) => new Date(event.day).getDate());
    if(currentMonthAttendanceDates.length >= 0){
      return currentMonthAttendanceDates.length;
    }else{
      return "0";
    };
  };

  const commuteExpenses = () => {
    const commuteExpensesDates = savedEvents
      .filter((event) => new Date(event.day).getMonth() === formattedMonthIndex)
      .map((event) => event.transportationExpenses);
    if (commuteExpensesDates.length === 0) {
      return 0;
    } else {
      const sum = commuteExpensesDates.reduce((acc, val) => acc + Number(val), 0);
      return sum*2;
    };
  };

  const handleCopy1 = () => {
    navigator.clipboard.writeText(attendanceDateOutput());
    setShowMessage1(true);
    setTimeout(() => {
      setShowMessage1(false);
    }, 1500);
  };
  const handleCopy2 = () => {
    navigator.clipboard.writeText(attendanceDateCount());
    setShowMessage2(true);
    setTimeout(() => {
      setShowMessage2(false);
    }, 1500);
  };
  const handleCopy3 = () => {
    navigator.clipboard.writeText(commuteExpenses());
    setShowMessage3(true);
    setTimeout(() => {
      setShowMessage3(false);
    }, 1500);
  };

  const handleSubmit = () => {
    setShowOutputModal(false);
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-2xl w-1/2 h-1/2 flex flex-col">
        <div className="flex-grow">
          <p className="m-5 pt-2 text-gray-600 text-xl font-semibold pb-2">
            出社日
          </p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className="ml-5 pt-2 text-gray-600 text-xl font-semibold pb-2" style={{ flex: 8 }}>
              {attendanceDateOutput()}
            </p>
            <div style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button
                className="border border-gray-500 rounded pt-2 text-gray-600 text-l font-semibold pb-2 flex items-center"
                onClick={handleCopy1}
              >
                <p className="ml-2">copy</p>
                <MdContentCopy className="ml-1 mr-2" />
              </button>
              {showMessage1 && <p style={{ fontSize: '12px' }}>コピーしました</p>}
            </div>

          </div>
        </div>
        <div className="flex-grow">
          <p className="m-5 pt-2 text-gray-600 text-xl font-semibold pb-2">
            出社回数
          </p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className="ml-5 pt-2 text-gray-600 text-xl font-semibold pb-2" style={{ flex: 8 }}>
              {attendanceDateCount()} 回
            </p>
            <div style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button
                className="border border-gray-500 rounded pt-2 text-gray-600 text-l font-semibold pb-2 flex items-center"
                onClick={handleCopy2}
              >
                <p className="ml-2">copy</p>
                <MdContentCopy className="ml-1 mr-2" />
              </button>
              {showMessage2 && <p style={{ fontSize: '12px' }}>コピーしました</p>}
            </div>
          </div>
        </div>
        <div className="flex-grow">
          <p className="m-5 pt-2 text-gray-600 text-xl font-semibold pb-2">
            通勤費（往復通勤費 : {defaultTransportationExpenses * 2} 円）
          </p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p className="ml-5 pt-2 text-gray-600 text-xl font-semibold pb-2" style={{ flex: 8 }}>
              計 : {commuteExpenses()} 円
            </p>
            <div style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button
                className="border border-gray-500 rounded pt-2 text-gray-600 text-l font-semibold pb-2 flex items-center"
                onClick={handleCopy3}
              >
                <p className="ml-2">copy</p>
                <MdContentCopy className="ml-1 mr-2" />
              </button>
              {showMessage3 && <p style={{ fontSize: '12px' }}>コピーしました</p>}
            </div>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white flex-grow-0"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};