import React from 'react';
import { Global } from '@emotion/react';

const GlobalStyles: React.FC = () => (
  <Global
    styles={`
          * {
            margin: 0;
            padding: 0;
            line-height: 1.5;
            box-sizing: border-box;
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
);

export default GlobalStyles;
