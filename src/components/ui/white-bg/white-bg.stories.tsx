import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { WhiteBG, WhiteBGProps } from './white-bg';

export default {
  title: 'Components/WhiteBG',
  component: WhiteBG,
} as Meta;

const Template: StoryFn<WhiteBGProps> = (args) => <WhiteBG {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <div>Content inside WhiteBG</div>,
};

export const WithCustomContent = Template.bind({});
WithCustomContent.args = {
  children: (
    <div>
      <h1>Custom Title</h1>
      <p>This is some custom content inside the WhiteBG component.</p>
    </div>
  ),
};
