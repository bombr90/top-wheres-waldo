import React, { useRef, useState, useEffect } from "react";
import Timer from "./Main/Timer";
import Background from "./Main/Background";
import background from "./../assets/background/nx3en0780vu41.png";
import ListboxSelect from "./Main/ListboxSelect";
import AlertModal from "./Main/AlertModal";
import { Tagbox, Verifybox } from "./Main/Tagbox";
import Pokemon from "./Main/Pokemon";
import { randomSelection } from "./util";
import Display from "./Main/Display";
import DisplayDialogue from "./../assets/content/Display";
import Records from "./Main/Records";
import UserForm from "./Main/UserForm";

/////////////////////////////////////////////
// FireBase Code to Connect to backend //////
/////////////////////////////////////////////

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDoc,
  doc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBFvb3h1xAdFEvE9z-UAe2sLRvMG9b9img",
  authDomain: "wheres-waldo-832c2.firebaseapp.com",
  projectId: "wheres-waldo-832c2",
  storageBucket: "wheres-waldo-832c2.appspot.com",
  messagingSenderId: "287964894701",
  appId: "1:287964894701:web:d004c7ded6784a32d5c3e4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/////////////////////////////////////////////
// FireBase data validation and calls ///////
/////////////////////////////////////////////

const validatePoint = async (name, { x, y }) => {
  const buff = 25;
  const ref = doc(db, "wheresWaldo", "coordinateslist");
  const docSnap = await getDoc(ref);
  const obj = docSnap.data().coordinates.find((obj) => obj.name === name);
  const result =
    x > obj.x - buff &&
    x < obj.x + buff &&
    y > obj.y - buff &&
    y < obj.y + buff;
  return { name, result };
};

const addRecord = async (obj) => {
  try {
    const ref = doc(db, "wheresWaldo", "recordlist");
    await updateDoc(ref, { records: arrayUnion(obj) });
  } catch (e) {
    console.error("Error adding subdocument entry: ", e);
  }
};

const getRecords = async () => {
  try {
    const ref = doc(db, "wheresWaldo", "recordlist");
    const docSnap = await getDoc(ref);
    const sortedArray = docSnap.data().records.sort((a, b) => {
      if (a.time > b.time) return 1;
      if (a.time < b.time) return -1;
      return 0;
    });
    const trimmedArray = sortedArray.slice(0, 10);
    return trimmedArray;
  } catch (e) {
    console.error("Error querying document: ", e);
  }
};

/////////////////////////////////////////////
// Main /////////////////////////////////////
/////////////////////////////////////////////

const Main = () => {
  /////////////////////////////////////////////
  // References and State variables ///////////
  /////////////////////////////////////////////

  const timerRef = useRef(null);

  const [mouseState, setMouseState] = useState({
    x: null,
    y: null,
  });

  const [gameState, setGameState] = useState({
    username: "Player",
    date: new Date().toISOString().slice(0, 10),
    time: null,
    complete: false,
  });

  const [selectState, setSelectState] = useState({
    select: null,
    sprites: randomSelection(Pokemon, 5),
  });

  const [modalState, setModalState] = useState(DisplayDialogue.greeting);

  const [modalHistoryState, setModalHistoryState] = useState({
    display: false,
  });
  const [modalUserFormState, setModalUserFormState] = useState({
    display: false,
  });

  const [historyState, setHistoryState] = useState([]);
  const [timerState, setTimerState] = useState(0);
  const [showState, setShowState] = useState(false);
  const [verifiedState, setVerifiedState] = useState([]);
  const [editDisabled, setEditDisabled] = useState(false);
  const [startFlagState, setStartFlagState] = useState(true);

  /////////////////////////////////////////////
  // Use Effects //////////////////////////////
  /////////////////////////////////////////////

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimerState((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (selectState.sprites.length === 0) {
      setGameState((prev) => ({ ...prev, time: timerState, complete: true }));
      clearInterval(timerRef.current);
      timerRef.current = null;
      setModalState(DisplayDialogue.gameComplete);
      setEditDisabled(true);
    }
  }, [selectState.sprites]);

  useEffect(() => {
    if (gameState.complete === true) {
      addRecord(gameState);
    }
  }, [gameState.complete]);

  /////////////////////////////////////////////
  // Event Handlers ///////////////////////////
  /////////////////////////////////////////////

  const backgroundOnClickHandler = (event) => {
    const xPos = event.nativeEvent.offsetX;
    const yPos = event.nativeEvent.offsetY;
    setMouseState({ x: xPos, y: yPos });
    showListbox(mouseState);
  };

  const userFormOnChangeHandler = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    setGameState((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const listboxOnChangeHandler = async (event) => {
    const value = event;
    setSelectState((prev) => {
      return { ...prev, select: value };
    });
    setShowState(false);
    const { name, result } = await validatePoint(value, mouseState);
    if (result) {
      setModalState(DisplayDialogue.goodPick);
      setVerifiedState((prev) => [
        ...prev,
        { name: name, x: mouseState.x, y: mouseState.y },
      ]);
      setSelectState((prev) => {
        const newSprites = prev.sprites.filter((el) => el.name !== name);
        return { ...prev, sprites: newSprites };
      });
    } else {
      setModalState(DisplayDialogue.badPick);
    }
  };

  /////////////////////////////////////////////
  // Popup Visibility Control /////////////////
  /////////////////////////////////////////////

  const showListbox = ({ x, y }) => setShowState(true);
  const showUserForm = () => setModalUserFormState({ display: true });

  const showRecords = async () => {
    setModalHistoryState({ display: true });
    const newRecords = await getRecords();
    setHistoryState(newRecords);
  };

  const hideRecords = () => setModalHistoryState({ display: false });

  const hideModal = () => {
    setModalState((prev) => ({ ...prev, display: false }));
    if (startFlagState) {
      showUserForm();
    }
  };

  const hideUserForm = () => {
    setModalUserFormState({ display: false });
    if (startFlagState === true) {
      setStartFlagState(false);
      setTimerState(0);
    }
  };

  /////////////////////////////////////////////
  // JSX for Return ///////////////////////////
  /////////////////////////////////////////////

  const recordsModal = (
    <Records
      records={historyState}
      isOpen={modalHistoryState.display}
      onclick={hideRecords}
    />
  );

  const userFormModal = (
    <UserForm
      gameState={gameState}
      isOpen={modalUserFormState.display}
      onclick={hideUserForm}
      onchange={userFormOnChangeHandler}
    />
  );

  const childListbox = (
    <ListboxSelect
      show={showState}
      sprites={selectState.sprites}
      selected={selectState.select}
      onchange={listboxOnChangeHandler}
      topOffset={mouseState.y}
      leftOffset={mouseState.x}
    />
  );

  const childTagbox = (
    <Tagbox
      show={showState}
      topOffset={mouseState.y}
      leftOffset={mouseState.x}
    />
  );
  const childModal = (
    <AlertModal
      message={modalState.message}
      isOpen={modalState.display}
      onclick={hideModal}
    />
  );

  const childVerifyTags = verifiedState.map((obj) => (
    <Verifybox key={obj.name} topOffset={obj.y} leftOffset={obj.x} />
  ));

  /////////////////////////////////////////////
  // Return ///////////////////////////////////
  /////////////////////////////////////////////

  return (
    <div id="main">
      {childModal}
      {recordsModal}
      {userFormModal}
      <div id="subheader">
        <Timer timeSec={timerState} startFlag={startFlagState} />
        <div className="buttons">
          <button onClick={showRecords}>Check Records</button>
          <button onClick={showUserForm} disabled={editDisabled}>
            Edit Username
          </button>
        </div>
        <Display sprites={selectState.sprites} />
      </div>
      <Background
        background={background}
        clickCoord={backgroundOnClickHandler}
        childListbox={childListbox}
        childTagbox={childTagbox}
        childVerifiedTags={childVerifyTags}
      />
    </div>
  );
};

export default Main;
