import crypto from 'crypto'
import { Retcif } from '../interface/retcif.interface';

class RetCustAddFI {
  requestBody: Retcif = {
    addr:'', email:'', phone:'', birthDt:'',birthMt:'',
    birthYr:'',fName:'',mName:'',lName:'',prefName:'',
    gender:'',natlty:''
  }

  constructor(retCust: Retcif) {
    this.requestBody  = retCust
    console.log(this.requestBody)
  }

  requestTime = new Date().toISOString()
  
  soapRequest() {
    const custDOB = `${this.requestBody.birthYr}-${this.requestBody.birthMt}-${this.requestBody.birthDt}`
    const phoneCode = this.requestBody.phone.slice(1,4)
    const phoneLocCode = this.requestBody.phone.slice(7, this.requestBody.phone.length)
    const custName = `${this.requestBody.fName} ${this.requestBody.mName} ${this.requestBody.lName}`
    const xml = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:end="http://endpoint.fip.infosys.com">
        <soapenv:Header/>
        <soapenv:Body>
            <end:executeService>
              <arg_0_0><![CDATA[
                  <FIXML xmlns="http://www.finacle.com/fixml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.finacle.com/fixml RetCustAdd.xsd">
            <Header>
            <RequestHeader>
            <MessageKey>
            <RequestUUID>${crypto.randomUUID()}</RequestUUID>
            <ServiceRequestId>RetCustAdd</ServiceRequestId>
            <ServiceRequestVersion>${process.env.FI_VERSION_V10}</ServiceRequestVersion>
            <ChannelId>CRM</ChannelId>
            <LanguageId></LanguageId>
            </MessageKey>
            <RequestMessageInfo>
            <BankId>01</BankId>
            <TimeZone></TimeZone>
            <EntityId></EntityId>
            <EntityType></EntityType>
            <ArmCorrelationId></ArmCorrelationId>
            <MessageDateTime>${this.requestTime}</MessageDateTime>
            </RequestMessageInfo>
            <Security>
            <Token>
            <PasswordToken>
            <UserId></UserId>
            <Password></Password>
            </PasswordToken>
            </Token>
            <FICertToken></FICertToken>
            <RealUserLoginSessionId></RealUserLoginSessionId>
            <RealUser></RealUser>
            <RealUserPwd></RealUserPwd>
            <SSOTransferToken></SSOTransferToken>
            </Security>
            </RequestHeader>
            </Header>
            <Body>
            <RetCustAddRequest>
            <RetCustAddRq>
            <CustDtls>
            <CustData>
            <AddrDtls>
            <AddrLine1>${this.requestBody.addr}</AddrLine1>
            <AddrLine2>.</AddrLine2>
            <AddrLine3>.</AddrLine3>
            <AddrCategory>Mailing</AddrCategory>
            <City>0002</City>
            <Country>NG</Country>
            <FreeTextLabel>.</FreeTextLabel>
            <HoldMailFlag>N</HoldMailFlag>
            <PrefAddr>Y</PrefAddr>
            <PrefFormat>FREE_TEXT_FORMAT</PrefFormat>
            <StartDt>${this.requestTime}</StartDt>
            <State>15</State>
            <PostalCode>234</PostalCode>
            </AddrDtls>
            <PhoneEmailDtls>
            <Email>${this.requestBody.email}</Email>
            <PhoneEmailType>WORKEML</PhoneEmailType>
            <PhoneOrEmail>EMAIL</PhoneOrEmail>
            <PrefFlag>Y</PrefFlag>
            <StartDt>${this.requestTime}</StartDt>
            </PhoneEmailDtls>
            <PhoneEmailDtls>
            <PhoneEmailType>CELLPH</PhoneEmailType>
            <PhoneNum>${this.requestBody.phone}</PhoneNum>
            <PhoneNumCityCode>0</PhoneNumCityCode>
            <PhoneNumCountryCode>${phoneCode}</PhoneNumCountryCode>
            <PhoneNumLocalCode>${phoneLocCode}</PhoneNumLocalCode>
            <PhoneOrEmail>PHONE</PhoneOrEmail>
            <PrefFlag>Y</PrefFlag>
            <StartDt>${this.requestTime}</StartDt>
            </PhoneEmailDtls>
            <BirthDt>${this.requestBody.birthDt}</BirthDt>
            <BirthMonth>${this.requestBody.birthMt}</BirthMonth>
            <BirthYear>${this.requestBody.birthYr}</BirthYear>
            <CreatedBySystemId>FIVUSR</CreatedBySystemId>
            <DateOfBirth>${custDOB}T00:00:00.000</DateOfBirth>
            <FirstName>${this.requestBody.fName}</FirstName>
            <MiddleName>${this.requestBody.mName}</MiddleName>
            <ShortName>${this.requestBody.lName}</ShortName>
            <Language>UK (English)</Language>
            <LastName>${this.requestBody.lName}</LastName>
            <Name>${custName}</Name>
            <IsMinor>N</IsMinor>
            <IsCustNRE>N</IsCustNRE>
            <DefaultAddrType>Mailing</DefaultAddrType>
            <Gender>${this.requestBody.gender}</Gender>
            <Manager>RT001OF05</Manager>
            <NativeLanguageCode>INFENG</NativeLanguageCode>
            <Occupation>OTH</Occupation>
            <PrefName>${this.requestBody.prefName}</PrefName>
            <PrimarySolId>001</PrimarySolId>
            <RelationshipOpeningDt>${this.requestTime}</RelationshipOpeningDt>
            <SegmentationClass>SALIN</SegmentationClass>
            <Salutation>M/S</Salutation>
            <SubSegment>OTHER</SubSegment>
            <StaffFlag>N</StaffFlag>
            <StaffEmployeeId></StaffEmployeeId>
            <TradeFinFlag>N</TradeFinFlag>
            <IsEbankingEnabled>N</IsEbankingEnabled>
            <Region>CTY</Region>
            <TaxDeductionTable>ZERO</TaxDeductionTable>
            </CustData>
            </CustDtls>
            <RelatedDtls>
            <DemographicData>
            <EmploymentStatus>MRIED</EmploymentStatus>
            <Nationality>NG</Nationality>
            <EmploymentStatus>Unemployed</EmploymentStatus>
            </DemographicData>
            <EntityDoctData>
            <CountryOfIssue>NG</CountryOfIssue>
            <DocCode>PSPRT</DocCode>
            <IssueDt>2022-06-10T00:00:00.000</IssueDt>
            <TypeCode>RET_ID</TypeCode>
            <PlaceOfIssue>0534</PlaceOfIssue>
            <ReferenceNum>12345</ReferenceNum>
            <preferredUniqueId>Y</preferredUniqueId>
            <ExpDt>2026-06-15T00:00:00.000</ExpDt>
            </EntityDoctData>
            <PsychographicData>
            <preferred_Locale>en_US</preferred_Locale>
            <PsychographMiscData>
            <EntityCreFlag>Y</EntityCreFlag>
            <StrText10>NGN</StrText10>
            <Type>CURRENCY</Type>
            <DTDt1>2099-12-31T00:00:00.000</DTDt1>
            </PsychographMiscData>
            </PsychographicData>
            <RelationshipDtls />
            </RelatedDtls>
            </RetCustAddRq>
            </RetCustAddRequest>
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

export default RetCustAddFI