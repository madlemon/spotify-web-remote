import {renderWithSessionAndRecoil} from "../__utils__/reactUtils";
import PlaylistEditDialog from "../../components/PlaylistEditDialog";
import {fireEvent, screen, waitFor} from "@testing-library/react";

describe('PlaylistEditDialog component', () => {

    const renderPlaylistEditDialog = (...extraComponents) => {
        const callback = jest.fn();
        const utils = renderWithSessionAndRecoil([<PlaylistEditDialog callback={callback}/>, ...extraComponents])

        const editIcon = () => screen.getByTestId('playlist-edit-icon')

        const dialogHeader = () => screen.queryByTestId('dialog-header')
        const closeIcon = () => screen.queryByTestId('dialog-close')

        const nameInput = () => screen.getByTestId('playlist-form-name')
        const descriptionInput = () => screen.getByTestId('playlist-form-description')
        const submitButton = () => screen.getByTestId('playlist-form-submit')

        const clickEdit = () => fireEvent.click(editIcon())
        const clickClose = () => closeIcon() && fireEvent.click(closeIcon())
        const clickSubmit = () => fireEvent.click(submitButton())

        const submittedData = () => callback.mock.calls[0][0]

        return {
            clickEdit,
            clickClose,
            dialogHeader,
            nameInput,
            descriptionInput,
            submitButton,
            clickSubmit,
            submittedData,
            ...utils,
        }
    }

    const renderOpenPlaylistEditDialog = (...extraComponents) => {
        const {clickEdit: openDialog, ...utils} = renderPlaylistEditDialog(extraComponents);

        openDialog()

        return {
            ...utils,
        }
    }
    test('it renders without crashing', () => {
        renderPlaylistEditDialog()
    });

    test('it opens when edit-icon is clicked', () => {
        const {
            clickEdit,
            dialogHeader,
            nameInput,
            descriptionInput,
            submitButton,
        } = renderPlaylistEditDialog()

        clickEdit()

        expect(dialogHeader()).toBeInTheDocument()
        expect(nameInput()).toBeInTheDocument()
        expect(descriptionInput()).toBeInTheDocument()
        expect(submitButton()).toBeInTheDocument()
    });

    test('it closes when x-icon is clicked', () => {
        const {
            clickClose,
            dialogHeader
        } = renderOpenPlaylistEditDialog()

        clickClose()

        expect(dialogHeader()).not.toBeInTheDocument()
    });

    test('it returns formdata in callback on submit and closes', async () => {
        const {
            nameInput,
            descriptionInput,
            clickSubmit,
            submittedData,
        } = renderOpenPlaylistEditDialog()

        fireEvent.change(nameInput(), {target: {value: 'testname'}})
        fireEvent.change(descriptionInput(), {target: {value: 'lorem ipsum'}})
        clickSubmit()

        await waitFor(() => {
            expect(submittedData()).toEqual({name: 'testname', description: 'lorem ipsum'});
        })
    });

})
