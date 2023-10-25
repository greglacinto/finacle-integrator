import { Payload } from "../interface/payload.interface";
import crypto from 'crypto';


class IntraBankFI {
  requestBody: Payload = {
    drAcct: '',
    crAcct:'',
    amount:''
  }
  requestTime = new Date('07/18/2023').toISOString()

  constructor(drAcct: string, crAcct: string, amt: string) {
    this.requestBody.drAcct = drAcct;
    this.requestBody.crAcct = crAcct;
    this.requestBody.amount = amt
  }

  soapRequest() {
    const xml = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:end="http://endpoint.fip.infosys.com">
        <soapenv:Header/>
        <soapenv:Body>
            <end:executeService>
              <arg_0_0><![CDATA[
                  <FIXML xmlns="http://www.finacle.com/fixml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.finacle.com/fixml XferTrnAdd.xsd">
            <Header>
            <RequestHeader>
            <MessageKey>
            <GlobalUUID>${crypto.randomUUID()}</GlobalUUID>
            <RequestUUID>${crypto.randomUUID()}</RequestUUID>
            <ServiceId>XferTrnAdd</ServiceId>
            <ServiceRequestVersion>11.13</ServiceRequestVersion>
            <ChannelId>COR</ChannelId>
            <AccessToken>null</AccessToken>
            <ClientIP>null</ClientIP>
            <OriginatorInstanceId/>
            <OriginatorVersion/>
            <LanguageId/>
            </MessageKey>
            <RequestMessageInfo>
            <BankId/>
            <TimeZone/>
            <EntityId/>
            <EntityType/>
            <ArmCorrelationId/>
            <MessageDateTime>${this.requestTime}</MessageDateTime>
            <ExceptionOverrideFlag/>
            <SrvInvocmodeOverrideFlag/>
            </RequestMessageInfo>
            <Security>
            <Token>
            <PasswordToken>
            <UserId/>
            <Password/>
            </PasswordToken>
            </Token>
            <FICertToken/>
            <RealUserLoginSessionId/>
            <RealUser/>
            <RealUserPwd/>
            <SSOTransferToken/>
            </Security>
            </RequestHeader>
            </Header>
            <Body>
            <XferTrnAddRequest>
            <XferTrnAddRq>
            <XferTrnHdr>
            <TrnType>T</TrnType>
            <TrnSubType>CI</TrnSubType>
            </XferTrnHdr>
            <XferTrnDetail>
            <PartTrnRec>
            <AcctId>
            <AcctId>${this.requestBody.drAcct}</AcctId>
            </AcctId>
            <CreditDebitFlg>D</CreditDebitFlg>
            <TrnAmt>
            <amountValue>${this.requestBody.amount}</amountValue>
            <currencyCode>NGN</currencyCode>
            </TrnAmt>
            <TrnParticulars>Intrabank</TrnParticulars>
            <ValueDt>${this.requestTime}</ValueDt>
            </PartTrnRec>
            <PartTrnRec>
            <AcctId>
            <AcctId>${this.requestBody.crAcct}</AcctId>
            </AcctId>
            <CreditDebitFlg>C</CreditDebitFlg>
            <TrnAmt>
            <amountValue>${this.requestBody.amount}</amountValue>
            <currencyCode>NGN</currencyCode>
            </TrnAmt>
            <TrnParticulars>Intrabank</TrnParticulars>
            <ValueDt>${this.requestTime}</ValueDt>
            </PartTrnRec>
            </XferTrnDetail>
            </XferTrnAddRq>
            </XferTrnAddRequest>
            </Body>
            </FIXML>
      ]]></arg_0_0>
            </end:executeService>
        </soapenv:Body>
      </soapenv:Envelope>
      `;
    return xml
  }
}

export default IntraBankFI