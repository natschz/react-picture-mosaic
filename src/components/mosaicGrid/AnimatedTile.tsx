import React, {CSSProperties, useEffect, useMemo, useRef, useState} from "react"
import {animated, useSpring} from "@react-spring/web";
import {useMosaicConfig} from "../../utils/MosaicConfigProvider";
import {MosaicImage, useMosaicGrid, useMosaicImage} from "../../utils/MosaicGridProvider";

export interface CachedAnimatedTileProps {
  index: number
  image: MosaicImage
  gridRect: DOMRect
  onAnimationFinished: (index: number) => void
}

const CachedAnimatedTile = (
  {
    index,
    image,
    gridRect,
    onAnimationFinished
  }: CachedAnimatedTileProps
) => {
  const mosaicConfig = useMosaicConfig()

  const [ref, setRef] = useState<HTMLDivElement | null>()
  const currentImage = useRef<MosaicImage>()

  const [styles, animate] = useSpring(() => (mosaicConfig.createTileStyle(0, 0, 0, 0)))

  const animations = useMemo(() => {
    if (ref) {
      const column = index % mosaicConfig.columns;
      const row = Math.floor(index / mosaicConfig.columns)
      const animations = mosaicConfig.createTileAnimations(column, row, ref, gridRect, mosaicConfig)
      animations[animations.length - 1] = {
        ...animations[animations.length - 1],
        onRest: () => onAnimationFinished(index)
      }

      return animations
    }
  }, [
    index,
    gridRect,
    ref,
    onAnimationFinished,
    mosaicConfig.createTileAnimations
  ])

  useEffect(() => {
    if (animations && image.image && currentImage.current?.image !== image?.image) {
      currentImage.current = image
      animations.forEach((animation, index) => {
        animate.start(animation)
      });
    }
  }, [image.image, animate, animations])

  const imageStyles: CSSProperties = {
    zIndex: 400,
    ...styles,
    display: "inline-block",
    position: "absolute",
    backgroundImage: image.image && `url("${image.image}")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  }

  return <animated.div
    ref={setRef}
    className={"animated-tile"}
    style={imageStyles}
  />
}

export interface AnimatedTileProps {
  index: number
}

const AnimatedTile = ({index}: AnimatedTileProps) => {
  const {image, gridRect, onAnimationFinished} = useMosaicImage(index)

  return useMemo(() => {
    return <CachedAnimatedTile
      index={index}
      image={image}
      gridRect={gridRect}
      onAnimationFinished={onAnimationFinished}
    />
  }, [image, gridRect])
}
export default AnimatedTile
