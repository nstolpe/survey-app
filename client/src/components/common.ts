import styled from '@emotion/styled';

export const SubHeading = styled.h3`
  font-size: 1.8rem;
  font-family: sans-serif;
  margin-bottom: 0.5rem;
`;

export const Title = styled.h1`
  color: #000000;
  font-size: 2.4rem;
  font-family: sans-serif;
  text-align: center;
  margin: 2rem 0;
`;

export const Wrapper = styled.div<{ isVisible: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;
