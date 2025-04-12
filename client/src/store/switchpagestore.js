import { create } from "zustand";

export const switchpagestore = create((set) =>({
    pages:'home',
    ispagechanging:false,
    setpage: async(page_)=>{
       set({ispagechanging:true})
       try {
          set({pages:page_})
       } catch (error) {
        console.log(error)
       }finally{
        
        setTimeout(() => {
             set({ispagechanging:false})
        }, 500);
       }
    }
}))