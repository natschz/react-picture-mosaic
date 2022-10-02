import React from "react"
import {useMosaicConfig} from "./MosaicConfigProvider";

export interface ImageInformation {
  column: number,
  row: number,
  width: number,
  height: number,
  x: number,
  y: number,
}

export const getImageInformation = (index: number, columns: number, rows: number, gridWidth: number, gridHeight: number): ImageInformation => {
  const column = index % columns
  const row = Math.floor(index / columns)
  const width = Math.round((gridWidth || 1) / columns)
  const height = Math.round((gridHeight || 1) / rows)
  const x = column * width
  const y = row * height

  return {
    column,
    row,
    width,
    height,
    x,
    y,
  }
}

const useImageInformation = (index: number, gridRect: DOMRect): ImageInformation => {
  const mosaicConfig = useMosaicConfig()

  return getImageInformation(
    index,
    mosaicConfig.columns,
    mosaicConfig.rows,
    gridRect?.width,
    gridRect?.height
  )
}

export default useImageInformation