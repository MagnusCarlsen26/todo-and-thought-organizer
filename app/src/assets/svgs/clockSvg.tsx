import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { svgComponentParams } from './svg.types';

export default function ClockSvg({ 
    color = '#6B21A8', 
    size = 24 
} : svgComponentParams) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM12 7V12.5H16V10.5H14V7H12Z"
            fill={color}
        />
    </Svg>
  );
}