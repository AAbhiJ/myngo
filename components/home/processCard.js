import React from 'react'
import Image from "next/image";

function ProcessCard({image, heading, description}) {
    return (
        <>
            <div className="col-4">
            <div className="d-flex justify-content-center align-items-center p-3 flex-column gap-3">
                <div className="p-5 m-3">
                <Image src={image} alt={heading} layout="intrinsic"/>
              </div>
              <h3 className="h5">{heading}</h3>
              <p className="text-center">{description}</p>
            </div>
          </div>   
        </>
    )
}

export default ProcessCard
