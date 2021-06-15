const router = require('express').Router()
const useracceptedCtrl = require('../controllers/useracceptedCtrl')


router.post('/postuler',useracceptedCtrl.postuler )

router.put('/note_final',useracceptedCtrl.update_note_final )
router.put('/update_date_interview',useracceptedCtrl.update_date_interview )
router.put('/update_note_technique',useracceptedCtrl.update_note_technique )


router.get('/afficher',useracceptedCtrl.getUsersAllInfo)
router.get('/afficherJob/:id',useracceptedCtrl.getUsersAllInfoJob)

router.delete('/delete/:id',useracceptedCtrl.deleteUser)

router.post('/filtre',useracceptedCtrl.filtrerUsersAll)


module.exports = router