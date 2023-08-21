import { atom, useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
import { userType } from "@/type/UserType";

const { persistAtom } = recoilPersist({
    key: 'sessionStorage',
    storage : sessionStorage,
})

const userAtom = atom<userType>({
    key : "userAtom",
    default: {
        userIdx : -1,
        userId : "",
        userName : "비회원",
        accessToken : "",
        isAdmin : false,
    },
    effects_UNSTABLE: [persistAtom],
});

//값 세팅
function SetUser(params : userType){useSetRecoilState(userAtom)(params);}

//값 리셋
function ResetUser(){useResetRecoilState(userAtom);}

//UserId get
function GetUserIdx():number {return useRecoilValue(userAtom).userIdx;}

//로그인한 회원 idx와 맞는지 확인하는 함수
function CheckUserIdx(checkIdx: number):boolean {return checkIdx == GetUserIdx();}

//userId Get
function GetUserId():string {return useRecoilValue(userAtom).userId;}

//userName Get
function GetUserName():string {return useRecoilValue(userAtom).userName;}

//accessToken Get
function SetAccessToken(accessToken: string) {
    const user = {...useRecoilValue(userAtom), accessToken};
    SetUser(user);
}

//accessToken Get
function GetAccessToken():string {return useRecoilValue(userAtom).accessToken;}

function GetIsAdmin():boolean {return useRecoilValue(userAtom).isAdmin;}

export { userAtom, SetUser, ResetUser, GetUserIdx, CheckUserIdx, GetUserId, GetUserName, SetAccessToken, GetAccessToken, GetIsAdmin };