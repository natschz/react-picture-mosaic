import React, {CSSProperties, useEffect, useMemo, useRef, useState} from "react"
import {useSpring, animated, PickAnimated} from "@react-spring/web";
import {useMosaicConfig} from "../utils/mosaicConfigProvider";
import MosaicGridBlockingDiv from "./MosaicGridBlockingDiv";
import useImageInformation from "../utils/useImageInformation";

export interface MosaicGridImageProps {
  index: number
  image: any
  gridRect: DOMRect
}

const MosaicGridImage = ({index, image, gridRect}: MosaicGridImageProps) => {
  const mosaicConfig = useMosaicConfig()
  const {width, height, translateX, translateY} = useImageInformation(index, gridRect)

  const ref = useRef<any>()

  const currentImage = useRef()
  const oldImage = useRef<any | null>()
  const [styles, animate] = useSpring(() => (mosaicConfig.imageContainerStyle))
  const [animationFinished, setAnimationFinished] = useState(false)

  const animations = useMemo(() => {
    if (ref.current) {
      const column = index % mosaicConfig.columns;
      const row = Math.floor(index / mosaicConfig.columns)
      const animations = mosaicConfig.createImageContainerAnimations(column, row, ref.current, gridRect, mosaicConfig)
      animations[animations.length - 1] = {
        ...animations[animations.length - 1],
        onRest: () => {
          setAnimationFinished(true)
          oldImage.current = null
        }
      }
      return animations
    }
  }, [ref.current, mosaicConfig.createImageContainerAnimations, index, gridRect, setAnimationFinished, oldImage])

  useEffect(() => {
    if (animations && image && currentImage.current !== image) {
      if (currentImage.current) {
        oldImage.current = currentImage.current
      }
      currentImage.current = image;
      animations.forEach((animation, index) => {
        animate.start(animation)
      });
    }
  }, [image, animate, animations, setAnimationFinished])

  const imageStyles: CSSProperties = {
    zIndex: 400,
    ...styles,
    display: "inline-block",
    position: "absolute",
    backgroundImage: image && `url("${image}")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  }

  if (animationFinished) {
      imageStyles["width"] = `${width}px`
      imageStyles["height"] = `${height}px`
      imageStyles["transform"] = `translate(${translateX}px, ${translateY}px)`
  }

  return <>
    {!animationFinished && gridRect && <MosaicGridBlockingDiv index={index} gridRect={gridRect} />}
    <animated.div ref={ref} style={imageStyles}></animated.div>
  </>;
}

export default MosaicGridImage
