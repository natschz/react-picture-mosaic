import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import PictureMosaic from "../components/PictureMosaic";
import overlayImage from "../../devAssets/overlayImage.jpg"
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

const Template: ComponentStory<typeof PictureMosaic> = (args) => <PictureMosaic {...args} />;

export const Default = Template.bind({});
Default.args = {
  columns: 10,
  rows: 10,
  overlayImage: overlayImage,
  loadImage: () => { return galleryImage },
  imageInterval: 3000,
};

export const Seeded = Template.bind({});
Seeded.args = {
  columns: 10,
  rows: 10,
  overlayImage: "https://picsum.photos/1920/1080",
  loadImage: () => { return `https://picsum.photos/1920/1080?random=${Math.random()}` },
  imageSeed: Array.from(Array(100).keys()).map(_ => `https://picsum.photos/1920/1080?random=${Math.random()}`),
  imageInterval: 3000,
};

export const BigSeeded = Template.bind({});
BigSeeded.args = {
  columns: 25,
  rows: 25,
  overlayImage: "https://picsum.photos/1920/1080",
  loadImage: () => { return `https://picsum.photos/1920/1080?random=${Math.random()}` },
  imageSeed: Array.from(Array(625).keys()).map(_ => `https://picsum.photos/1920/1080?random=${Math.random()}`),
  imageInterval: 3000,
};

export const RandomImage = Template.bind({});
RandomImage.args = {
  loop: false,
  columns: 50,
  rows: 50,
  overlayImage: "https://picsum.photos/1920/1080",
  loadImage: () => { return `https://picsum.photos/1920/1080?random=${Math.random()}` },
  imageInterval: 3000,
};