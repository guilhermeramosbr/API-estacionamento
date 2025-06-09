import express from 'express'
import  { autenticarAcesso} from '../controllers/usuario.js'
const router = express.Router()

router.post('/acesso', autenticarAcesso)

export { router }