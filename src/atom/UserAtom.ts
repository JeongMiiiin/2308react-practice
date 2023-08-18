import { atom, useRecoilValue } from "recoil";
import { recoilPersist } from "recoil-persist";
import { UserType } from "../type/UserType";

const { persistAtom } = recoilPersist({
    key: 'sessionStorage',
    storage : sessionStorage,
})

export const UserAtom = atom<UserType>({
    key : "UserAtom",
    default: {
        userId : -1,
        userName : "비회원",
        accessToken : "",
    },
    effects_UNSTABLE: [persistAtom],
})

//UserId체크 함수
export function CheckUserId(checkId: number){
    return checkId == useRecoilValue(UserAtom).userId;
}