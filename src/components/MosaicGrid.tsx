import React, {CSSProperties, useCallback, useEffect, useRef, useState} from "react"
import useElementBoundingRect from "../utils/useElementBoundingRect";
import {useMosaicConfig} from "../utils/MosaicConfigProvider";
import MosaicOverlay from "./MosaicOverlay";
import Tile from "./mosaicGrid/Tile";
import {MosaicGridProvider, MosaicImage} from "../utils/MosaicGridProvider";
import {getImageInformation} from "../utils/useImageInformation";
import MosaicCanvas, {drawCanvasImage} from "./MosaicCanvas";
import usePageVisibility from "../utils/usePageVisibility";

const defaultMosaicImage: MosaicImage = {
  animationFinished: false,
  shouldAnimate: false,
  showBlockingTile: true
}

const defaultMosaicAnimatedImage: MosaicImage = {
  animationFinished: false,
  shouldAnimate: true,
  showBlockingTile: true
}

const defaultMosaicSeedImage: MosaicImage = {
  animationFinished: false,
  shouldAnimate: false,
  showBlockingTile: false
}

const MosaicGrid = () => {
  const mosaicConfig = useMosaicConfig()
  const isPageVisible = usePageVisibility()
  const [gridRef, gridRect] = useElementBoundingRect()
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement>()
  const [images, setImages] = useState<MosaicImage[]>(mosaicConfig.imageSeed.map(image => ({
    ...defaultMosaicSeedImage,
    image
  })))
  const shouldAddImages = mosaicConfig.loop || images.some(image => !image.image)
  const previousTargetImageRef = useRef<{ column: number, row: number }>({
    column: mosaicConfig.columns - 1,
    row: mosaicConfig.rows - 1
  })

  const onAnimationFinished = useCallback((index) => {
    setImages(images => {
      const image = images[index]
      const newImage = {
        ...image,
        animationFinished: true,
        showBlockingTile: false
      }

      images[index] = newImage

      if (canvasRef && gridRect) {
        drawCanvasImage(canvasRef, newImage, index, mosaicConfig.columns, mosaicConfig.rows, gridRect, mosaicConfig.drawTileToCanvas)
      }

      return [...images];
    })

  }, [setImages, canvasRef, mosaicConfig.drawTileToCanvas, mosaicConfig.columns, mosaicConfig.rows, gridRect])

  const addImage = useCallback(() => {
    const {
      column,
      row
    } = mosaicConfig.nextTileTarget(previousTargetImageRef.current.column, previousTargetImageRef.current.row, mosaicConfig)
    const image = mosaicConfig.loadTileImage(column, row)
    const targetIndex = (mosaicConfig.columns * row) + column

    previousTargetImageRef.current = {column, row}

    setImages(images => {
      const newImages = [...images]
      const hasImage = !!newImages[targetIndex]?.image
      newImages[targetIndex] = {...defaultMosaicAnimatedImage, image}
      if (hasImage) {
        newImages[targetIndex].showBlockingTile = false
      }
      return newImages
    })
  }, [
    setImages,
    previousTargetImageRef,
    mosaicConfig.loadTileImage,
    mosaicConfig.nextTileTarget,
    mosaicConfig.columns,
  ])

  // Ensure the image array has the correct size.
  useEffect(() => {
    setImages((images) => {
      if (!images) { // Initialize image array
        return Array.from(Array(mosaicConfig.columns * mosaicConfig.rows).keys()).map(_ => defaultMosaicImage)
      } else if (images.length !== mosaicConfig.columns * mosaicConfig.rows) {
        return images
          .concat(Array.from(Array(mosaicConfig.columns * mosaicConfig.rows).keys()).map(_ => defaultMosaicImage)) // Make sure the array has at least the required size
          .slice(0, mosaicConfig.columns * mosaicConfig.rows) // Trim it to fit the exact size
      }

      return images
    })
  }, [setImages, mosaicConfig.columns, mosaicConfig.rows])

  useEffect(() => {
    if (shouldAddImages && isPageVisible) {
      const interval = setInterval(addImage, mosaicConfig.imageInterval)

      return () => {
        clearInterval(interval)
      }
    }
  }, [
    (images?.length || 0),
    shouldAddImages,
    isPageVisible,
    addImage,
    mosaicConfig.imageInterval,
  ])

  const containerStyle: CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    overflow: "hidden",
    width: "100%",
    height: "100%",
  }

  const maxWidth = Math.round((gridRect?.width || 1) / mosaicConfig.columns) * mosaicConfig.columns
  const maxHeight = Math.round((gridRect?.height || 1) / mosaicConfig.rows) * mosaicConfig.rows

  const wrapperStyle: CSSProperties = {
    position: "absolute",
    width: `${maxWidth}px`,
    height: `${maxHeight}px`,
    left: 0,
    top: 0,
    overflow: "hidden",
  }

  return <div ref={gridRef} style={containerStyle}>
    {gridRect && <MosaicGridProvider
      images={images}
      onAnimationFinished={onAnimationFinished}
      gridRect={gridRect}
    >
      <div style={wrapperStyle}>
        <MosaicOverlay/>
      </div>

      <div style={wrapperStyle}>
        <MosaicCanvas canvasRef={canvasRef} setCanvasRef={setCanvasRef}/>
      </div>

      {images.map((image, index) => <Tile key={index} index={index}/>)}
    </MosaicGridProvider>}
  </div>
}

export default MosaicGrid