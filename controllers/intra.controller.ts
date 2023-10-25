import { Request, Response } from "express";
import IntraBankFI from "../integrators/intrabank.fi";
import { Payload } from "../interface/payload.interface";
import finacleCall from "../integrators/call.fi";
import xmlParser from "../middleware/parser";

class IntraBankController {
  
  async intraBank(req: Request, res: Response){
    console.info("Intra Bank endpoint")
    let responseXMLHeader, responseXMLBody: any
    const { drAcct, crAcct, amount } : Payload = req.body

    try {
      const intraBankFi = new IntraBankFI(drAcct, crAcct, amount)
      const payload = intraBankFi.soapRequest()
      const response = await finacleCall(payload)
      const responseXML: any = await xmlParser(response)
      if (!responseXML) {
        throw new Error ('Invalid xml returned from Finacle')
      }

      // get response header
      responseXMLHeader = responseXML.FIXML
        .Header[0]
        .ResponseHeader[0]
        .HostTransaction[0]
        .Status[0]
      console.log(responseXMLHeader)

      if (responseXMLHeader.toUpperCase() == 'FAILURE') {
        responseXMLBody = responseXML.FIXML
          .Body[0]
          .Error[0]
          .FIBusinessException[0]
          .ErrorDetail[0].ErrorDesc[0]
        console.log(responseXMLBody)

        res.status(400).send({"status":responseXMLHeader, "message": responseXMLBody})
      }
      else {
        responseXMLBody = responseXML.FIXML
          .Body[0]
          .XferTrnAddResponse[0]
          .XferTrnAddRs[0]
          .TrnIdentifier[0]
        console.log(responseXMLBody)

        res.status(200).send({"status":responseXMLHeader, "message": responseXMLBody})
  }
    } catch (error) {
      console.log(error)
      res.status(500).send({"status":responseXMLHeader, "message": "Internal server error"})
    }
  }
}

export default new IntraBankController().intraBank