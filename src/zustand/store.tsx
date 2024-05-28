import { create } from 'zustand'



const useBearStore = create((set) => ({
    bears:0,
    increaseTotalMember: () => set((state:any) => ({ bears: state.bears + 1 })),
    decreaseTotalMember: () => set((state:any) => ({ bears: state.bears - 1 })),
    updateBears: (newBears:number) => set({ bears: newBears }),
}));

  export default useBearStore;