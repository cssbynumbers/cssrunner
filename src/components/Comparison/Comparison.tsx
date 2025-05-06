import * as htmlToImage from 'html-to-image';
import { useEffect, useState } from 'react';
import { getHexFromUint8 } from '../../utils/getHexFromUint8';
import useRunnerStore from '../../utils/useRunnerStore';

const Comparison = () => {
  const challengeRef = useRunnerStore(s => s.challengeRef);
  const solutionRef = useRunnerStore(s => s.solutionRef);
  
  const [challenge, setChallenge] = useState<Uint8ClampedArray>();
  const [solution, setSolution] = useState<Uint8ClampedArray>();
  const [copy, setCopy] = useState<Uint8ClampedArray>();
  const [results, setResults] = useState<Record<string, number>>();

  // convert refs to image data
  useEffect(() => {
    let ignore = false;

    console.info('converting to image data')
  
    async function convertToImage() {
      const challengeData = await htmlToImage.toPixelData(challengeRef.current);
      const solutionData = await htmlToImage.toPixelData(solutionRef.current);
      if (!ignore) {
        setChallenge(challengeData);
        setSolution(solutionData);
      }
    }
  
    convertToImage();
  
    return () => {
      ignore = true;
    };
  }, [challengeRef, solutionRef]);

  // validate matches
  useEffect(() => {
    if (!challenge || !solution || challenge.length === 0 || solution.length === 0 ) {
      return;
    }

    const localCopy = new Uint8ClampedArray(solution);

    console.info(challenge, `Total: ${challenge.length / 4} pixels`);
    console.info(localCopy, `Copy Total: ${localCopy.length / 4} pixels`);

    const { width, height } = challengeRef.current.getBoundingClientRect()

    let expected = 0;
    let received = 0;
    let unexpected = 0;
    let wrongColor = 0;

    for (var y = 0; y < height; ++y) {
      for (var x = 0; x < width; ++x) {
        const pixelAtXYOffset = (4 * y * width) + (4 * x);
        /* pixelAtXY is a Uint8Array[4] containing RGBA values of the pixel at (x, y) in the range 0..255 */
        const challengePixelAtXY = challenge.slice(pixelAtXYOffset, pixelAtXYOffset + 4);
        const solutionPixelAtXY = solution.slice(pixelAtXYOffset, pixelAtXYOffset + 4);

        const [challengeHex] = getHexFromUint8(challengePixelAtXY);
        const [solutionHex] = getHexFromUint8(solutionPixelAtXY);

        if (challengeHex === '#ffffff') {
          if (solutionHex === '#ffffff') {
            continue;
          } else {
            unexpected += 1;
          }
        }

        expected += 1

        if (solutionHex === challengeHex) {
          localCopy[pixelAtXYOffset] = 0
          localCopy[pixelAtXYOffset + 1] = 80
          localCopy[pixelAtXYOffset + 2] = 0
          localCopy[pixelAtXYOffset + 3] = 255

          received += 1;
        } else {
          localCopy[pixelAtXYOffset] = 255
          localCopy[pixelAtXYOffset + 1] = 0
          localCopy[pixelAtXYOffset + 2] = 0
          localCopy[pixelAtXYOffset + 3] = 255

          wrongColor += 1;
        }
      }
    }

    // console.info(copy, `Copy Total: ${copy.length / 4} pixels`);

    setCopy(localCopy);

    setResults({
      expected,
      received,
      unexpected,
      wrongColor
    })

  }, [challenge, solution, challengeRef])

  // render image
  useEffect(() => {
    if (copy) {
      const canvas = document.getElementById('replicated') as HTMLCanvasElement
      const ctx = canvas.getContext('2d')!
      // const data = ctx.getImageData(0, 0, 500, 100).data.buffer;
  
      const copyBuffer = copy.buffer;
  
      console.info(copyBuffer);
      // console.info(copyBuffer.buffer);
      const image = new ImageData(new Uint8ClampedArray(copyBuffer), 500, 100, {});
  
      // console.info(image);
  
      ctx.putImageData(image, 0, 0)
    }
  }, [copy])

  return (
    <div className="comparison">
      {
        results && (
          <>
            <p>Result: {`${results.received + results.unexpected} / ${results.expected} (${((results.received / results.expected) * 100).toFixed(2)}%)`}</p>
            <p>Unexpected pixels: {results.unexpected}</p>            
            <p>Unexpected color: {results.wrongColor}</p>
          </>
        )
      }
      <canvas id="replicated" width="500" height="100"></canvas>
    </div>

  )
}

export default Comparison;