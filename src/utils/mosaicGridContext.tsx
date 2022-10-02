import {createContext, CSSProperties, ReactNode, useContext} from "react";

export interface MosaicGridContext {
  imageAnimationFinished: (image, index) => void
}

const MosaicContext = createContext<MosaicGridContext | null>(null)

interface MosaicProviderProps {
  canvasRef: ReactNode
  children: ReactNode
  context: MosaicGridContext
}

const MosaicGridContextProvider = ({children, context}: MosaicProviderProps) => {
  return <MosaicContext.Provider value={context}>
    {children}
  </MosaicContext.Provider>
}

const useMosaicGridContext = (): MosaicGridContext => {
  const context = useContext(MosaicContext)

  if (!context) {
    throw new Error("useMosaic can't be used outside of a MosaicProvider")
  }

  return context
}

export {
  MosaicGridContextProvider,
  useMosaicGridContext
}