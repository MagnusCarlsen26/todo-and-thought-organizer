import React from "react";
import Svg, { Path } from "react-native-svg";
import { svgComponentParams } from "./svg.types.ts";

export function TodosIcon({ color, size }: svgComponentParams) {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 11l3 3L22 4M2 12h6M2 18h6M2 6h6"
        stroke={color || "black"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function AddIcon({ color, size }: svgComponentParams) {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 5v14M5 12h14"
        stroke={color || "black"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function NotesIcon({ color, size }: svgComponentParams) {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 12h6M9 16h6M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H9l-4 4v10a2 2 0 002 2z"
        stroke={color || "black"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
