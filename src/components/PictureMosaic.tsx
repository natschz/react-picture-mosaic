import React, {CSSProperties} from "react"
import MosaicOverlay from "./MosaicOverlay";
import MosaicGrid from "./MosaicGrid";

export interface PictureMosaicProps {
  overlayImage: any
  mosaicImages: any[]
  rows: number
  columns: number
  newImageInterval: number
  customBlockDivStyle: CSSProperties | undefined
  customInitialAnimation: any | undefined
  customAnimations: (element: any, gridRect: DOMRect | undefined) => any | undefined
}

const PictureMosaic = (
  {
    overlayImage,
    mosaicImages,
    rows,
    columns,
    newImageInterval,
    customBlockDivStyle,
    customInitialAnimation,
    customAnimations,
  }: PictureMosaicProps) => {
  return <>
    <MosaicOverlay overlayImage={overlayImage}/>
    <MosaicGrid
      rows={rows}
      columns={columns}
      mosaicImages={mosaicImages}
      newImageInterval={newImageInterval}
      customBlockDivStyle={customBlockDivStyle}
      customInitialAnimation={customInitialAnimation}
      customAnimations={customAnimations}
    />
  </>
}

export default PictureMosaic