import {createContext, ReactNode, useContext} from "react";

export interface MosaicImage {
  // Path to the image
  image?: string
  // Determines if this image should be animated (set to false if it is a seed image)
  shouldAnimate: boolean
  // If true the animation of this tile was finished
  animationFinished: boolean
  // If true the blocking tile for this image will be shown.
  showBlockingTile: boolean
}

export interface MosaicGridData {
  images: MosaicImage[]
  gridRect: DOMRect
  onAnimationFinished: (index: number) => void
}

const MosaicContext = createContext<MosaicGridData | null>(null)

interface MosaicProviderProps {
  images: MosaicImage[]
  gridRect: DOMRect
  onAnimationFinished: (index: number) => void
  children: ReactNode
}

const MosaicGridProvider = ({images, gridRect, onAnimationFinished, children}: MosaicProviderProps) => {
  const data: MosaicGridData = {
    images,
    gridRect,
    onAnimationFinished,
  }
  return <MosaicContext.Provider value={data}>
    {children}
  </MosaicContext.Provider>
}

const useMosaicGrid = (): MosaicGridData => {
  const context = useContext(MosaicContext)

  if (!context) {
    throw new Error("useMosaicGrid can't be used outside of a MosaicGridProvider")
  }

  return context
}

const useMosaicImage = (index: number): MosaicGridData & {image: MosaicImage} => {
  const mosaicGridData = useMosaicGrid()
  const image = mosaicGridData.images[index]

  return {
    ...mosaicGridData,
    image
  }
}

export {
  MosaicGridProvider,
  useMosaicImage,
  useMosaicGrid,
}