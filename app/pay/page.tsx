'use client'
import { title } from "@/components/primitives";
import React, { useCallback, useRef, useState } from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Spacer, Input, Image, Link} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure,} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import Webcam from "react-webcam";
import transfer from "./ethers";
import { Escrow } from "@/config/Blockhain/AddressController";



export default function DocsPage() {

  const webcamRef = React.useRef<Webcam>(null);
  const [img, setImg] = useState(null);
  const [created, setCreated] = useState(false);
  const [tx, setTx] = useState("");
  const [status, setStatus] = useState(false);
  const [link, setLink] = useState("https://sepolia.basescan.org/");
  const [isCaptured, setIsCaptured] = useState(false);

  async function delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }

  const capture = useCallback(async() => {
    if (webcamRef.current?.getScreenshot) {
      const imageSrc:any = webcamRef.current.getScreenshot();
      setImg(imageSrc);
      await delay(10000);
      setIsCaptured(true);
    }
    }, [webcamRef]);

  const videoConstraints = {
    width: 390,
    height: 390,
    facingMode: "user",
  };

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [visible, setVisible] = React.useState(false);
  const [amountIn, setAmountIn] = useState(null);
  const [account, setAccount] = useState("")

  const resultHandler = () => {
    setCreated(true);
  }
  const closeReseult = () => {
    setCreated(false);
    window.location.reload();
  }
  const handler = () => {setVisible(true); onclose};
  const closeHandler = () => {
    setVisible(false);
  };

const handleamountIn = (event:any) => {
    setAmountIn(event.target.value)
}

const handleAccount = (event:any) => {
  setAccount(event.target.value);
}

 const assettransfer = async () => {
  if(img !== null && amountIn != null&& account != "") {
    setStatus(true);
    let tx:any = await transfer(amountIn * 1e6, account);
    setTx(tx);
    if(tx != null) {
    let link:string = "https://sepolia.basescan.org/tx/" + tx;
    setLink(link);
    setVisible(false);
    setStatus(true);
    resultHandler();
    }
    else {
      alert("Payment Failed");
      window.location.reload();
    }
  }
  else {
    alert("Please fill all the fields");
  }
    
 }
  return (
    <div>
      <Modal 
        isOpen={created} 
        placement={"bottom-center"}
        onClose={closeReseult}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1" style={{color:"red", fontFamily:"monospace"}}>Payment success</ModalHeader>
              <ModalBody>
                <p style={{fontFamily:"monospace"}}> 
                    payer wallet : {Escrow}
                </p>
                <p style={{fontFamily:"monospace"}}> 
                    receipent wallet : {account}
                </p>
                <p style={{fontFamily:"monospace"}}>
                    payment Mode : USDC.e
                </p>
                <p style={{fontFamily:"monospace"}}>
                    total value : {amountIn} in USD
                </p>
                <p style={{fontFamily:"monospace"}}>
                    TransactionHash:
                </p>
                <Link  color="success" href = {link} style={{fontFamily:"monospace"}}>
                    view Blockchain receipt
                </Link>
                <p style={{fontFamily:"monospace"}} color="sucess">
                    Status: success
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={closeReseult}>
                  close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

<Modal 
        isOpen={visible} 
        placement={"bottom-center"}
        onClose={closeHandler}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1" style={{color:"red", fontFamily:"monospace"}}>Bio Metric Auth</ModalHeader>
              <ModalBody>
              {img === null ? (
                <>
                  <Webcam
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    audio={false}
                    height={500}
                    width={500}
                    ref={webcamRef}
                    mirrored={true}
                  />
                  <Button onClick={capture}>Capture photo</Button>
                </>
              ) : (
                <>
                                {isCaptured?(
                  <>
                    <Image isZoomed width= {240}  src={img} alt="screenshot" />
                    <Spacer y={3}/>
                    <Button onClick={() => setImg(null)}>Recapture</Button>
                  </>):(
                  <>
                            <Image isZoomed isLoading width= {240} src={img} alt="screenshot" />
                            <Spacer y={3}/>
                            <Button onClick={() => setImg(null)}>Recapture</Button>
                            </>)
                            }
                </>
              )}
              </ModalBody>
              <ModalFooter>
              {status? 
                    (<>
                <Button color="primary" isLoading> pending</Button></> ) :
                    ( <>
                <Button color="primary" onPress={assettransfer}> confirm</Button></> )
              } 
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

        <h1 className={title()}>EZ&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>Pay&nbsp;</h1>
        <Spacer y = {10}></Spacer>
        <>
        <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
        <h3 className={title({ color: "violet" , size: "sm"})}>Make payment&nbsp;</h3></div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Select payment method</p>
        <Spacer y = {3}></Spacer>
        <Select 
        isRequired
        label="Select currency" 
        className="max-w-xs" 
      >
        {siteConfig.paymentModes.map((payment) => (
          <SelectItem key={payment.key}>
            {payment.label}
          </SelectItem>
        ))}
      </Select>
    <Spacer y = {5}></Spacer>
    <Input
    isRequired
      isClearable
      type="text"
      label="receiver Wallet"
      variant="bordered"
      placeholder="Enter wallet address"
      onClear={() => console.log("input cleared")}
      className="max-w-xs"
    onChange={handleAccount}/>
      <Spacer y = {5}></Spacer>
      <Input isRequired type="Amount" variant={"flat"} label="Amount" placeholder="Amount in usd" onChange={handleamountIn}/>
      </CardBody>
      <Divider/>
      <CardFooter>
      <Modal 
        isOpen={isOpen} 
        placement={"bottom-center"}
        onOpenChange={onOpenChange} 
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1" style={{color:"red", fontFamily:"monospace"}}>Payment details</ModalHeader>
              <ModalBody>
              <p style={{fontFamily:"monospace"}}> 
                    payer wallet : {Escrow}
                </p>
                <p style={{fontFamily:"monospace"}}> 
                    receipent wallet : {account}
                </p>
                <p style={{fontFamily:"monospace"}}>
                    payment Mode : USDC.e
                </p>
                <p style={{fontFamily:"monospace"}}>
                    total value : {amountIn} in USD
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handler}>
                  confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button color="primary" variant="bordered" style={{alignItems: "center"}} className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4" onPress={onOpen}>
        confirm
      </Button> 
      </CardFooter>
    </Card>
        </>
    </div>
    
  );
}
