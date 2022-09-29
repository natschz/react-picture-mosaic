import React, {CSSProperties, useEffect, useMemo, useRef, useState} from "react"
import {useSpring, animated, PickAnimated} from "@react-spring/web";
import {ControllerUpdate} from "@react-spring/core/dist/declarations/src/types";

export interface MosaicGridImageProps {
  image: any
  gridRect: DOMRect | undefined
  customBlockDivStyle: CSSProperties | undefined
  customInitialAnimation: any | undefined
  customAnimations: (element: any, gridRect: DOMRect | undefined) => any | undefined
}

const defaultInitialAnimation: ControllerUpdate<PickAnimated<{ opacity: number, left: number, top: number, transform: string }>> = {
  opacity: 0,
  left: 0,
  top: 0,
  transform: "perspective(500px) translate3d(0px, 0px, 0px)"
}

const defaultAnimations = (element: any, gridRect: DOMRect | undefined) => {
  const rect = element.getBoundingClientRect()

  const targetX = 160
  const targetY = 80

  return [
    {
      delay: 0,
      config: {
        duration: 0
      },
      opacity: 1,
      left: (element.offsetLeft) * -1,
      top: (element.offsetTop) * -1,
      transform: `perspective(500px) translate3d(${targetX}px, ${targetY}px, 399px)`
    },
    {
      delay: 1000,
      config: {
        duration: 1000
      },
      opacity: 0.3,
      left: 0,
      top: 0,
      transform: `perspective(500px) translate3d(0px, 0px, 0px)`
    }
  ]
}

const MosaicGridImage = ({image, gridRect, customInitialAnimation, customAnimations, customBlockDivStyle}: MosaicGridImageProps) => {
  const ref = useRef<any>()
  const initialAnimation: any = useMemo(() => (customInitialAnimation || defaultInitialAnimation), [])
  const animations: any[] = useMemo(() => {
    if (ref.current) {
      return customAnimations ? customAnimations(ref.current, gridRect) : defaultAnimations(ref.current, gridRect);
    }
  }, [ref.current])

  const [styles, animate] = useSpring(() => (initialAnimation))
  const [animationFinished, setAnimationFinished] = useState(false)

  useEffect(() => {
    if (animations) {
      animations.forEach((animation, index) => {
        if (index == animations.length - 1) {
          animate.start({
            ...animation,
            onRest: () => {setAnimationFinished(true)}
          })
        } else {
          animate.start(animation)
        }
      });
    }
  }, [animate, animations, setAnimationFinished])

  const imageStyles: CSSProperties = {
    maxWidth: "100%",
    overflow: "hidden",
    mixBlendMode: "overlay",
  }
  let blockDivStyle: CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 300,
    backgroundColor: "white"
  }
  if (customBlockDivStyle) {
    blockDivStyle = {
      ...blockDivStyle,
      ...customBlockDivStyle
    }
  }

  return <div ref={ref} style={{position: "relative"}}>
    {!animationFinished && <div style={blockDivStyle}/>}
    <animated.div style={{...styles, position: "relative", zIndex: 400,}}>
    {image && <img src={image} style={imageStyles} alt=""/>}
    </animated.div>
  </div>;
}

export default MosaicGridImage