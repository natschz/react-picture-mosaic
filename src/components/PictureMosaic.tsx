import React, {CSSProperties, useEffect, useMemo} from "react"
import MosaicOverlay from "./MosaicOverlay";
import MosaicGrid from "./MosaicGrid";
import {MosaicConfigProvider, MosaicConfig} from "../utils/mosaicConfigProvider";
import {previewedCreateImageContainerAnimations, previewedImageContainerStyle} from "../configs/previewedConfig";

export interface PictureMosaicProps {
  columns: number
  rows: number
  overlayImage: any
  loadImage: (column: number, row: number) => any
  imageInterval: number

  loop?: boolean
  nextImageTarget?: (previousColumn: number, previousRow: number) => { column: number, row: number }
  overlayStyle?: CSSProperties
  blockingTileStyle?: CSSProperties
  imageContainerStyle?: any
  createImageContainerAnimations?: (column: number, row: number, element: HTMLElement, gridRect: DOMRect, config: MosaicConfig) => any[]
}

const PictureMosaic = (props: PictureMosaicProps) => {
  const nextImageTarget =  (previousColumn: number, previousRow: number): { column: number, row: number } => {
    const maxIndex = props.columns * props.rows
    const previousIndex = ((props.columns * previousRow) + previousColumn)
    const newIndex = (previousIndex + 1) % maxIndex
    const column = newIndex % props.columns
    const row = Math.floor(newIndex / props.columns)

    return {
      column,
      row
    }
  }

  const config: MosaicConfig = {
    columns: props.columns,
    rows: props.rows,
    overlayImage: props.overlayImage,
    loadImage: props.loadImage,
    imageInterval: props.imageInterval,

    loop: props.loop !== false ? true : false,
    nextImageTarget: props.nextImageTarget || nextImageTarget,
    overlayStyle: props.overlayStyle || {},
    blockingTileStyle: props.blockingTileStyle || {},
    imageContainerStyle: props.imageContainerStyle || previewedImageContainerStyle,
    createImageContainerAnimations: props.createImageContainerAnimations || previewedCreateImageContainerAnimations,
  }

  return <MosaicConfigProvider config={config}>
    <MosaicGrid/>
  </MosaicConfigProvider>
}

export default PictureMosaic