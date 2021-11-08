import React from 'react';
import { map } from 'lodash';

export default function SVG({ data, dimensions }) {
  return (
    <svg
      className="svg"
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
    >
			<AlphaChannelBackground {...dimensions} />
			{map(data, (colorData, color) => (
        <path key={color} fill={color} d={colorData.path} />
      ))}
    </svg>
  );
}


function AlphaChannelBackground({ height, width }) {
	const patternUnit = width / 100;
	return(
		<svg
			x="0"
			y="0"
			height="100%"
			width="100%"
			viewBox={`0 0 ${width} ${height}`}
		>
			<defs>
				<pattern
					id="alpha-bg"
					x="0"
					y="0"
					width={patternUnit * 2}
					height={patternUnit * 2}
					patternUnits="userSpaceOnUse"
					patternContentUnits="userSpaceOnUse"
				>
					<rect width={patternUnit} height={patternUnit} fill="#eee" x="0" y="0" />
					<rect
						width={patternUnit}
						height={patternUnit}
						fill="#eee"
						x={patternUnit}
						y={patternUnit}
					/>
				</pattern>
			</defs>
			<rect fill="url(#alpha-bg)" width="100%" height="100%" />
		</svg>
	);
}
