import React, {CSSProperties, useEffect, useRef, useState} from "react"
import MosaicGridImage from "./MosaicGridImage";
import useElementBoundingRect from "../utils/useElementBoundingRect";

export interface MosaicGridProps {
  mosaicImages: any[],
  rows: number,
  columns: number,
  newImageInterval: number,
  customBlockDivStyle: CSSProperties | undefined
  customInitialAnimation: any | undefined
  customAnimations: (element: any, gridRect: DOMRect | undefined) => any | undefined
}

export interface ImageState {
  lastSourceIndex: number,
  lastTargetIndex: number,
  visibleImages: any[],
}

const MosaicGrid = (
  {
    mosaicImages,
    rows,
    columns,
    newImageInterval,
    customBlockDivStyle,
    customInitialAnimation,
    customAnimations,
  }: MosaicGridProps) => {
  const [gridRef, gridRect] = useElementBoundingRect()

  const [imageState, setImageState] = useState<ImageState>({
    lastSourceIndex: -1,
    lastTargetIndex: -1,
    visibleImages: Array.from(Array(rows * columns).keys()).map(_ => null)
  })

  const containerStyle: CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    overflow: "hidden",
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateRows: Array.from(Array(rows).keys()).map(_ => "1fr").join(" "),
    gridTemplateColumns: Array.from(Array(columns).keys()).map(_ => "1fr").join(" "),
  }

  useEffect(() => {
    setImageState(imageState => {
      const expectedImages = rows * columns
      const imageDifference = expectedImages - imageState.visibleImages.length
      let targetImages = imageState.visibleImages.slice(0, expectedImages)

      if (targetImages.length < expectedImages) {
        const missingImageAmount = expectedImages - targetImages.length
        const additionalImages = Array.from(Array(missingImageAmount).keys()).map(_ => null)
        targetImages = [...targetImages, additionalImages]
      }

      return {
        lastSourceIndex: Math.min(imageState.lastSourceIndex, mosaicImages.length - 1),
        lastTargetIndex: Math.min(imageState.lastTargetIndex, targetImages.length - 1),
        visibleImages: targetImages,
      };
    })

    const addImage = () => {
      setImageState(imageState => {
        const nextSourceIndex = (imageState.lastTargetIndex + 1) % mosaicImages.length
        const nextTargetIndex = (imageState.lastTargetIndex + 1) % imageState.visibleImages.length
        const targetImages = [...imageState.visibleImages]
        targetImages[nextTargetIndex] = mosaicImages[nextSourceIndex]

        return {
          lastSourceIndex: nextSourceIndex,
          lastTargetIndex: nextTargetIndex,
          visibleImages: targetImages,
        };
      })

    }

    addImage()
    const interval = setInterval(addImage, newImageInterval)

    return () => {
      clearInterval(interval)
    }
  }, [mosaicImages, rows, columns, newImageInterval])

  return <div ref={gridRef} style={containerStyle}>
    {imageState.visibleImages.map(image => <MosaicGridImage
      key={image || Math.random()}
      gridRect={gridRect}
      image={image}
      customBlockDivStyle={customBlockDivStyle}
      customInitialAnimation={customInitialAnimation}
      customAnimations={customAnimations}
    />)}
  </div>
}

export default MosaicGrid