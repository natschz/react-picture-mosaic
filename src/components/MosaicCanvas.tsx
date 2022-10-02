import React, {CSSProperties, forwardRef, useEffect, useState} from "react"
import {MosaicConfig, useMosaicConfig} from "../utils/MosaicConfigProvider";
import {MosaicImage, useMosaicGrid} from "../utils/MosaicGridProvider";
import {getImageInformation} from "../utils/useImageInformation";

export const drawCanvasImage = (canvas: any, image: MosaicImage, index: number, columns: number, rows: number, gridRect: DOMRect, drawTileToCanvas: (canvas: any, image: MosaicImage, width: number, height: number, x: number, y: number) => void) => {
  const {width, height, x, y} = getImageInformation(index, columns, rows, gridRect?.width, gridRect?.height)

  if (!image.shouldAnimate || image.animationFinished) {
    drawTileToCanvas(canvas, image, width, height, x, y)
  }
}

interface MosaicCanvasProps {
  canvasRef?: HTMLCanvasElement
  setCanvasRef: (ref: HTMLCanvasElement) => void
}

const MosaicCanvas = ({canvasRef, setCanvasRef}: MosaicCanvasProps) => {
  const {columns, rows, canvasStyle, drawTileToCanvas} = useMosaicConfig()
  const {gridRect, images} = useMosaicGrid()

  useEffect(() => {
    if (canvasRef) {
      const context = canvasRef.getContext('2d');
      context!.clearRect(0, 0, canvasRef.width, canvasRef.height);

      images.forEach((image, index) => {
        drawCanvasImage(canvasRef, image, index, columns, rows, gridRect, drawTileToCanvas)
      })
    }

  }, [canvasRef, drawTileToCanvas, gridRect.width, gridRect.height])

  let containerStyle: CSSProperties = {
    zIndex: 200,
    position: "absolute",
    left: 0,
    top: 0,
    overflow: "hidden",
    ...canvasStyle
  }

  return <canvas
    className={"mosaic-canvas"}
    style={containerStyle}
    ref={setCanvasRef}
    width={gridRect?.width}
    height={gridRect?.height}
  />
}

export default MosaicCanvas