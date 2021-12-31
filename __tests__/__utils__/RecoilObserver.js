import {useEffect} from "react";
import {useRecoilValue} from "recoil";

export const RecoilObserver = ({node, onChange}) => {
    const state = useRecoilValue(node)
    useEffect(() => onChange(state), [onChange, state])
    return null;
};
