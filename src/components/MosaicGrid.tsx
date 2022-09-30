import React, {CSSProperties, useEffect, useMemo, useRef, useState} from "react"
import MosaicGridImage from "./MosaicGridImage";
import useElementBoundingRect from "../utils/useElementBoundingRect";
import {useMosaicConfig} from "../utils/mosaicConfigProvider";
import MosaicOverlay from "./MosaicOverlay";

const MosaicGrid = () => {
  const mosaicConfig = useMosaicConfig()
  const [gridRef, gridRect] = useElementBoundingRect()
  const imageWidth = (gridRect?.width || 1) / mosaicConfig.columns
  const imageHeight = (gridRect?.height || 1) / mosaicConfig.rows
  const [images, setImages] = useState<any[]>([])
  const shouldAddImages = mosaicConfig.loop || images.some(image => !image)
  const previousTargetImageRef = useRef<{ column: number, row: number }>({
    column: mosaicConfig.columns - 1,
    row: mosaicConfig.rows - 1
  })

  useEffect(() => {
    setImages((images) => {
      if (!images) { // Initialize image array
        return Array.from(Array(mosaicConfig.columns * mosaicConfig.rows).keys()).map(_ => null)
      } else if (images.length !== mosaicConfig.columns * mosaicConfig.rows) {
        return images
          .concat(Array.from(Array(mosaicConfig.columns * mosaicConfig.rows).keys()).map(_ => null)) // Make sure the array has at least the required size
          .slice(0, mosaicConfig.columns * mosaicConfig.rows) // Trim it to fit the exact size
      }

      return images
    })
  }, [setImages, mosaicConfig.columns, mosaicConfig.rows])

  useEffect(() => {
    if (shouldAddImages) {
      const addImage = () => {
        const {
          column,
          row
        } = mosaicConfig.nextImageTarget(previousTargetImageRef.current.column, previousTargetImageRef.current.row)
        const image = mosaicConfig.loadImage(column, row)
        const targetIndex = (mosaicConfig.columns * row) + column

        previousTargetImageRef.current = {column, row}

        setImages(images => {
          const newImages = [...images]
          newImages[targetIndex] = image
          return newImages
        })
      };

      const interval = setInterval(addImage, mosaicConfig.imageInterval, mosaicConfig.columns)

      return () => {
        clearInterval(interval)
      }
    }
  }, [(images?.length || 0), shouldAddImages, setImages, previousTargetImageRef, mosaicConfig.loop, mosaicConfig.imageInterval, mosaicConfig.loadImage, mosaicConfig.nextImageTarget, mosaicConfig.columns, mosaicConfig.rows])

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

  const wrapperStyle: CSSProperties =  {
    position: "absolute",
    width: `${maxWidth}px`,
    height: `${maxHeight}px`,
    left: 0,
    top: 0,
    overflow: "hidden",
  }

  return <div ref={gridRef} style={containerStyle}>
    <div style={wrapperStyle}>
      <MosaicOverlay/>
    </div>
    {gridRect && images.map((image, index) => <MosaicGridImage
      key={index}
      index={index}
      image={image}
      gridRect={gridRect}
    />)}
  </div>

  //
  //
  // const [imageState, setImageState] = useState<ImageState>({
  //   lastSourceIndex: -1,
  //   lastTargetIndex: -1,
  //   visibleImages: Array.from(Array(rows * columns).keys()).map(_ => null)
  // })
  //
  // const columnWidth = (gridRect?.width || 1) / columns
  // const rowHeight = (gridRect?.height || 1) / rows
  //
  // const containerStyle: CSSProperties = {
  //   position: "absolute",
  //   left: 0,
  //   top: 0,
  //   overflow: "hidden",
  //   width: "100%",
  //   height: "100%",
  //   display: "grid",
  //   gridTemplateColumns: Array.from(Array(columns).keys()).map(_ => `${columnWidth}px`).join(" "),
  //   gridTemplateRows: Array.from(Array(rows).keys()).map(_ => `${rowHeight}px`).join(" "),
  // }
  //
  // useEffect(() => {
  //   setImageState(imageState => {
  //     const expectedImages = rows * columns
  //     const imageDifference = expectedImages - imageState.visibleImages.length
  //     let targetImages = imageState.visibleImages.slice(0, expectedImages)
  //
  //     if (targetImages.length < expectedImages) {
  //       const missingImageAmount = expectedImages - targetImages.length
  //       const additionalImages = Array.from(Array(missingImageAmount).keys()).map(_ => null)
  //       targetImages = [...targetImages, additionalImages]
  //     }
  //
  //     return {
  //       lastSourceIndex: Math.min(imageState.lastSourceIndex, mosaicImages.length - 1),
  //       lastTargetIndex: Math.min(imageState.lastTargetIndex, targetImages.length - 1),
  //       visibleImages: targetImages,
  //     };
  //   })
  //
  //   const addImage = () => {
  //     setImageState(imageState => {
  //       const nextSourceIndex = (imageState.lastTargetIndex + 1) % mosaicImages.length
  //       const nextTargetIndex = (imageState.lastTargetIndex + 1) % imageState.visibleImages.length
  //       const targetImages = [...imageState.visibleImages]
  //       targetImages[nextTargetIndex] = mosaicImages[nextSourceIndex]
  //
  //       return {
  //         lastSourceIndex: nextSourceIndex,
  //         lastTargetIndex: nextTargetIndex,
  //         visibleImages: targetImages,
  //       };
  //     })
  //
  //   }
  //
  //   addImage()
  //   const interval = setInterval(addImage, newImageInterval)
  //
  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [mosaicImages, rows, columns, newImageInterval])
  //
  // return <div ref={gridRef} style={containerStyle}>
  //   {imageState.visibleImages.map(image => <MosaicGridImage
  //     key={image || Math.random()}
  //     gridRect={gridRect}
  //     image={image}
  //     customBlockDivStyle={customBlockDivStyle}
  //     customInitialAnimation={customInitialAnimation}
  //     customAnimations={customAnimations}
  //   />)}
  // </div>
}

export default MosaicGrid