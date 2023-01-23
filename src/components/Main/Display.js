const Display = ({sprites}) => {

  return (
    <div id="display" className={sprites.length > 0 ? '':'hide'}>
      <h2>Find list:</h2>
      {sprites.map((sprite) => {
        return (
          <div className="profileImage" key={sprite.name}>
            <img src={sprite.image} alt=""></img>
          </div>
        );
      })}
    </div>
  );
}

export default Display