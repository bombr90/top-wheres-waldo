import { Dialog } from "@headlessui/react";
import { timeToString } from "./../util";

const UserForm = ({ gameState, isOpen, onchange, onclick }) => {

  return (
    <Dialog className="modalForm" open={isOpen} onClose={onclick}>
      <Dialog.Panel>
        <Dialog.Title>Please input your name/handle</Dialog.Title>
        <input
          type="text"
          name="username"
          value={gameState.username}
          onChange={onchange}
          placeholder="Player"
          maxLength={16}
          required
        ></input>
        <div className="bold">Preview:</div>
        <div className="recordGrid">
          <header className="recordLine bold">
            <div>Rank</div>
            <div>Username</div>
            <div>Date</div>
            <div>Time</div>
          </header>
          <div className="recordLine bold">
            <div>TBD</div>
            <div>{gameState.username}</div>
            <div>{gameState.date}</div>
            <div>{gameState.time === null ? "TBD" : timeToString(gameState.time)}</div>
          </div>
        </div>
        <button onClick={onclick}>{"Submit"}</button>
      </Dialog.Panel>
    </Dialog>
  );
}

export default UserForm