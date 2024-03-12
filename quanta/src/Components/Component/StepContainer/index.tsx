import React from "react";

interface Props {
    strData?: string;
}

function StepContainer({ strData }: Props) {
    return (
        <>
            {strData &&
                strData.length > 0 &&
                strData.split("\n").map((line, index) => (
                    <p key={index} >
                        <pre style={{ fontFamily: "inherit", fontWeight: "bolder", fontSize: 16 }} className="overflow-auto scroll-hidden mb--1 text-wrap">
                            {line.replaceAll("\"\"","\"")}
                        </pre>
                    </p>
                ))}
        </>
    );
}

export { StepContainer };
