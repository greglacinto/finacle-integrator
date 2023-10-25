import { Request, Response } from "express";
import finacleCall from "../integrators/call.fi";
import xmlParser from "../middleware/parser";
import { Retcif } from "../interface/retcif.interface";
import RetCustAddFI from "../integrators/retcif.fi";

class RetCifController {
  
  async retCif(req: Request, res: Response){
    console.info("Retail Cif endpoint")
    let responseXMLHeader, responseXMLBody: any
    const requestBody : Retcif = req.body

    try {
      const retCustAddFi = new RetCustAddFI(requestBody)
      const payload = retCustAddFi.soapRequest()
      console.log(payload)
      // return res.status(200).send({"message": "Test Fine"})
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

export default new RetCifController().retCif