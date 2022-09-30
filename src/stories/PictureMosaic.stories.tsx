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