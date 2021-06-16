import create from "zustand";

const useStore = create((set) => ({
	user: null,
	setUser: (user) => set((state) => ({ user: { ...state.user, user } })),
}));

export default useStore;
