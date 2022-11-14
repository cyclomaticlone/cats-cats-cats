import { useState } from 'react';
import { useCombobox } from 'downshift';
import { Breed } from '../types/types';

type Props = {
  breeds: Breed[];
  setSelectedBreed: (breed: Breed) => void;
};

const getBreedsFilter = (inputValue: string | undefined) => {
  return (breed: Breed) => {
    return !inputValue || breed.name.toLowerCase().includes(inputValue);
  };
};

const BreedsDropdown = ({ breeds, setSelectedBreed }: Props) => {
  const [filteredBreeds, setFilteredBreeds] = useState(breeds);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectItem,
    selectedItem,
  } = useCombobox<Breed>({
    items: filteredBreeds,
    onInputValueChange({ inputValue }) {
      setFilteredBreeds(breeds.filter(getBreedsFilter(inputValue)));
    },
    itemToString(item) {
      return item?.name || '';
    },
    // selectedItem: selectedBreed,
    onSelectedItemChange: ({ selectedItem: newSelectedBreed }) => {
      if (newSelectedBreed) {
        setSelectedBreed(newSelectedBreed);
      }
    },
  });

  return (
    <div>
      <label
        style={
          {
            // color: selectedItem ? selectedItem : 'black',
          }
        }
        {...getLabelProps()}
      >
        Choose a breed:
      </label>
      <input style={{ padding: '4px' }} {...getInputProps()} />
      <button
        style={{ padding: '4px 8px' }}
        aria-label="toggle menu"
        {...getToggleButtonProps()}
      >
        {isOpen ? <>&#8593;</> : <>&#8595;</>}
      </button>
      <button
        style={{ padding: '4px 8px' }}
        aria-label="toggle menu"
        onClick={() => selectItem(null)}
      >
        &#10007;
      </button>
      <ul
        {...getMenuProps()}
        style={{
          listStyle: 'none',
          width: '100%',
          padding: '0',
          margin: '4px 0 0 0',
        }}
      >
        {isOpen &&
          filteredBreeds.map((item, index) => (
            <li
              style={{
                padding: '4px',
                backgroundColor: highlightedIndex === index ? '#bde4ff' : null,
              }}
              key={`${item.id}`}
              {...getItemProps({
                item,
                index,
              })}
            >
              {item.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BreedsDropdown;
