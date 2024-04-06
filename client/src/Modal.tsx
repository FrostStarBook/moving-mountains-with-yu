import React, { useState } from 'react';

export interface Option {
  label: string;
  value: number;
  image: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (selectedOption: number) => void;
  options: Option[];
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, options }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionChange = (option: number) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      onSubmit(selectedOption);
      onClose();
    } else {
      alert('Please select an option');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Select the totem you want to buy</h2>
        <div className="options-container">
          {options.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                value={option.value}
                checked={selectedOption === option.value}
                onChange={() => handleOptionChange(option.value)}
              />
              <img src={option.image} alt={option.label} title={option.label} style={{ width: '100px', height: '100px' }}  />
            </label>
          ))}
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};