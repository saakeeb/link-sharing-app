import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { ImageIcon } from './icon';

export default {
  title: 'Components/ImageIcon',
  component: ImageIcon,
  argTypes: {
    name: {
      control: {
        type: 'select',
        options: ['menu', 'user', 'mailbox', 'link', 'git', 'facebook'],
      },
    },
    className: { control: 'text' },
    alt: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<typeof ImageIcon> = (args) => <ImageIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'menu',
  className: '',
  alt: 'Menu Icon',
};

export const UserIcon = Template.bind({});
UserIcon.args = {
  name: 'user',
  className: '',
  alt: 'User Icon',
};

export const MailboxIcon = Template.bind({});
MailboxIcon.args = {
  name: 'mailbox',
  className: '',
  alt: 'Mailbox Icon',
};

export const LinkIcon = Template.bind({});
LinkIcon.args = {
  name: 'link',
  className: '',
  alt: 'Link Icon',
};

export const GitIcon = Template.bind({});
GitIcon.args = {
  name: 'git',
  className: '',
  alt: 'Git Icon',
};

export const FacebookIcon = Template.bind({});
FacebookIcon.args = {
  name: 'facebook',
  className: '',
  alt: 'Facebook Icon',
};
