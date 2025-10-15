import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { svgComponentParams } from './svg.types';

type RightArrowSvgProps = svgComponentParams & {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
};

const RightArrowSvg = ({ 
    width = 24, 
    height = 24, 
    fill = 'none', 
    stroke = 'currentColor', 
    strokeWidth = 2 
}: RightArrowSvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
    <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M9 5l7 7-7 7" stroke={stroke} />
  </Svg>
);

export default RightArrowSvg;
