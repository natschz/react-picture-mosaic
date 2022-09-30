import {createContext, CSSProperties, ReactNode, useContext} from "react";

export interface MosaicConfig {
  columns: number
  rows: number
  overlayImage: any
  loadImage: (column: number, row: number) => any
  imageInterval: number
  loop: boolean
  nextImageTarget: (previousColumn: number, previousRow: number) => { column: number, row: number }
  overlayStyle: CSSProperties
  blockingTileStyle: CSSProperties
  imageContainerStyle: any
  createImageContainerAnimations: (column: number, row: number, element: HTMLElement, gridRect: DOMRect, config: MosaicConfig) => any[]
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