//////////////////////////////////////
///Helper Functions///////////////////
//////////////////////////////////////

function randomSelection(arr, n) {
  if (n > arr.length) {
    return arr;
  }
  const newArr = [];
  const copyArr = JSON.parse(JSON.stringify(arr));
  for (let i = 0; i < n; i++) {
    const obj = copyArr.splice(Math.floor(Math.random() * copyArr.length), 1);
    newArr.push(...obj);
  }
  return newArr;
}

function shuffle(arr) {
  const newArr = randomSelection(arr, arr.length);
  return newArr;
}

function timeToString(timeSec) {
  return `${Math.floor(timeSec / 3600)
    .toString()
    .padStart(2, "0")}:${(Math.floor(timeSec / 60) % 60)
    .toString()
    .padStart(2, "0")}:${(timeSec % 60).toString().padStart(2, "0")}`;
}

export { randomSelection, shuffle, timeToString };
