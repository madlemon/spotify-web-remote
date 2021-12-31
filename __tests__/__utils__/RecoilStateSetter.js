import {useSetRecoilState} from "recoil";

export const RecoilStateSetter = ({node, defaultValue}) => {
    const setState = useSetRecoilState(node)
    setState(defaultValue)
    return null;
};
