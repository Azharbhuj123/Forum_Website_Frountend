import { create } from 'zustand';

const useStore = create((set) => ({
  // State
    login_required:"You need to log in first.",
     

  discussionRefetch: null,

  setDiscussionRefetch: (refetchFn) => set({ discussionRefetch: refetchFn }),

  // call refetch if it exists
  triggerDiscussionRefetch: () =>
    set((state) => {
      if (state.discussionRefetch) state.discussionRefetch();
      return state; // no state changes
    }),

  
  
}));

export default useStore;