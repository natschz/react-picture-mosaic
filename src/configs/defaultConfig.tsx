import {MosaicConfig} from "../utils/MosaicConfigProvider";
import {CSSProperties} from "react";
import {MosaicImage} from "../utils/MosaicGridProvider";

export const defaultCreateTileAnimations = (column: number, row: number, element: HTMLElement, gridRect: DOMRect, config: MosaicConfig): any[] => {
  const width = Math.round((gridRect?.width || 1) / config.columns)
  const height = Math.round((gridRect?.height || 1) / config.rows)
  const translateX = column * width
  const translateY = row * height

  const previewWidth = gridRect.width / 2
  const previewHeight = gridRect.height / 2
  const previewTranslateX = gridRect.width / 2 - (previewWidth / 2)
  const previewTranslateY = gridRect.height / 2 - (previewHeight / 2)

  return [
    {
      delay: 0,
      config: {
        duration: 0
      },
      immediate: true,
      zIndex: 500,
      opacity: 1,
      width: `${previewWidth}px`,
      height: `${previewHeight}px`,
      transform: `translate(${previewTranslateX}px, ${previewTranslateY}px)`
    },
    {
      delay: 2000,
      config: {
        duration: 2000
      },
      zIndex: 400,
      opacity: 0.3,
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate(${translateX}px, ${translateY}px)`
    }
  ]
}

export const defaultCreateTileStyle = (x: number, y: number, width: number, height: number): CSSProperties => {
  return {
    zIndex: 400,
    opacity: 0.3,
    width: `${width}px`,
    height: `${height}px`,
    transform: `translate(${x}px, ${y}px)`
  }
}

export const defaultCanvasStyle: CSSProperties = {
  zIndex: 400,
  opacity: 0.3,
}

export const defaultNextTileTarget = (previousColumn: number, previousRow: number, config: MosaicConfig): { column: number, row: number } => {
  const maxIndex = config.columns * config.rows
  const previousIndex = ((config.columns * previousRow) + previousColumn)
  const newIndex = (previousIndex + 1) % maxIndex
  const column = newIndex % config.columns
  const row = Math.floor(newIndex / config.columns)

  return {
    column,
    row
  }
}

export const defaultDrawCanvasTileToCanvas = (canvas: any, image: MosaicImage, width: number, height: number, x: number, y: number) => {
  if (image.image) {
    const context = canvas.getContext('2d');
    context.clearRect( x, y, width, height);
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      context.drawImage(img, x, y, width, height)
    }
    img.src = image.image
  }
}