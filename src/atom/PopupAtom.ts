import { atom, selector, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: 'sessionStorage',
    storage : sessionStorage,
})

const popupAtom = atom<number>({
    key : "PopupAtom",
    default: 9999,
    effects_UNSTABLE: [persistAtom],
});

function addPopup(){
    const [curZIndex, setCurZIndex] = useRecoilState(PopupAtom);
    setCurZIndex(() => curZIndex + 1);
}

export { popupAtom, addPopup };