import { Request, Response, NextFunction } from 'express'
import { Payload } from '../interface/payload.interface'

class IntraValidator {
  
  constructor(){

  }

  reqValidator = (req: Request, res: Response, next: NextFunction) => {
    console.info("Inside Validator")
    const { drAcct, crAcct, amount }: Payload = req.body
    if (!(drAcct && drAcct.length>8)) 
      return res.status(500).send({"message": "Enter valid Debit Account"})
    if (!(crAcct && drAcct.length>8)) 
      return res.status(500).send({"message": "Enter valid Credit Account"})
    if (!(amount && amount.length>0)) 
      return res.status(500).send({"message": "Enter valid Amount"})
    next()
  }

}
 

    

export default new IntraValidator().reqValidator