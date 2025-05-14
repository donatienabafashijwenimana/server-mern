import { create } from 'zustand'
import { axiosinsitance } from '../lib/axiosinstanse'

const useFriendStore = create((set,get) => ({
  user_suggest: [],
  requests: [],
  loading: false,
  error: null,
  officialfriends:[],
  friendsuggestionnumber:0,
  officialfriendnumber:0,

  getSuggestions: async () => {
    const token = sessionStorage.getItem('token')
    try {
      set({ loading: true })
      const res = await axiosinsitance.get('friend/suggest', {
        headers: { Authorization: `Bearer ${token}` }
      })
      set({ user_suggest: res.data, loading: false })
      
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch', loading: false })
    }
  },

  sendRequest: async (recipientId) => {
    const token = sessionStorage.getItem('token')
    try {
      await axiosinsitance.post('friend/sendrequest', { recipientId }, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch (err) {
      console.error('Send request failed:', err)
    }
  },
  getRequest: async (recipientId) => {
    const token = sessionStorage.getItem('token')
    try {
      const res = await axiosinsitance.get('friend/getrequest', {
        headers: { Authorization: `Bearer ${token}` }
      })
      set({ requests: res.data})
      set({friendsuggestionnumber:res.data.length})
    } catch (err) {
      console.error('Send request failed:', err)
    }
  },

  acceptRequest: async (requestId) => {
    const token = sessionStorage.getItem('token')
    try {
      await axiosinsitance.post('friend/accept', { requestId }, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch (err) {
      console.error('Accept failed:', err)
    }
  },

  rejectRequest: async (requestId) => {
    const token = sessionStorage.getItem('token')
    try {
     const res = await axiosinsitance.post('friend/rejectrequest', { requestId }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert(res.data.message)
    } catch (err) {
      console.error('Reject failed:', err)
    }
  },
  getofficialfriends:async()=>{
    const token = sessionStorage.getItem('token')
    try {
      const res = await axiosinsitance.get('friend/getofficialfriends', {
        headers: { Authorization: `Bearer ${token}` }
      })
      set({ officialfriends: res.data})
      set({officialfriendnumber:res.data.length})

    } catch (err) {
      console.error('Send request failed:', err)
    }
  }
}))

export default useFriendStore
