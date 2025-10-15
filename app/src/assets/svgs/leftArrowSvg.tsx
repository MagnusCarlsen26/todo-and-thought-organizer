import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { svgComponentParams } from './svg.types';

type LeftArrowSvgProps = svgComponentParams & {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
};

const LeftArrowSvg = ({ 
    width = 24,
    height = 24,
    fill = 'none',
    stroke = 'currentColor',
    strokeWidth = 2 
}: LeftArrowSvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
    <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M15 19l-7-7 7-7" stroke={stroke} />
  </Svg>
);

export default LeftArrowSvg;
