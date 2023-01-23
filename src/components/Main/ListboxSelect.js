import { Listbox } from '@headlessui/react'

const ListboxSelect = ({ show, sprites, selected, onchange, topOffset, leftOffset }) => {
  const top = topOffset
  const left = leftOffset + 30
  return (
    <div
      id="listboxSelect"
      className={show ? "" : "hide"}
      style={{ position: "absolute", top, left }}
    >
      <Listbox value={selected} name="select" onChange={onchange}>
        <Listbox.Button className="listboxButton">
          I choose you...
        </Listbox.Button>
        <Listbox.Options className="listboxOptions">
          {sprites.map(sprite => {
              return (<Listbox.Option
                key={sprite.name}
                name={sprite.name}
                value={sprite.name}
                className="listboxOption"
              >
                <img src={sprite.image} alt=""></img>
              </Listbox.Option>)
          })}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default ListboxSelect