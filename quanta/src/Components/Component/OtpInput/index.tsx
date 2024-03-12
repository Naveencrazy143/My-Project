import React from "react";
import { OtpInputProps } from "./interfaces";
import { Input } from "@Components";
function OtpInput({ ...props }: OtpInputProps) {
  return (
    <Input
      {...props}
      className={"text-center bg-secondary ml-2 font-weight-bold mb-0"}
      maxlength={4}
      type={"number"}
      placeholder={"0000"}
      style={{ width: "15em", height: "50px", fontSize: "16px",letterSpacing:'20px', paddingLeft:'33px' }}
    />
  );
}

export { OtpInput };
