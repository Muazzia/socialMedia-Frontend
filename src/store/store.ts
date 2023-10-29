import { create } from "zustand";

export type UserF = {
  _id: string;
  firstName: string;
  lastName: string;
  occupation: string;
  location: string;
  picturePath: string;
  imgSecureUrl: string;
};

type S = {
  userId: string;
  userName: string;
  userImgPath: string;
  userFriends: UserF[];
  searchStr: string;
  setUserImgPath: (img: string) => void;
  setUserName: (name: string) => void;
  setUserId: (id: string) => void;
  setUserFrindsArr: (arr: UserF[]) => void;
  setSearchStr: (search: string) => void;
};

const Store = create<S>((set) => ({
  userId: "",
  userName: "",
  setUserName: (name: string) => set(() => ({ userName: name })),
  setUserId: (id: string) => set(() => ({ userId: id })),
  userFriends: [],
  setUserFrindsArr: (arr: UserF[]) => set(() => ({ userFriends: arr })),
  searchStr: "",
  setSearchStr: (search: string) => set(() => ({ searchStr: search })),
  userImgPath: "",
  setUserImgPath: (img: string) => set(() => ({ userImgPath: img })),
}));

export default Store;
