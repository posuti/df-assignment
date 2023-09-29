import { fireEvent, render } from "@testing-library/react";

import ItemsTable, { ItemControls, ItemStatusDisplay } from "./ItemsTable";
import { ApiStatus, Item, ItemStatus } from "../shared/types";

describe('ItemTable Component', () => {

    it('renders connecting state', () => {

        const { queryByTestId } = render(
            <ItemsTable status={ApiStatus.connecting} items={[]} onDelete={() => { }} />
        );

        expect(queryByTestId('connectingContainer')).toBeInTheDocument();
        expect(queryByTestId('errorContainer')).not.toBeInTheDocument();
        expect(queryByTestId('placeholderContainer')).not.toBeInTheDocument();
        expect(queryByTestId('itemsTable')).not.toBeInTheDocument();

    });

    it('renders items', () => {

        const testItems: Item[] = [
            { id: "1" },
            { id: "2" },
            { id: "3" },
            { id: "4" },
            { id: "5" },
        ]

        const { getAllByRole } = render(
            <ItemsTable status={ApiStatus.ready} items={testItems} onDelete={() => { }} />
        );

        expect(getAllByRole('row').length).toBe(testItems.length + 1);

    });

});

describe('ItemStatus Component', () => {

    it('renders ready status', () => {
        const { getByText } = render(<ItemStatusDisplay status={ItemStatus.ready} />);
        expect(getByText('ready')).toBeInTheDocument();
    });

    it('renders pending status', () => {
        const { queryByText } = render(<ItemStatusDisplay status={ItemStatus.pending} />);
        expect(queryByText('ready')).not.toBeInTheDocument();
    });

});

describe('ItemControls Component', () => {

    it('calls onDelete on click when ready', () => {
        const onDeleteMock = jest.fn();
        const { getByText } = render(<ItemControls status={ItemStatus.ready} onDelete={onDeleteMock} />);
        const button = getByText('Delete');
        fireEvent.click(button);
        expect(onDeleteMock).toHaveBeenCalled();
    });

    it('ignores click when not ready', () => {
        const onDeleteMock = jest.fn();
        const { getByText } = render(<ItemControls status={ItemStatus.pending} onDelete={onDeleteMock} />);
        const button = getByText('Delete');
        fireEvent.click(button);
        expect(onDeleteMock).not.toHaveBeenCalled();
    });

});

