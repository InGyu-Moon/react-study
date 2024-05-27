import { create } from 'zustand'

async function fetchTotalMember(){
    try{
        const response = await fetch("http://localhost:3000/user");
        if(response.ok){
            const data = await response.json();
             return data.data.length;
        }else{
            throw new Error('Network response was not ok.');
        }
    }catch(error){
        console.error('There was a problem with the fetch operation:', error);
    }
}



const useBearStore = create((set) => ({
    bears: fetchTotalMember(),
    increaseTotalMember: () => set((state:any) => ({ bears: state.bears + 1 })),
    decreaseTotalMember: () => set((state:any) => ({ bears: state.bears - 1 }))
}));

  export default useBearStore;