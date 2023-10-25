import crypto from 'crypto';
import { RevRequest } from '../interface/revtran.interface';


class RevTranFI {
  requestBody: RevRequest = {
    tranDt: '',
    tranId:''
  }
  requestTime = new Date().toISOString()

  constructor(tranDt: string, tranId: string) {
    this.requestBody.tranDt = tranDt;
    this.requestBody.tranId = tranId;
  }

  soapRequest() {
    const xml = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:end="http://endpoint.fip.infosys.com">
        <soapenv:Header/>
        <soapenv:Body>
            <end:executeService>
              <arg_0_0><![CDATA[
                  <FIXML xmlns="http://www.finacle.com/fixml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.finacle.com/fixml XferTrnRev.xsd">
            <Header>
            <RequestHeader>
            <MessageKey>
            <GlobalUUID>${crypto.randomUUID()}</GlobalUUID>
            <RequestUUID>${crypto.randomUUID()}</RequestUUID>
            <ServiceId>XferTrnRev</ServiceId>
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
            <XferTrnRevRequest>
            <XferTrnRevRq>
            <TrnId>${this.requestBody.tranId}</TrnId>
            <TrnDt>${this.requestBody.tranDt}</TrnDt>
            <TualraChrgRevFlg>N</TualraChrgRevFlg>
            <WaiveDDCnclChrgFlg>N</WaiveDDCnclChrgFlg>
            </XferTrnRevRq>
            </XferTrnRevRequest>
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

export default RevTranFI