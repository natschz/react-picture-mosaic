import React, {CSSProperties, useMemo} from "react"
import MosaicGrid from "./MosaicGrid";
import {MosaicConfigProvider, MosaicConfig} from "../utils/MosaicConfigProvider";
import {
  defaultCanvasStyle,
  defaultCreateTileStyle,
  defaultCreateTileAnimations, defaultDrawCanvasTileToCanvas, defaultNextTileTarget
} from "../configs/defaultConfig";
import {MosaicImage} from "../utils/MosaicGridProvider";

export interface PictureMosaicProps {
  columns: number
  rows: number
  overlayImage: string
  loadImage: (column: number, row: number) => string
  imageInterval: number

  imageSeed?: string[]
  loop?: boolean
  drawTileToCanvas?: (canvas: any, image: MosaicImage, width: number, height: number, x: number, y: number) => void
  nextTileTarget?: (previousColumn: number, previousRow: number, config: MosaicConfig) => { column: number, row: number }
  overlayStyle?: CSSProperties
  blockingTileStyle?: CSSProperties
  canvasStyle: CSSProperties
  createTileStyle?: (x: number, y: number, width: number, height: number) => CSSProperties
  createTileAnimations?: (column: number, row: number, element: HTMLElement, gridRect: DOMRect, config: MosaicConfig) => any[]
}

const PictureMosaic = (props: PictureMosaicProps) => {
  const config: MosaicConfig = useMemo(() => {
    return {
      columns: props.columns,
      rows: props.rows,
      overlayImage: props.overlayImage,
      loadImage: props.loadImage,
      imageInterval: props.imageInterval,

      imageSeed: props.imageSeed || [],
      loop: props.loop !== false,
      drawTileToCanvas: props.drawTileToCanvas || defaultDrawCanvasTileToCanvas,
      nextTileTarget: props.nextTileTarget || defaultNextTileTarget,
      overlayStyle: props.overlayStyle || {},
      blockingTileStyle: props.blockingTileStyle || {},
      canvasStyle: props.canvasStyle || defaultCanvasStyle,
      createTileAnimations: props.createTileAnimations || defaultCreateTileAnimations,
      createTileStyle: props.createTileStyle || defaultCreateTileStyle
    }
  }, [props])

  return <MosaicConfigProvider config={config}>
    <MosaicGrid/>
  </MosaicConfigProvider>
}

export default PictureMosaic