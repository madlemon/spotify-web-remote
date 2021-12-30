import React from "react";
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import Center from "../../components/Center";
import {SessionProvider} from "next-auth/react";
import {RecoilRoot} from "recoil";
import {mockSession} from "../__mocks__/sessionmock";

describe('Center component', () => {

    it('renders index without crashing', () => {

        render(
            <SessionProvider session={mockSession}>
                <RecoilRoot>
                    <Center/>
                </RecoilRoot>
            </SessionProvider>
        )
    })
})
