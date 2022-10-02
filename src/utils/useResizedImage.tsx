import React, {MutableRefObject, useEffect, useRef, useState} from "react"

const useResizedImage = (image: any, targetWidth: number, targetHeight: number): string | undefined => {
  const [resizedImage, setResizedImage] = useState<string>()

  useEffect(() => {
    const canvas = document.createElement("canvas")
    canvas.width = targetWidth
    canvas.height = targetHeight
    const ctx = canvas.getContext("2d")

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      // set size proportional to image
      canvas.height = canvas.width * (img.height / img.width);

      // step 1 - resize to 50%
      const outputCanvas = document.createElement('canvas')
      const outputCanvasContext = outputCanvas.getContext('2d');

      outputCanvas.width = img.width * 0.5;
      outputCanvas.height = img.height * 0.5;
      outputCanvasContext.drawImage(
        img,
        0,
        0,
        outputCanvas.width,
        outputCanvas.height
      )

      // step 2
      outputCanvasContext.drawImage(
        outputCanvas,
        0,
        0,
        outputCanvas.width * 0.5,
        outputCanvas.height * 0.5
      )

      // step 3, resize to final size
      ctx.drawImage(
        outputCanvas,
        0,
        0,
        outputCanvas.width * 0.5,
        outputCanvas.height * 0.5,
        0,
        0,
        canvas.width,
        canvas.height
      )

      setResizedImage(canvas.toDataURL())
    }
    img.src = image
  }, [image, targetWidth, targetHeight])

  return resizedImage
}

export default useResizedImage