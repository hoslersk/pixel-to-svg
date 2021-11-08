import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import SVG from './components/svg';
import { processImageDataByScanline } from './lib/pixels';

import './index.css';


export default function App() {
	const [hasFile, setHasFile] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });

	const clearData = () => setData(null);

  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
			const { width, height } = dimensions;
			if (hasFile && width < 3 && height < 3) setHasError(true);
			else {
				setHasError(false);
			}
    //   const context = canvasRef.current.getContext('2d')
    //   const imageData = context.getImageData(0, 0, dimensions.width, dimensions.height);
    //   setData(imageData);
    }
  }, [canvasRef.current, dimensions, hasFile]);

  const updateCanvas = image => {
    setDimensions({
      width: image.width,
      height: image.height,
    });

    const ctx = canvasRef.current.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);
  };

	const canSubmit = !!canvasRef.current && hasFile && !hasError;

  const onChange = e => {
		clearData();
		setHasError(false);

		const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();

        img.onload = function() {
          updateCanvas(img);
        }

        img.src = event.target.result;
    }

		if (file) {
			setHasFile(true);
			reader.readAsDataURL(file);
		}
		else setHasFile(false);
  };

	const appendScanlineData = (scanlineData = []) => {
		setData(currentData => [...currentData || [], ...scanlineData]);
	};

	const onSubmit = e => {
		e.preventDefault();
		clearData();
		processImageDataByScanline(canvasRef.current, setData);
	};

  return (
    <div className="container">
      <h1>Pixel to SVG</h1>
      <p>A tool for converting simple sprite sheets and pixel art to SVG.</p>

      <form
        className="form"
        onSubmit={onSubmit}
      >
        <label className="label">
          Upload an image (PNG recommended)
        </label>
        <input
          className="input"
          onChange={onChange}
          type="file"
        />
        <div
          className={classNames(
            'feedback',
            { 'feedback--invalid': hasError },
          )}
        >
          An error has occurred. Please ensure file is a valid PNG image and try again.
        </div>

				<div className="label">Image Preview:</div>

				<canvas className="canvas" {...dimensions} ref={canvasRef} />

				<button disabled={!canSubmit} type="submit">
					Convert to SVG
				</button>
      </form>


			<h2>SVG Output</h2>
      <SVG {...{ data, dimensions }} />
    </div>
  );
}
