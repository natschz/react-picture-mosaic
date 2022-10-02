# React Picture Mosaic

React Picture Mosaic is a simple animated picture mosaic.

![react-picture-mosaic](https://user-images.githubusercontent.com/7605522/193438913-a1a1dfb3-ffec-4669-9746-52b133c42d06.gif)


## Getting Started

#### Install
Install react-picture-mosaic
```shell
npm i --save react-picture-mosaic
```

#### Basic usage    

```jsx
import PictureMosaic from "react-picture-mosaic";

const loadImage = (column, row) => {
  return "https://path.to.image"
}

<PictureMosaic
  columns={15}
  rows={10}
  overlayImage={"https://path.to.image"}
  loadImage={loadImage}
  imageInterval={3000}
/>
```

### Custom blend mode

```jsx
const overlayStyle = {
  mixBlendMode: "color-burn",
}

<PictureMosaic
  // required params...
  overlayStyle={overlayStyle}
/>
```

### Custom image positioning
It is possible to overwrite the algorithm which places the images. 

This will place the images completely random.

```jsx
const nextTileTarget =  (previousColumn, previousRow, config) => {
  const maxIndex = config.columns * config.rows
  const randomIndex = Math.floor(Math.random()*(maxIndex + 1))
  const column = randomIndex % config.columns
  const row = Math.floor(randomIndex / config.columns)

  return {
    column,
    row
  }
}

<PictureMosaic
  // required params...
  nextTileTarget={nextTileTarget}
/>
```

### Custom animation
It is also possible to create some custom animations, just mind that every property you want to animate,
has to be present in the createTileStyle as well.

_Also keep in mind that delays and animation duration are not respected by the interval._

_Besides the normal css attributes, there are some react-spring attributes like `delay` or `{config: duration}`._ 

```jsx
const createTileStyle = (x, y, width, height) => {
  return {
    zIndex: 400,
    opacity: 0.3,
    width: `${width}px`,
    height: `${height}px`,
    transform: `translate(${x}px, ${y}px)`
  }
}

const createTileAnimations = (column, row, element, gridRect, config) => {
  const width = Math.round((gridRect?.width || 1) / config.columns)
  const height = Math.round((gridRect?.height || 1) / config.rows)
  const translateX = column * width
  const translateY = row * height

  const elementRect = element.getBoundingClientRect()
  const previewWidth = gridRect.width / 4
  const previewHeight = gridRect.height / 4
  const previewTranslateX = gridRect.width - (previewWidth)
  const previewTranslateY = gridRect.height - (previewHeight)

  return [
    {
      delay: 0,
      config: {
        duration: 0
      },
      zIndex: 500,
      opacity: 1,
      width: `${previewWidth}px`,
      height: `${previewHeight}px`,
      transform: `translate(${previewTranslateX}px, ${previewTranslateY}px)`
    },
    {
      delay: 2000,
      config: {
        duration: 1000
      },
      zIndex: 400,
      opacity: 0.3,
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate(${translateX}px, ${translateY}px)`
    }
  ]
}

<PictureMosaic
  // required params...
  createTileStyle={createTileStyle}
  createTileAnimations={createTileAnimations}
/>
```

# Parameters

For further customization reference the parameters below.

## Required Parameters

### `columns: number`
Number of columns for the grid

### `rows: number`
Number of rows for the grid

### `overlayImage: string`
Image which the whole mosaic builds up to

### `loadImage: (column: number, row: number) => string`
Called everytime a new image is added two the grid, where `column` and `row` is the targeted tile position.<br/>
This should return the path to the image that should be shown on this tile.

### `imageInterval: number`
Interval (in milliseconds) in which new images will appear. <br/>
_Note that this interval is not the time between new images. So if the interval is 3 seconds but the image animation takes 5 then you will have two overlapping animations_

## Optional Parameters

### `imageSeed?: string[]`
It is possible to seed the mosaic with images, this then should just be an array of paths.<br/>

### `loop?: boolean` 
`default: true`<br/>
If true then new images will be added even if every tile of the mosaic has a image.

### `overlayStyle?: CSSProperties`
Styles for the overlay image.

### `blockingTileStyle?: CSSProperties`
Before a tile is set to an image, it is blocked by another tile, which is just white. You can overwrite the style 
of those blocking tiles trough this.

### `createTileStyle?: (x: number, y: number, width: number, height: number) => CSSProperties`
So that css properties can be animated, they have to appear here. (The default can be found [here](src/configs/defaultConfig.tsx))

### `createTileAnimations?: (column: number, row: number, element: HTMLElement, gridRect: DOMRect, config: MosaicConfig) => any[]`
Return an array of css properties and also there is the option for some additional react-spring properties (version 9).
(The default can be found [here](src/configs/defaultConfig.tsx))

### `canvasStyle: CSSProperties`
After tiles are animated, they will be drawn to a canvas, that canvas can be styled trough this property.

### `drawTileToCanvas?: (canvas: any, image: MosaicImage, width, height, x, y) => void`
After tiles are animated, they will be drawn to a canvas, you can handle how images will be drawn on the canvas
trough this property. (The default can be found [here](src/configs/defaultConfig.tsx))

### `nextTileTarget?: (previousColumn: number, previousRow: number, config: MosaicConfig) => { column: number, row: number }`
Trough this it is possible to define the next target tile, where the next image will be placed in. (The default can be found [here](src/configs/defaultConfig.tsx))
