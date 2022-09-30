# React Picture Mosaic

React Picture Mosaic is a simple animated picture mosaic.

## Usage

```jsx
const loadImage = (column, row) => {
  // ... get the image some way
  return "https://path.to.image"
}

<PictureMosaic
  columns={15}
  rows={10}
  newImageInterval={3000}
  overlayImage={"https://path.to.image"}
  loadImage={mosaicImages}
/>
```

### Custom blend mode

```jsx
const overlayStyle = {
  mixBlendMode: "color-burn",
}

<PictureMosaic
  overlayStyle={overlayStyle}
/>
```

### Custom image positioning
It is possible to overwrite the algorithm which places the images. 

```jsx
// Randomly Position the images
const rows = 10;
const columns = 10;

const nextImageTarget =  (previousColumn, previousRow) => {
  const maxIndex = columns * rows
  const randomIndex = Math.floor(Math.random()*(maxIndex + 1))
  const column = randomIndex % columns
  const row = Math.floor(randomIndex / columns)

  return {
    column,
    row
  }
}

<PictureMosaic
  // required params...
  columns={15}
  rows={10}
  nextImageTarget={nextImageTarget}
/>
```

### Custom animation
It is also possible to create some custom animations, just mind that every property you want to animate,
has to be present in the imageContainerStyle as well.

_Also keep in mind that delays and animation duration are not respected by the interval._

_Besides the normal css attributes, there are some react-spring attributes like `delay` or `{config: duration}`._ 

```jsx
// Instead of having the preview image in the midel the are now in the buttom right and fly in quite fast
const customImageContainerStyle = {
  opacity: 0,
  zIndex: 400,
  width: `0px`,
  height: `0px`,
  transform: "translate(0px, 0px)"
}

const customCreateImageContainerAnimations = (column, row, element, gridRect, config) => {
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
  imageContainerStyle={customImageContainerStyle}
  createImageContainerAnimations={customCreateImageContainerAnimations}
/>
```

## Parameters

### Required Parameters

| Option            | Description                                                                                                                                                |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **columns**       | Number of columns the displayed mosaic will have.                                                                                                          |
| **rows**          | Number of rows the displayed mosaic will have.                                                                                                             |
| **overlayImage**  | Image which the mosaic build up to.                                                                                                                        |
| **loadImage**     | This function will be called everytime a new image is added to the mosaic and gets the targeted row and column passed as arguments`(column, row) => any` . |
| **imageInterval** | Interval in milliseconds in which new images will be added to the mosaic.                                                                                  |

### Optional Parameters

| Option                             | Description                                                                                                                                                                                                                                                                                                                                                                                       |
|------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **loop**                           | `default: true` If set to false, then after all tiles are filled the mosaic will stop.                                                                                                                                                                                                                                                                                                            |
| **nextImageTarget**                | A function determining the next target column and row `(previousColumn, previousRow) => {column, row}`. (Previous values will be column: maxColumns-1 and row: maxRows-1 for the first image)                                                                                                                                                                                                     |
| **overlayStyle**                   | Additional styles for the overlayImage. (CSSProperties)                                                                                                                                                                                                                                                                                                                                           |
| **blockingTileStyle**              | Each tile/cell of the mosaic has a blocking tile, which can be style trough this. (CSSProperties)                                                                                                                                                                                                                                                                                                 |
| **imageContainerStyle**            | The style of the image container.                                                                                                                                                                                                                                                                                                                                                                 |
| **createImageContainerAnimations** | A function which should return a array of (react-spring style) animations, getting the column and row of the image, the image element as well as the bounding rect of the grid container and the current config. `(element, column, row, gridRect, config) => any[]`<br/> _Note that every property you are trying to animate, should appear in the imageContainer styles so it can be animated._ |

