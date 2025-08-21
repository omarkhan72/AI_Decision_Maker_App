import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
};

// Stylized leaf + branching line to approximate the mock
function LeafIllustration({ width = 240, height = 300 }: Props) {
  const strokeBlue = '#4DB1E3';
  const branchGold = '#F8B64C';

  return (
    <Svg width={width} height={height} viewBox="0 0 240 300">
      {/* Leaf outline */}
      <Path
        d="M120 20 C70 80 60 150 120 240 C180 150 170 80 120 20 Z"
        fill="none"
        stroke={strokeBlue}
        strokeWidth={6}
      />

      {/* Branching path */}
      <Path
        d="M60 180 C100 170 140 170 180 180"
        fill="none"
        stroke={branchGold}
        strokeWidth={8}
        strokeLinecap="round"
      />

      {/* Mid dot */}
      <Circle cx="120" cy="180" r="6" fill={strokeBlue} />

      {/* Side dots */}
      <Circle cx="60" cy="180" r="6" fill={branchGold} />
      <Circle cx="180" cy="180" r="6" fill={branchGold} />

      {/* Curly hints */}
      <Path d="M52 186 C40 194 40 206 52 214" fill="none" stroke={branchGold} strokeWidth={6} strokeLinecap="round" />
      <Path d="M188 186 C200 194 200 206 188 214" fill="none" stroke={branchGold} strokeWidth={6} strokeLinecap="round" />
    </Svg>
  );
}

export default LeafIllustration;


