import React, {CSSProperties} from "react"

export interface MosaicOverlayProps {
  overlayImage: any
}

const MosaicOverlay = ({overlayImage}: MosaicOverlayProps) => {
  const containerStyle: CSSProperties = {
    zIndex: 200,
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url("${overlayImage}")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    mixBlendMode: "overlay"
  }

  return <div style={containerStyle}/>
}

export default MosaicOverlay