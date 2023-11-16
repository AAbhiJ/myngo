import Image from "next/image"

import logo from "./../public/assets/images/logo.png"
import facebook from "./../public/assets/images/icons/facebook.png"
import twitter from "./../public/assets/images/icons/twitter.png"
import insta from "./../public/assets/images/icons/insta.png"

const Footer = () => {
    return (
        <>
        <style jsx>{`
            .imgSize{
                width:10rem;
            }
            .decoration-none{
                text-decoration:none;
            }
        `}</style>
         <div className="container-fluid bg-blueish-dark py-5">
            <div className="row justify-content-between">
                <div className="col-4">
                    <div className="d-flex justify-content-center align-items-center gap-4">
                        <div className="flex flex-col imgSize">
                        <Image src={logo} alt="LOGO"/>
                        </div>
                        <div className="d-flex flex-column">
                        <h2 className="h2 word-break">Fortunate</h2>
                        <h2 className="h2 word-break">Folks</h2>
                        </div>
                    </div>
                    <div className="d-flex justify-content-evenly mx-auto w-75 align-items-center ">
                    <a href="#"><Image src={facebook} alt="facebook"/></a>
                    <a href="#"><Image src={insta} alt="Instagram"/></a>
                    <a href="#"><Image src={twitter} alt="twitter"/></a>
                    </div>
                </div>
                <div className="col-4">
                    <div className="d-flex justify-content-center align-items-center h-100 pt-5">
                        <div className="d-flex justify-content-start w-100 h-100 align-items-start flex-column gap-3">
                            <a href="#" className="text-white decoration-none">Editorial policy</a>
                            <a href="#" className="text-white decoration-none">Terms Of Use</a>
                            <a href="#" className="text-white decoration-none">Privacy Policy</a>
                        </div>
                        <div className="d-flex justify-content-start w-100 h-100 align-items-start flex-column gap-3">
                            <a href="#" className="text-white decoration-none">Advertise</a>
                            <a href="#" className="text-white decoration-none">News</a>
                                
                        </div>
                    </div>
                </div>
            </div>
             </div>  
        </>
    )
}

export default Footer
