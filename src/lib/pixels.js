
import { chunk, forEach, groupBy, orderBy, reduce } from 'lodash';

const PIXEL_CONFIG_LENGTH = 4;

export function optimizePixelsByColor(pixels) {
  const pixelsByColor = groupBy(pixels, pixel => {
    const { r, g, b, a } = pixel;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  });

  const pixelPathConfigs = [];

  forEach(pixelsByColor, (pixels, color) => {
    const orderedPixels = orderBy(pixels, ['x', 'y']);
    const path = reduce(orderedPixels, (result, pixel, index) => {
      const { x, y, width, height } = pixel;
      const tl = `${x},${y}`;
      const tr = `${x + width},${y}`;
      const bl = `${x},${y + height}`;
      const br = `${x + width},${y + height}`;
      const pixelPath = `${br} ${bl} ${tl} ${tr} ${br}`;
      return result + ' ' + pixelPath;
    }, 'M');

    pixelPathConfigs.push({
      d: path + 'Z',
      fill: color,
      stroke: 'none',
    });
  });

  return pixelPathConfigs;
}

export function getPixels({ data = [], dimensions }) {
  const scanlineLength = dimensions.width;

  const rawPixels = chunk(data, PIXEL_CONFIG_LENGTH);

  const pixels = [];
  let currentScanline = 0;
  let currentColumn = 0;

  forEach(rawPixels, (rawPixel, index) => {
    const [r, g, b, a] = rawPixel;
    const isFinalScanlinePixel = (index + 1) % scanlineLength === 0;

    if (a > 0) {
      pixels.push({
        r,
        g,
        b,
        a: a / 255,
        x: currentColumn,
        y: currentScanline,
        width: 1,
        height: 1,
      });
    }

    currentColumn = currentColumn + 1;

    if (isFinalScanlinePixel) {
      currentScanline = currentScanline + 1;
      currentColumn = 0;
    }
  });

  return pixels;
}


export function getPixelsForScanline({ data = [], scanlineIndex }) {
  const rawPixels = chunk(data, PIXEL_CONFIG_LENGTH);

  const pixels = [];

	forEach(rawPixels, (rawPixel, index) => {
    const [r, g, b, a] = rawPixel;

    if (a > 0) {
      pixels.push({
        r,
        g,
        b,
        a: a / 255,
        x: index,
        y: scanlineIndex,
        width: 1,
        height: 1,
      });
    }
  });

  return pixels;
}


function getPathForPixels(pixels = []) {
	const sortedPixels = orderBy(pixels, ['x', 'y'], ['asc', 'asc']);
	let path = '';

	forEach(sortedPixels, (pixel, index) => {
		const { x, y, width, height } = pixel;
		const pixelPath = `M${x},${y} l${width},0 l0,${height} l${-width},0Z`
		path = path + pixelPath;
	});

	return path;
}


export function processImageDataByScanline(canvasElement, callback) {
	if (canvasElement) {
		const { width, height } = canvasElement;

		const context = canvasElement.getContext('2d');

		let scanlineIndex = 0;
		const pixelsByColor = {};

		while(scanlineIndex < height) {
			const scanlineData = context.getImageData(0, scanlineIndex, width, 1);

			const scanlinePixels = getPixelsForScanline({
				data: scanlineData?.data,
				scanlineIndex,
			});

			const scanlinePixelsByColor = groupBy(scanlinePixels, pixel => {
				const { r, g, b, a } = pixel;
				return `rgba(${r}, ${g}, ${b}, ${a})`;
			});

			forEach(scanlinePixelsByColor, (pixels, color) => {
				if (pixelsByColor[color]) {
					pixelsByColor[color].pixels = [
						pixelsByColor[color].pixels,
						...pixels,
					];

					pixelsByColor[color].path = pixelsByColor[color].path + getPathForPixels(pixels);
				}
				else {
					pixelsByColor[color] = {
						pixels,
						path: getPathForPixels(pixels),
					};
				}
			});

			callback(pixelsByColor);

			scanlineIndex = scanlineIndex + 1;
		}
	}

	return null;
}
