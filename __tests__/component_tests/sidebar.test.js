import {render, screen} from '@testing-library/react'
import Sidebar from "../../components/Sidebar";
import {SessionProvider} from "next-auth/react";
import {RecoilRoot} from "recoil";
import {mockSession} from "../__fixtures__/sessionmock";

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
})
