import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { svgComponentParams } from './svg.types';

export default function CalendarSvg({ 
    color = '#1E40AF', 
    size = 24 
} : svgComponentParams  ) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4ZM5 6H19V8H5V6ZM5 10H19V20H5V10ZM9 14H15V16H9V14Z"
        fill={color}
      />
    </Svg>
  );
}