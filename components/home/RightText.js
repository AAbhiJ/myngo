import React from 'react'
import Image from 'next/image'

function RightText({image, alt,heading, description, imageSize}) {
    return (
        <>  
        <div className="row">
        <div className="col-6">
                <div className="p-5">
                    <Image src={image} alt={alt} width={imageSize?imageSize:""} height={imageSize?imageSize:""}/>
                </div>
            </div>
            <div className="col-6">
                <div className="d-flex justify-content-top mt-5 align-items-center flex-column p-5 h-100 w-100 gap-3">
                    <h3 className="h2">{heading}</h3>
                    <p className='w-75'>{description}</p>
                </div>
            </div>
        </div>
            
        </>
    )
}

export default RightText
