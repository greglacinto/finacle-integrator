import { Request, Response, NextFunction } from 'express'
import { Retcif } from '../interface/retcif.interface'

class RetCifValidator {
    
  reqValidator = (req: Request, res: Response, next: NextFunction) => {
    console.info("Inside Validator")
    console.log(req.body)
    const { addr,email,phone,birthDt,birthMt,birthYr,fName,mName,lName,prefName,gender,natlty }: Retcif = req.body

    // for addr validation
    if ( !(addr && addr.length<50) )
      return res.status(500).send({"message": "Enter valid addr of customer"})
    
    // for addr validation
    if ( !(email && /^[a-zA-Z]+@[a-zA-Z]+\.com$/g.test(email)) )
      return res.status(500).send({"message": "Email format should be x@x.com"})

    // for phone validation
    const regex = /^(\+234)\(0\)\d{10}$/g
    regex.test(phone) ? null : res.status(500).send({"message": "Phone Number format should be +234(x)xxxxxxxxxx" })

    // for birthdate validation
    if ( !(birthDt && birthDt.length==2) )
      return res.status(500).send({"message": "birthDt format should be XX"})

    // for birthMt validation
    if ( !(birthMt && birthMt.length==2) )
      return res.status(500).send({"message": "birthMt format should be XX"})

    // for birthYr validation
    if ( !(birthYr && /^\d{4}$/g.test(birthYr)) )
      return res.status(500).send({"message": "birthYr format should be XXXX"})

    // for fName validation
    if ( !(fName && /^[A-Za-z]+$/g.test(fName)) )
      return res.status(500).send({"message": "Enter valid alphabets for fName"})
    
    // for mName validation
    if ( !(mName && /^[A-Za-z]+$/g.test(mName)) )
      return res.status(500).send({"message": "Enter valid alphabets for mName"})

    // for lName validation
    if ( !(lName && /^[A-Za-z]+$/g.test(lName)) )
      return res.status(500).send({"message": "Enter valid alphabets for lName"})

    // for prefName validation
    if ( !(prefName && /^[A-Za-z]+$/g.test(prefName)) )
      return res.status(500).send({"message": "Enter valid alphabets for prefName"})

    // for gender validation
    if ( !(gender && /^[A-Za-z]$/g.test(gender)) )
      return res.status(500).send({"message": "Enter valid single alphabet for gender"})
  
    // for natlty validation
    if ( !(natlty && /^[A-Za-z]{2}$/g.test(natlty)) )
      return res.status(500).send({"message": "Enter valid contry code for natlty"})

    console.info("Validator passed")
    next()
  }
}

export default new RetCifValidator().reqValidator