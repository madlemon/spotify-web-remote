import {renderWithSessionAndRecoil} from "../__utils__/reactUtils";
import PlaylistEditDialog from "../../components/PlaylistEditDialog";
import {fireEvent, screen, waitFor} from "@testing-library/react";

describe('PlaylistEditDialog component', () => {

    const renderPlaylistEditDialog = (...extraComponents) => {
        const utils = renderWithSessionAndRecoil([<PlaylistEditDialog/>, ...extraComponents])

        const editIcon = () => screen.getByTestId('playlist-edit-icon')
        const closeIcon = () => screen.queryByTestId('dialog-close')
        const dialogHeader = () => screen.queryByTestId('dialog-header')

        const clickEdit = () => fireEvent.click(editIcon())
        const clickClose = () => closeIcon() && fireEvent.click(closeIcon())


        return {
            clickEdit,
            clickClose,
            dialogHeader,
            ...utils,
        }
    }

    test('it renders without crashing', () => {
        renderPlaylistEditDialog()
    });

    test('it opens when edit-icon is clicked', () => {
        const {
            clickEdit,
            dialogHeader
        } = renderPlaylistEditDialog()

        clickEdit()

        expect(dialogHeader()).toBeInTheDocument()
    });

    test('it closes when x-icon is clicked', async () => {
        const {
            clickEdit,
            clickClose,
            dialogHeader
        } = renderPlaylistEditDialog()

        clickEdit()
        clickClose()

        await waitFor(() => {
            expect(dialogHeader()).not.toBeInTheDocument()
        })
    });


})
