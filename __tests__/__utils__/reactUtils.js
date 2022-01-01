import {render} from "@testing-library/react";
import {mockSession} from "../__mocks__/mockObjects";
import {RecoilRoot} from "recoil";
import {SessionProvider} from "next-auth/react";

const renderWithSessionAndRecoil = (...components) => {
    return render(
        <SessionProvider session={mockSession}>
            <RecoilRoot>
                {components.map(c => c)}
            </RecoilRoot>
        </SessionProvider>
    );
}

export {renderWithSessionAndRecoil}
