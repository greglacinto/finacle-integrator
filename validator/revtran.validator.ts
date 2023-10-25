import { Request, Response, NextFunction } from 'express'
import { Payload } from '../interface/payload.interface'
import { RevRequest } from '../interface/revtran.interface'

class RevIntraValidator {

  reqValidator = (req: Request, res: Response, next: NextFunction) => {
    console.info("Inside Validator")
    const { tranDt, tranId }: RevRequest = req.body
    if (!(tranDt && tranId)) 
      return res.status(500).send({"message": "Enter valid tranDt and tranId"})
    
    next()
  }

}
 

    

export default new RevIntraValidator().reqValidator