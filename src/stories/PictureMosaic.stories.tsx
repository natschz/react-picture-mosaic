import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import PictureMosaic from "../components/PictureMosaic";
import mosaicImage from "../../devAssets/mosaicImage.jpg"
import galleryImage from "../../devAssets/galleryImage.jpg"

export default {
  title: 'PictureMosaic',
  component: PictureMosaic,
  decorators: [
    (Story) => (
      <Story/>
    ),
  ],
} as ComponentMeta<typeof PictureMosaic>;

const ContainerTemplate: ComponentStory<typeof PictureMosaic> = (args) => <div style={{
  width: "500px",
  height: "350px",
  margin: "50px"
}}>
  <PictureMosaic {...args} />
</div>;

const Template: ComponentStory<typeof PictureMosaic> = (args) => <div style={{
  position: "absolute",
  width: "100%",
  height: "100%",
  left: "0",
  top: "0"
}}>
  <PictureMosaic {...args} />
</div>;

export const Default = Template.bind({});
Default.args = {
  columns: 10,
  rows: 10,
  mosaicImage: mosaicImage,
  loadTileImage: () => { return galleryImage },
  imageInterval: 3000,
};

export const Container = ContainerTemplate.bind({});
Container.args = {
  columns: 10,
  rows: 10,
  mosaicImage:  `https://picsum.photos/1920/1080?random=${Math.random()}`,
  imageSeed: Array.from(Array(100).keys()).map(_ => `https://picsum.photos/1920/1080?random=${Math.random()}`),
  loadTileImage: () => { return  `https://picsum.photos/1920/1080?random=${Math.random()}` },
  imageInterval: 3000,
};

export const Seeded = Template.bind({});
Seeded.args = {
  columns: 10,
  rows: 10,
  mosaicImage: "https://picsum.photos/1920/1080",
  loadTileImage: () => { return `https://picsum.photos/1920/1080?random=${Math.random()}` },
  imageSeed: Array.from(Array(100).keys()).map(_ => `https://picsum.photos/1920/1080?random=${Math.random()}`),
  imageInterval: 3000,
};

export const BigSeeded = Template.bind({});
BigSeeded.args = {
  columns: 25,
  rows: 25,
  mosaicImage: "https://picsum.photos/1920/1080",
  loadTileImage: () => { return `https://picsum.photos/1920/1080?random=${Math.random()}` },
  imageSeed: Array.from(Array(625).keys()).map(_ => `https://picsum.photos/1920/1080?random=${Math.random()}`),
  imageInterval: 3000,
};

export const RandomImage = Template.bind({});
RandomImage.args = {
  loop: false,
  columns: 50,
  rows: 50,
  mosaicImage: "https://picsum.photos/1920/1080",
  loadTileImage: () => { return `https://picsum.photos/1920/1080?random=${Math.random()}` },
  imageInterval: 3000,
};