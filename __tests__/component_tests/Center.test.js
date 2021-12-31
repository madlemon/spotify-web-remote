import React from "react";
import '@testing-library/jest-dom'
import Center from "../../components/Center";
import {renderWithSessionAndRecoil} from "../__utils__/reactUtils";

describe('Center component', () => {

    it('renders index without crashing', () => {
        renderWithSessionAndRecoil(<Center/>)
    })
})
