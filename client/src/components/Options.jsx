import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import debounce from 'lodash.debounce';

const Label = styled.label`
  display: block;
`;

const OtherInputWrapper = styled.span`
  position: relative;
`;

const OtherInput = styled.input`
  outline: none;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(0, 0, 0);
  padding: 0 0.5em;
  transition: border-color 0.3s ease;
  &:disabled {
    border-color: rgb(180, 180, 180);
  }
`;

// overlays the other text input when it's disabled so it
// can be activated and focused when clicked
const DisabledOtherInputClickInterceptor = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Options = ({ defaults, type, setActiveOption }) => {
  const [otherActive, setOtherActive] = useState(false);
  const otherInputRef = useRef();

  const onOptionSelect = (name) => {
    setOtherActive(false);
    setActiveOption(name);
  };
  const onOtherOptionSelect = () => {
    setOtherActive(true);
    setActiveOption(otherInputRef.current.value || null);
  };
  const onOtherOptionTextChange = (e) => {
    console.log(e.target.value);
    setActiveOption(e.target.value || null);
  };

  // shift focus to the other text input when it's activated.
  useEffect(() => {
    if (otherActive == true) {
      otherInputRef.current.focus();
    }
  }, [otherActive]);

  return (
    <div>
      {defaults.map(({ name, id }) => {
        const optionId = `${type}-option-${id}`;
        return (
          <Label htmlFor={optionId} key={id}>
            <input
              type="radio"
              name={`${type}-option`}
              value={id}
              id={optionId}
              onClick={() => onOptionSelect(name)}
            />
            <span>{name}</span>
          </Label>
        );
      })}
      <Label htmlFor={`${type}-option-other`} key={`${type}-option-other`}>
        <input
          type="radio"
          name={`${type}-option`}
          id={`${type}-option-other`}
          onClick={onOtherOptionSelect}
        />
        <OtherInputWrapper>
          <OtherInput
            type="text"
            onChange={debounce(onOtherOptionTextChange, 100)}
            disabled={!otherActive}
            ref={otherInputRef}
            placeholder={`enter a custom ${type}`}
          />
          {!otherActive && <DisabledOtherInputClickInterceptor />}
        </OtherInputWrapper>
      </Label>
    </div>
  );
};

export default Options;
