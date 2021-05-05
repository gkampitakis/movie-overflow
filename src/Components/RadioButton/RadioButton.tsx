import React from 'react';
import './radioButton.scss';

interface RadioButtonProps {
  name: string;
  value: string;
  checked: string;
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioButton(props: RadioButtonProps) {
  const { name, checked, value, onClick } = props;

  return (
    <div
      className="radio_button"
      onClick={() => onClick({ target: { value } } as any)}
    >
      <input
        type="radio"
        data-testid={`${name}-radio`}
        id={value}
        name={name}
        value={value}
        checked={checked === value}
        onChange={onClick}
      />
      <label htmlFor={value}>{name}</label>
    </div>
  );
}
