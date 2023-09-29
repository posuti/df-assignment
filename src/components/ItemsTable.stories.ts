import type { Meta, StoryObj } from '@storybook/react';
import ItemsTable from './ItemsTable';
import { ApiStatus, ItemStatus } from '../shared/types';

const meta: Meta<typeof ItemsTable> = {
    title: 'ItemsPanel/ItemsTable',
    component: ItemsTable,
    tags: ['autodocs'],

};

export default meta;

type Story = StoryObj<typeof ItemsTable>;

export const Items: Story = {
    args: {
        status: ApiStatus.ready,
        items: [
            {id: "id1", name: "Item 1", status: ItemStatus.ready},
            {id: "id2", name: "Item 2", status: ItemStatus.ready},
            {id: "id3", name: "Item 3", status: ItemStatus.ready}
        ],
        onDelete: () => {}
    }
};

export const Loading: Story = {
    args: {
        status: ApiStatus.connecting,
        items: [],
        onDelete: () => {}
    }
};

export const Empty: Story = {
    args: {
        status: ApiStatus.ready,
        items: [],
        onDelete: () => {}
    }
};

export const Error: Story = {
    args: {
        status: ApiStatus.error,
        items: [],
        onDelete: () => {}
    }
};

