# React Picture Mosaic

React Picture Mosaic is a simple animated picture mosaic.

## Usage

This will create a mosaic with 15 columns and 10 rows.
A new image will appear every 3000 seconds.

```jsx
<PictureMosaic
  newImageInterval={3000}
  columns={15}
  rows={10}
  overlayImage={overlayImage}
  mosaicImages={mosaicImages}
/>
```

## Options

| Option                     | Description                                                                                                                                                                              | Example                                                                                       |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| **newImageInterval**       | Interval(ms) in which new images appear                                                                                                                                                  | 3000                                                                                          |
| **columns**                | Columns of the mosaic grid                                                                                                                                                               | 10                                                                                            |
| **rows**                   | Rows of the mosaic grid                                                                                                                                                                  | 10                                                                                            |
| **overlayImage**           | Image which the mosaic build up to                                                                                                                                                       | path to your image                                                                            |
| **mosaicImages**           | The images that build the mosaic                                                                                                                                                         | array of image paths                                                                          |
| **customBlockDivStyle**    | Just CSSProperties (style) to style the divs which overlap the overlay until the mosaic image is shown                                                                                   | `{backgroundColor: "green"}`                                                                  |
| **customInitialAnimation** | This is the initial animation base on react-spring animation. (If you modify the custom animations it's important to have the animated properties here so react-spring can animate them) | `{ opacity: 0, left: 0, top: 0, transform: "perspective(500px) translate3d(0px, 0px, 0px)" }` |
| **customAnimations**       | Trough this it is possible to overwrite the animations, which are responsible for animating the mosaic images.                                                                           | see below                                                                                     |

### Custom Animation

```jsx
const customInitialAnimation = {
  opacity: 0,
  left: 0,
  top: 0, 
  transform: "perspective(500px) translate3d(0px, 0px, 0px)"
}

const customAnimations = (element: any, gridRect: DOMRect | undefined) => {
  const rect = element.getBoundingClientRect()

  const targetX = 160
  const targetY = 80

  return [
    {
      delay: 0,
      config: {
        duration: 0
      },
      opacity: 1,
      left: (element.offsetLeft) * -1,
      top: (element.offsetTop) * -1,
      transform: `perspective(500px) translate3d(${targetX}px, ${targetY}px, 399px)`
    },
    {
      delay: 1000,
      config: {
        duration: 1000
      },
      opacity: 0.3,
      left: 0,
      top: 0,
      transform: `perspective(500px) translate3d(0px, 0px, 0px)`
    }
  ]
}
```

