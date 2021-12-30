import {render} from '@testing-library/react'
import Home from "../pages";
import {RecoilRoot} from "recoil";
import {SessionProvider} from "next-auth/react";
import {mockSession} from "./__mocks__/sessionmock";

describe('Home', () => {
    it('renders index page without crashing', () => {

        render(
            <SessionProvider session={mockSession}>
                <RecoilRoot>
                    <Home/>
                </RecoilRoot>
            </SessionProvider>
        )
    })
})
