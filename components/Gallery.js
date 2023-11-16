import Image from "next/image";
import React from "react";

function Gallary({ heading,images }) {
  
  console.log(images);
  return (
    <>
      <div className="row pt-3">
        <div className="col-12 mt-3 mb-5">
          <h2 className="h1 fw-bold text-center ">{heading}</h2>
        </div>
    {
        images?.map((data,i)=>{
        return(
          <div className="col-4 d-flex justify-content-center align-items-center p-1" key={i}>
            <Image src={data.image} alt={data.alt}/>
          </div>
        )
        })
    }
      </div>
    </>
  );
}

export default Gallary;
