const Background = ({background, clickCoord, childListbox, childTagbox, childVerifiedTags}) => {

  const mainImage = (
    <img id='mainImage' src={background} alt="" onClick={clickCoord}></img>
  );
   
  return (
    <div id="background">
      {childListbox}
      {childTagbox}
      {childVerifiedTags}
      {mainImage}
    </div>
  );
}

export default Background