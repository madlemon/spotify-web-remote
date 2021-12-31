import {screen, waitFor} from '@testing-library/react'
import Sidebar from "../../components/Sidebar";
import {renderWithSessionAndRecoil} from "../__utils__/reactUtils";

describe('Sidebar component', () => {

    test('it renders and has \'Start\', \'Suchen\', \'Bibliothek\', \'Playlist erstellen\' and \'Lieblingssongs\'', () => {
        renderWithSessionAndRecoil(<Sidebar/>)
        expect(screen.getByText('Start')).toBeInTheDocument()
        expect(screen.getByText('Suchen')).toBeInTheDocument()
        expect(screen.getByText('Bibliothek')).toBeInTheDocument()
        expect(screen.getByText('Playlist erstellen')).toBeInTheDocument()
        expect(screen.getByText('Lieblingssongs')).toBeInTheDocument()

    });

    test('it renders playlists from spotify api', async () => {
        renderWithSessionAndRecoil(<Sidebar/>)

        await waitFor(() => screen.getByText('Meine Tolle Playlist'))
        expect(screen.getByText('Meine Tolle Playlist')).toBeInTheDocument()
        expect(screen.getByText('Mal was anderes')).toBeInTheDocument()

    });
})
