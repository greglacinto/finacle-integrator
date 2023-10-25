import { Request, Response } from "express";

class Test {
  constructor(){
    
  }

  test(req: Request, res: Response){
    console.log('here')
    res.status(200).send({message:"testing endpoint up"});
  }
}

export default new Test().test