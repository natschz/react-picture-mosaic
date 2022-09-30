import React, {CSSProperties, useEffect, useMemo, useRef, useState} from "react"
import {useSpring, animated, PickAnimated} from "@react-spring/web";
import {ControllerUpdate} from "@react-spring/core/dist/declarations/src/types";
import {useMosaicConfig} from "../utils/mosaicConfigProvider";
import useImageInformation from "../utils/useImageInformation";

export interface MosaicGridBlockingDivProps {
  index: number
  gridRect: DOMRect
}

const MosaicGridBlockingDiv = ({index, gridRect}: MosaicGridBlockingDivProps) => {
  const mosaicConfig = useMosaicConfig()
  const {width, height, translateX, translateY} = useImageInformation(index, gridRect)

  let blockDivStyle: CSSProperties = {
    display: "inline-block",
    position: "absolute",
    width: `${width}px`,
    height: `${height}px`,
    transform: `translate(${translateX}px, ${translateY}px)`,
    zIndex: 300,
    backgroundColor: "white",
    ...mosaicConfig.blockingTileStyle
  }

  return <div className={"blocking-tile"} style={blockDivStyle}/>
}

export default MosaicGridBlockingDiv