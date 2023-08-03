import { create } from "zustand";

type UserF = {
  _id: string;
  firstName: string;
  lastName: string;
  occupation: string;
  location: string;
  picturePath: string;
};

type S = {
  userId: string;
  setUserId: (id: string) => void;
  userFriends: UserF[];
  // setUserFriends: (id: string) => void;
  // removeUserFriends: (id: string) => void;
  setUserFrindsArr: (arr: UserF[]) => void;
};

const Store = create<S>((set) => ({
  userId: "",
  setUserId: (id: string) => set(() => ({ userId: id })),
  userFriends: [],

  // setUserFriends: (id: string) =>
  //   set((state) => ({ userFriends: [...state.userFriends, id] })),
  // removeUserFriends: (id: string) =>
  //   set((state) => ({
  //     userFriends: state.userFriends.filter((i) => i !== id),
  //   })),
  setUserFrindsArr: (arr: UserF[]) => set(() => ({ userFriends: arr })),
}));

export default Store;
