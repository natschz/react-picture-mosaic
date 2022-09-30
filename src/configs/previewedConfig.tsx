import useImageInformation from "../utils/useImageInformation";
import {MosaicConfig} from "../utils/mosaicConfigProvider";

const previewedImageContainerStyle: any = {
  opacity: 0,
  zIndex: 400,
  width: `0px`,
  height: `0px`,
  transform: "translate(0px, 0px)"
}

const previewedCreateImageContainerAnimations = (column: number, row: number, element: HTMLElement, gridRect: DOMRect, config: MosaicConfig): any[] => {
  const width = Math.round((gridRect?.width || 1) / config.columns)
  const height = Math.round((gridRect?.height || 1) / config.rows)
  const translateX = column * width
  const translateY = row * height

  const elementRect = element.getBoundingClientRect()
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

export {
  previewedImageContainerStyle,
  previewedCreateImageContainerAnimations,
}