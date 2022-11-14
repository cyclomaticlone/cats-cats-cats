import { useState } from "react";
import { useCombobox } from "downshift";
import { Breed } from "../types/types";

type Props = {
  breeds: Breed[];
  setSelectedBreed: (breed: Breed) => void;
  isLoading: boolean;
};

const getBreedsFilter = (inputValue: string | undefined) => {
  return (breed: Breed) => {
    return !inputValue || breed.name.toLowerCase().includes(inputValue);
  };
};

const BreedsDropdown = ({ breeds, setSelectedBreed, isLoading }: Props) => {
  const [filteredBreeds, setFilteredBreeds] = useState(breeds);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    toggleMenu,
    selectedItem,
  } = useCombobox<Breed>({
    items: filteredBreeds,
    onInputValueChange({ inputValue }) {
      setFilteredBreeds(breeds.filter(getBreedsFilter(inputValue)));
    },
    itemToString(item) {
      return item?.name || "";
    },
    onSelectedItemChange: ({ selectedItem: newSelectedBreed }) => {
      if (newSelectedBreed) {
        setSelectedBreed(newSelectedBreed);
      }
    },
    id: "dogBreed",
  });

  return (
    <div className="w-full md:w-1/2 relative mb-4">
      <label
        {...getLabelProps()}
        className="block w-full text-lg text-orange-500 mb-1"
      >
        Select a breed:
      </label>
      <div className="w-full border-2  border-orange-500 flex">
        <input
          {...getInputProps({
            disabled: isLoading,
            placeholder: isLoading ? "Loading dog breeds..." : "",
            onFocus: () => {
              console.log("focus");
              setFilteredBreeds(breeds);
            },
          })}
          className="text-lg text-orange-500 bg-stone-900 hover:bg-stone-800 px-3 py-1 focus-visible:outline-none focus-visible:bg-stone-800 grow"
        />
        <button
          className="text-lg text-orange-500 bg-stone-900 hover:bg-stone-800 px-3 py-1"
          aria-label="toggle menu"
          {...getToggleButtonProps()}
          onClick={() => {
            if (selectedItem && !isOpen) {
              setFilteredBreeds(breeds);
            }
            toggleMenu();
          }}
        >
          {isOpen ? <>&#8593;</> : <>&#8595;</>}
        </button>
      </div>
      <ul
        {...getMenuProps()}
        className={`text-lg absolute z-50 -z w-full list-none text-orange-500 bg-stone-800  overflow-y-scroll   border-orange-500 border-t-0 ${
          isOpen ? "max-h-80 border-2" : ""
        }`}
      >
        {isOpen &&
          filteredBreeds.map((item, index) => (
            <li
              key={`${item.id}`}
              {...getItemProps({
                item,
                index,
              })}
              className={`px-3 py-1 cursor-pointer ${
                highlightedIndex === index ? "bg-stone-600" : ""
              }`}
            >
              {item.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BreedsDropdown;
