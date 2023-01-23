const Tagbox = ({ show, topOffset, leftOffset }) => {
  // hotspot is a 50px*50px area 
  const top = topOffset - 25
  const left = leftOffset - 25

  return (
    <div
      id="tagbox"
      className={show ? "" : "hide"}
      style={{ position: "absolute", top, left }}
    >
    </div>
  );
}

const Verifybox = ({ topOffset, leftOffset }) => {
  // hotspot is a 50px*50px area
  const top = topOffset - 25;
  const left = leftOffset - 25;

  return (
    <div
      className={'validTarget'}
      style={{ position: "absolute", top, left }}
    ></div>
  );
};

export  {Tagbox, Verifybox} 