
import { useItemsContext } from "../contexts/ItemsProvider";
import { ApiStatus, SocketStatus } from "../shared/types";
import ItemsPanel from "./ItemsPanel";
import renderer from 'react-test-renderer';

jest.mock('../contexts/ItemsProvider', () => ({
    useItemsContext: jest.fn(),
    useDeleteItem: jest.fn(),
}));

describe('ItemsPanel Component', () => {
    it('matches the snapshot', () => {

        const contextParams = {
            items: [{ id: "1" }],
            status: ApiStatus.ready,
            socketStatus: SocketStatus.ready,
            dispatch: jest.fn()
        };

        (useItemsContext as jest.Mock).mockReturnValue(contextParams);

        const tree = renderer.create(<ItemsPanel />).toJSON();
        expect(tree).toMatchSnapshot();

    });
});
