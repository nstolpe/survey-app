import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Options from 'Components/Options';

describe('Components/Options', () => {
  it('calls `setActiveOption` with `defaults[n].name` when the radio input associated with the default option is clicked', async () => {
    const setActiveOption = jest.fn();
    const type = 'food';
    const defaults = [
      {
        id: 'one',
        name: 'pizza',
      },
      {
        id: 'two',
        name: 'grapes',
      },
    ];
    const user = userEvent.setup();
    const component = render(
      <Options
        defaults={defaults}
        setActiveOption={setActiveOption}
        type={type}
      />
    );
    const optionOne = component.queryByTestId('pizza') as HTMLElement;
    await user.click(optionOne);
    expect(setActiveOption).toHaveBeenCalledWith('pizza');
  });

  it('calls `setActiveOption` with `null` when the radio input associated with the custom text input is clicked and the text input is empty', async () => {
    const setActiveOption = jest.fn();
    const type = 'food';
    const user = userEvent.setup();
    const component = render(
      <Options setActiveOption={setActiveOption} type={type} />
    );
    const otherOption = component.queryByTestId(
      `${type}-option-other`
    ) as HTMLElement;
    await user.click(otherOption);
    expect(setActiveOption).toHaveBeenCalledWith(null);
  });

  it('enables and focuses the other option text input when its radio button is clicked', async () => {
    const setActiveOption = jest.fn();
    const type = 'food';
    const user = userEvent.setup();
    const component = render(
      <Options setActiveOption={setActiveOption} type={type} />
    );
    const otherOption = component.queryByTestId(`${type}-option-other`);
    const otherInput = component.queryByTestId('other-input');
    expect(otherInput).toBeDisabled();
    await user.click(otherOption as HTMLElement);
    expect(otherInput).not.toBeDisabled();
  });

  it('enables and focuses the other option text input when its click interceptor is clicked', async () => {
    const setActiveOption = jest.fn();
    const type = 'food';
    const user = userEvent.setup();
    const component = render(
      <Options setActiveOption={setActiveOption} type={type} />
    );
    const otherInput = component.queryByTestId('other-input');
    const disabledOtherInputClickInterceptor = component.queryByTestId(
      'disabled-other-input-click-interceptor'
    ) as HTMLElement;
    expect(otherInput).toBeDisabled();
    await user.click(disabledOtherInputClickInterceptor);
    expect(otherInput).not.toBeDisabled();
    expect(otherInput).toHaveFocus();
    expect(disabledOtherInputClickInterceptor).not.toBeInTheDocument();
  });
});
