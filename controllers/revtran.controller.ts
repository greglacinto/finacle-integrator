import { Request, Response } from "express";
import finacleCall from "../integrators/call.fi";
import xmlParser from "../middleware/parser";
import { RevRequest } from "../interface/revtran.interface";
import RevTranFI from "../integrators/revtran.fi";

class RevTranController {
  
  async revTran(req: Request, res: Response){
    console.info("reverse transaction endpoint")
    let responseXMLHeader, responseXMLBody: any
    const { tranDt, tranId } : RevRequest = req.body

    try {
      const revTranFi = new RevTranFI(tranDt, tranId)
      const payload = revTranFi.soapRequest()
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
          .XferTrnRevResponse[0]
          .XferTrnRevRs[0]
          .RevTrnIdRec[0]
        console.log(responseXMLBody)

        res.status(200).send({"status":responseXMLHeader, "message": responseXMLBody})
  }
    } catch (error) {
      console.log(error)
      res.status(500).send({"status":responseXMLHeader, "message": "Internal server error"})
    }
  }
}

export default new RevTranController().revTran