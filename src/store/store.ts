import { create } from "zustand";

export type UserF = {
  _id: string;
  firstName: string;
  lastName: string;
  occupation: string;
  location: string;
  picturePath: string;
};

type S = {
  userId: string;
  userName: string;
  setUserName: (name: string) => void;
  setUserId: (id: string) => void;
  userFriends: UserF[];
  setUserFrindsArr: (arr: UserF[]) => void;
  searchStr: string;
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
}));

export default Store;
