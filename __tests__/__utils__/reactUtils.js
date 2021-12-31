import {render} from "@testing-library/react";
import {mockSession} from "../__mocks__/sessionmock";
import {RecoilRoot} from "recoil";
import {SessionProvider} from "next-auth/react";

const renderWithSessionAndRecoil = (testComponent) => {
    return render(
        <SessionProvider session={mockSession}>
            <RecoilRoot>
                {testComponent}
            </RecoilRoot>
        </SessionProvider>
    );
}

export {renderWithSessionAndRecoil}
