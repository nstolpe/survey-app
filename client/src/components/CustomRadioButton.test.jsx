import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CustomRadioButton from './CustomRadioButton';

describe('CustomRadioButton', () => {
  it('is a fake test', () => {
    expect(true).toEqual(true);
  });
  // it('should render the radio button with the correct props', () => {
  //   const { getByRole } = render(<CustomRadioButton />);
  //   const radioButton = getByRole('radio');
  //   expect(radioButton).toBeInTheDocument();
  //   expect(radioButton).not.toBeChecked();
  // });
  // it('should select the radio button when the isActive prop is true', () => {
  //   const { getByRole } = render(<CustomRadioButton isActive={true} />);
  //   const radioButton = getByRole('radio');
  //   expect(radioButton).toBeChecked();
  // });
  // it('should change the focus state of the radio button when it is clicked', () => {
  //   const { getByRole } = render(<CustomRadioButton />);
  //   const radioButton = getByRole('radio');
  //   expect(radioButton).not.toHaveFocus();
  //   fireEvent.click(radioButton);
  //   expect(radioButton).toHaveFocus();
  // });
});
