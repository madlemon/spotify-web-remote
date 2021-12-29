import React from "react";
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import Center from "../../components/Center";
import {SessionProvider} from "next-auth/react";
import {mockSession} from "../__fixtures__/sessionmock";
import {RecoilRoot} from "recoil";

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
