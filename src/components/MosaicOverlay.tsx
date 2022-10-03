import React, {CSSProperties} from "react"
import {useMosaicConfig} from "../utils/MosaicConfigProvider";

const MosaicOverlay = () => {
  const mosaicConfig = useMosaicConfig()

  let containerStyle: CSSProperties = {
    zIndex: 250,
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundImage: `url("${mosaicConfig.overlayImage}")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    mixBlendMode: "lighten",
    ...mosaicConfig.overlayStyle
  }

  return <div className={"mosaic-overlay"} style={containerStyle}/>;
}

export default MosaicOverlay