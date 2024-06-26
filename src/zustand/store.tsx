import { create } from 'zustand'

// type State = {
//   bears: number
//   token: string
// }

// type Action = {
//   updateBears: (bears: State['bears']) => void
//   updateToken: (token: State['token']) => void
// }

// const useBearStore = create<State & Action>((set) => ({
//   bears:0,
//   updateBears: (newBears:number) => set({ bears: newBears }),

//   token:'',
//   updateToken: (token:string) => set(() => ({ token: token })),

// }));

const useBearStore = create((set) => ({
  bears:0,
  increaseTotalMember: () => set((state:any) => ({ bears: state.bears + 1 })),
  decreaseTotalMember: () => set((state:any) => ({ bears: state.bears - 1 })),
  updateBears: (newBears:number) => set({ bears: newBears }),

  token:'',
  setToken: (input:string) => set(() => ({ token: input })),
  removeToken: () => set({ token: '' }),
    
}));

export default useBearStore;