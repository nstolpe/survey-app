import React, { useEffect, useState } from 'react';
import { Global } from '@emotion/react';
import styled from '@emotion/styled';

import ColorOptions from 'Components/ColorOptions';
import FoodOptions from 'Components/FoodOptions';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Title = styled.h1`
  color: #000000;
  font-size: 4.8rem;
  font-family: sans-serif;
  text-align: center;
`;

const Questions = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const Question = styled.h3``;
const SubmitButton = styled.button``;

const App = () => {
  const [defaultColors, setDefaultColors] = useState([]);
  const [defaultFoods, setDefaultFoods] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [colorOption, setColorOption] = useState(null);
  const [foodOption, setFoodOption] = useState(null);

  const setActiveColorOption = (colorName) => setColorOption(colorName);
  const setActiveFoodOption = (foodName) => setFoodOption(foodName);
  const recordVote = () => {
    fetch('http://localhost:3000/record-vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ color: colorOption, food: foodOption }),
    });
  };

  useEffect(() => {
    const getDefaultValues = async () => {
      const results = await fetch('http://localhost:3000/default-values');
      const defaultValues = await results.json();
      const { colors, foods } = defaultValues;
      setDefaultColors(colors);
      setDefaultFoods(foods);
      setIsLoaded(true);
    };
    getDefaultValues();
  }, []);

  return (
    <>
      <Global
        styles={`
          * {
            margin: 0;
            padding: 0;
            line-height: 1.5;
          }
          html, body, .root {
            height: 100%;
          }
          body {
            font-size: 10px;
          }
          .root {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}
      />
      <Wrapper>
        <Title>survey app</Title>
        <Questions isVisible={isLoaded}>
          <Question>What is your favorite food?</Question>
          <FoodOptions
            defaults={defaultFoods}
            setActiveOption={setActiveFoodOption}
          />
          <Question>What is your favorite color?</Question>
          <ColorOptions
            defaults={defaultColors}
            setActiveOption={setActiveColorOption}
          />
          <SubmitButton
            type="submit"
            onClick={recordVote}
            disabled={colorOption === null || foodOption === null}
          >
            submit favorites
          </SubmitButton>
        </Questions>
      </Wrapper>
    </>
  );
};

export default App;
