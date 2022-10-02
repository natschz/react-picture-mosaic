import {createContext, CSSProperties, ReactNode, useContext} from "react";
import {MosaicImage} from "./MosaicGridProvider";

export interface MosaicConfig {
  columns: number
  rows: number
  overlayImage: string
  loadImage: (column: number, row: number) => string
  imageInterval: number
  imageSeed: string[]
  loop: boolean
  overlayStyle: CSSProperties
  blockingTileStyle: CSSProperties
  createTileStyle: (x: number, y: number, width: number, height: number) => CSSProperties
  createTileAnimations: (column: number, row: number, element: HTMLElement, gridRect: DOMRect, config: MosaicConfig) => any[]
  canvasStyle: CSSProperties
  drawTileToCanvas: (canvas: any, image: MosaicImage, width: number, height: number, x: number, y: number) => void
  nextTileTarget: (previousColumn: number, previousRow: number, config: MosaicConfig) => { column: number, row: number }
}

const MosaicContext = createContext<MosaicConfig | null>(null)

interface MosaicProviderProps {
  children: ReactNode
  config: MosaicConfig
}

const MosaicConfigProvider = ({children, config}: MosaicProviderProps) => {
  return <MosaicContext.Provider value={config}>
    {children}
  </MosaicContext.Provider>
}

const useMosaicConfig = (): MosaicConfig => {
  const context = useContext(MosaicContext)

  if (!context) {
    throw new Error("useMosaic can't be used outside of a MosaicProvider")
  }

  return context
}

export {
  MosaicConfigProvider,
  useMosaicConfig
}