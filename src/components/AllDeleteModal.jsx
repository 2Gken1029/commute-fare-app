import React, { useContext } from "react";
import { MdOutlineWarningAmber } from "react-icons/md";
import GlobalContext from "../context/GlobalContext";

export const AllDeleteModal = () => {
  const { setShowAllDeleteModal, dispatchCalEvent } = useContext(GlobalContext);

  const cancelEvent = () => {
    setShowAllDeleteModal(false);
  };

  const resetEvent = () => {
    setShowAllDeleteModal(false);
    dispatchCalEvent({ type: "alldelete" })
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center">
      <div className="bg-white rounded-lg shadow-2xl w-1/4 h-1/4 flex flex-col mt-10">
        <div className="flex-grow flex flex-col items-center justify-center text-center">
          < MdOutlineWarningAmber className="text-4xl"/>
          <p className="text-xl text-black font-bold">削除すると元には戻せません</p>
          <p className="text-xl text-black font-bold">本当に削除しますか？</p>
        </div>
        <div className="flex justify-between px-4 pb-4">
      <button
        type="submit"
        onClick={cancelEvent}
        className="bg-white  border border-gray-500 text-black px-6 py-2 rounded flex-grow m-2 hover:bg-gray-200"
      >
        キャンセル
      </button>
      <button
        type="submit"
        onClick={resetEvent}
        className="bg-red-500  border border-gray-500 px-6 py-2 rounded text-white flex-grow m-2 hover:bg-red-600"
      >
        削除
      </button>
    </div>
      </div>
    </div>
  );
};