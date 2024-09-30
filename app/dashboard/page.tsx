'use client'
import { title } from "@/components/primitives";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Spacer, Button} from "@nextui-org/react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";


export default function AboutPage() {
  const webcamRef = useRef<Webcam>(null);
  const [img, setImg] = useState(null);
  const [isCaptured, setIsCaptured] = useState(false);

async function delay(ms: number) {
  console.log("fSa")
    return new Promise( resolve => setTimeout(resolve, ms) );
}

const capture = useCallback(async () => {
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

 const register = () => {
  if (img == null) {
    alert(`Invalid faceID`);
    window.location.reload();
  }
  else {
  let id = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  alert(`registered with id:#${id}`);
  window.location.reload();
  }
}

  return (
    <>
    <h3 className={title({ color: "violet" , size: "sm"})}>Register Your Profile&nbsp;</h3>
    <Spacer y= {3}/>
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md" style={{ color: "violet"}}>Create your face Id</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Experience your effortless payment experience with Ez.</p>
        <Spacer y = {2}/>
        <ConnectButton   accountStatus={{
    smallScreen: 'avatar',
    largeScreen: 'full',
  }}/>
  <Spacer y = {2}/>
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
          <Spacer y={3}/>
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
      </CardBody>
      <Divider/>
      <CardFooter>
          <Button color="primary" onPress={register}>register your ID</Button>
      </CardFooter>
    </Card>
    </>
    );
}
