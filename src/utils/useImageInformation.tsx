import React, {MutableRefObject, useEffect, useRef, useState} from "react"
import {useMosaicConfig} from "./mosaicConfigProvider";

const useImageInformation = (index: number, gridRect: DOMRect): {
  column: number,
  row: number,
  width: number,
  height: number,
  translateX: number,
  translateY: number,
} => {
  const mosaicConfig = useMosaicConfig()
  const column = index % mosaicConfig.columns
  const row = Math.floor(index / mosaicConfig.columns)
  const width = Math.round((gridRect?.width || 1) / mosaicConfig.columns)
  const height = Math.round((gridRect?.height || 1) / mosaicConfig.rows)
  const translateX = column * width
  const translateY = row * height

  return {
    column,
    row,
    width,
    height,
    translateX,
    translateY,
  }
}

export default useImageInformation