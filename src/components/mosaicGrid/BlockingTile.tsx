import React, {CSSProperties} from "react"
import {useMosaicConfig} from "../../utils/MosaicConfigProvider";
import useImageInformation from "../../utils/useImageInformation";
import {useMosaicImage} from "../../utils/MosaicGridProvider";

export interface MosaicGridBlockingDivProps {
  index: number
}

const BlockingTile = ({index}: MosaicGridBlockingDivProps) => {
  const mosaicConfig = useMosaicConfig()
  const {gridRect} = useMosaicImage(index)
  const {width, height, x, y} = useImageInformation(index, gridRect)

  let blockDivStyle: CSSProperties = {
    display: "inline-block",
    position: "absolute",
    left: 0,
    top: 0,
    width: `${width}px`,
    height: `${height}px`,
    transform: `translate(${x}px, ${y}px)`,
    zIndex: 300,
    backgroundColor: "white",
    ...mosaicConfig.blockingTileStyle
  }

  return <div
    className={"blocking-tile"}
    style={blockDivStyle}
  />
}

export default BlockingTile
