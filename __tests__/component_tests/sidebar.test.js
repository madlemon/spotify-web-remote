import {render, screen, waitFor} from '@testing-library/react'
import Sidebar from "../../components/Sidebar";
import {SessionProvider} from "next-auth/react";
import {RecoilRoot} from "recoil";
import {mockSession} from "../__mocks__/sessionmock";

describe('Sidebar component', () => {

    test('it renders and has \'Start\', \'Suchen\', \'Bibliothek\', \'Playlist erstellen\' and \'Lieblingssongs\'', () => {
        render(<SessionProvider session={mockSession}>
                <RecoilRoot>
                    <Sidebar/>
                </RecoilRoot>
            </SessionProvider>
        );
        expect(screen.getByText('Start')).toBeInTheDocument()
        expect(screen.getByText('Suchen')).toBeInTheDocument()
        expect(screen.getByText('Bibliothek')).toBeInTheDocument()
        expect(screen.getByText('Playlist erstellen')).toBeInTheDocument()
        expect(screen.getByText('Lieblingssongs')).toBeInTheDocument()

    });

    test('it renders playlists from spotify api', async () => {
        render(<SessionProvider session={mockSession}>
                <RecoilRoot>
                    <Sidebar/>
                </RecoilRoot>
            </SessionProvider>
        );

        await waitFor(() => screen.getByText('Meine Tolle Playlist'))
        expect(screen.getByText('Meine Tolle Playlist')).toBeInTheDocument()
        expect(screen.getByText('Mal was anderes')).toBeInTheDocument()

    });
})
