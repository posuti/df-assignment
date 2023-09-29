import type { Meta, StoryObj } from '@storybook/react';
import SoccetStatusPanel from './SocketStatusPanel';
import { SocketStatus } from '../shared/types';

const meta: Meta<typeof SoccetStatusPanel> = {
    title: 'ItemsPanel/SoccetStatusPanel',
    component: SoccetStatusPanel,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SoccetStatusPanel>;

export const Ready: Story = {
    args: {
        status: SocketStatus.ready,
    }
};

export const Connected: Story = {
    args: {
        status: SocketStatus.connecting,
    }
};
