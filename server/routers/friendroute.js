const express = require('express')
const router = express.Router()
const {suggestFriends,sendFriendRequest,acceptFriend,rejectFriend,getFriendRequests, getofficialfriends}= require( '../controller/friendController')
const {protectroute} = require('../middleware/authmiddleware')

router.get('/suggest', protectroute, suggestFriends)
router.post('/sendrequest', protectroute, sendFriendRequest)
router.get('/getrequest', protectroute, getFriendRequests)
router.get('/getofficialfriends', protectroute, getofficialfriends)
router.post('/accept', protectroute, acceptFriend)
router.post('/rejectrequest', protectroute, rejectFriend)

module.exports = router
