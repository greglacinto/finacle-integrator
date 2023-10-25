import { Router } from "express";
import express from "express";

import testController from "../controllers/test.controller";
import intraController from "../controllers/intra.controller";
import intraValidator from "../validator/intra.validator";
import retcifValidator from "../validator/retcif.validator";
import retcifController from "../controllers/retcif.controller";
import revtranValidator from "../validator/revtran.validator";
import revtranController from "../controllers/revtran.controller";

const auth = require('../middleware/auth')

class HomeRoutes {
  public router: Router = express.Router()

  constructor(){
    this.initializeRoutes()
  }

  initializeRoutes(){
    this.router.get('/test', testController)
    this.router.post('/intrabank', intraValidator, intraController)
    this.router.post('/revtran', revtranValidator, revtranController)
    this.router.post('/createcif/ret/tierone', retcifValidator, retcifController)
  }
}

export default new HomeRoutes().router