import {render} from '@testing-library/react'
import Home from "../pages";
import {RecoilRoot} from "recoil";
import {SessionProvider} from "next-auth/react";
import {mockSession} from "./__fixtures__/sessionmock";

describe('Home', () => {
    it('renders index without crashing', () => {

        render(
            <SessionProvider session={mockSession}>
                <RecoilRoot>
                    <Home/>
                </RecoilRoot>
            </SessionProvider>
        )
    })
})
