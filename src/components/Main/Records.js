import { Dialog } from "@headlessui/react";
import { timeToString } from "./../util";

const Records = ({ records, isOpen, onclick }) => {
  return (
    <Dialog className="modalRecords" open={isOpen} onClose={onclick}>
      <Dialog.Panel>
        <Dialog.Title>{"Where's the Pokemon top 10 Recordholders"}</Dialog.Title>
        <div className="recordGrid">
          <header className="recordLine bold">
            <div>Rank</div>
            <div>Username</div>
            <div>Date</div>
            <div>Time</div>
          </header>
          {records.map((record, index) => {
            return (
              <div className="recordLine" key={index}>
                <div>{index + 1}</div>
                <div>{record.username}</div>
                <div>{record.date}</div>
                <div>{timeToString(record.time)}</div>
              </div>
            );
          })}
        </div>
        <button onClick={onclick}>{"Close"}</button>
      </Dialog.Panel>
    </Dialog>
  );
};

export default Records;
