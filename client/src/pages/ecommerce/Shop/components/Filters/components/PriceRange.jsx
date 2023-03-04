import { useState } from "react";
import { priceFormatter } from "../../../../../../adapters/priceFormatter";
import s from "./rangeStyles.module.css";

function PriceRange({ title, min, max, onSet, mobile = true }) {
  const [minVal, setMinVal] = useState(parseInt(min));
  const [maxVal, setMaxVal] = useState(parseInt(max));
  const [active, setActive] = useState(false);

  const [show, setShow] = useState(mobile);
  const toggleShow = () => {
    mobile && setShow((prev) => !prev);
  };

  const handleMinValue = ({ target }) => {
    if (parseInt(target.value) < parseInt(maxVal))
      setMinVal(parseInt(target.value));
  };
  const handleMaxValue = ({ target }) => {
    if (parseInt(target.value) > parseInt(minVal))
      setMaxVal(parseInt(target.value));
  };
  const handleSetFilter = () => {
    if (!active) {
      //si no esta activo, aplica el rango y resetea min,max
      onSet([minVal, maxVal]);
    } else {
      // si el rango esta activo, lo desactiva
      onSet("");
    }
    setActive((prev) => !prev); // toggle de active
  };

  return (
    <div className="flex flex-col">
      <hr className="my-2 h-px border-0 bg-gray-400" />
      <button
        className={`bg-ultravioletLight  text-lg font-bold uppercase tracking-wider text-black  ${
          mobile ? "hover:text-yellow-600" : "cursor-default"
        }`}
        type="button"
        id="filters-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="filters-dropdown"
        data-dropdown-placement="bottom"
        onClick={toggleShow}
      >
        {title}
      </button>

      <ul
        className={` ${
          !show ? "hidden" : "h-fit"
        } flex flex-col overflow-hidden text-center md:block`}
      >
        {!active ? (
          <>
            <li
              className={`my-1 mx-auto flex  cursor-pointer font-semibold lg:flex-col`}
            >
              <label htmlFor="minRange">Mínimo: </label>
              <input
                type="range"
                min={min}
                max={max}
                step={10}
                onChange={handleMinValue}
                value={minVal}
                className={`relative top-1 appearance-none ${s.inputRange} mb-2 mt-1`}
              />
              <p className="ml-2">{priceFormatter(minVal)}</p>
            </li>
            <li
              className={`my-1 mx-auto  flex cursor-pointer font-semibold lg:flex-col`}
            >
              <label htmlFor="maxRange">Máximo: </label>
              <input
                id="maxRange"
                type="range"
                min={min}
                max={max}
                step={10}
                onChange={handleMaxValue}
                value={maxVal}
                className={`relative top-1 appearance-none ${s.inputRange} mb-2 mt-1`}
              />
              <p className="ml-2">{priceFormatter(maxVal)}</p>
            </li>
          </>
        ) : (
          <>
            <span className=" -tracking-[1px]">Actual:</span>
            <span className="ml-1 font-semibold">
              ${minVal}-${maxVal}
            </span>
          </>
        )}

        <button
          className=" py-1 text-sm font-bold text-blue-500"
          onClick={handleSetFilter}
        >
          {active ? "Revertir" : "Aplicar"}
        </button>
      </ul>
    </div>
  );
}

export default PriceRange;
