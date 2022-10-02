// import React, {CSSProperties, useMemo} from "react"
// import useImageInformation from "./utils/useImageInformation";
// import useResizedImage from "../../utils/useResizedImage";
// import {useMosaicImage} from "./utils/MosaicGridProvider";
// import {useMosaicConfig} from "../../utils/MosaicConfigProvider";
//
// export interface FinalTileProps {
//   index: number
// }
//
// const FinalTile = ({index}: FinalTileProps) => {
//   const {createTileStyle} = useMosaicConfig()
//   const {image, gridRect} = useMosaicImage(index)
//   const {width, height, x, y} = useImageInformation(index, gridRect)
//   // const resizedImage = useResizedImage(image.image, width, height)
//
//   const tileStyles = useMemo(() => createTileStyle(x, y, width, height), [x, y, width, height, createTileStyle])
//
//   const imageStyles: CSSProperties = {
//     zIndex: 400,
//     display: "inline-block",
//     position: "absolute",
//     ...tileStyles,
//     backgroundImage: image.image && `url("${image.image}")`,
//     backgroundRepeat: "no-repeat",
//     backgroundPosition: "center",
//     backgroundSize: "cover",
//   }
//
//   return <div
//     className={"final-tile"}
//     style={imageStyles}
//   />
// }
//
// export default FinalTile
