import React from "react"
import BlockingTile from "./BlockingTile";
import {useMosaicImage} from "../../utils/MosaicGridProvider";
import AnimatedTile from "./AnimatedTile";

export interface TileProps {
  index: number
}

const Tile = ({index}: TileProps) => {
  const {image} = useMosaicImage(index)
  return <>
    {(!image.image || image.showBlockingTile) && <BlockingTile index={index}/>}
    {image.image && image.shouldAnimate && !image.animationFinished && <AnimatedTile index={index}/>}
    {/*{image.image && (!image.shouldAnimate || image.animationFinished) && <FinalTile index={index}/>}*/}
  </>
}
export default Tile
