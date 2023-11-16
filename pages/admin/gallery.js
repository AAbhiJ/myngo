import React, { useEffect, useState } from "react";
import { GalleryInput } from "../../components/admin/gallery/GalleryInput";
import Image from 'next/image';
import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
} from "../../middleware/utils";
import NgoApi from "../../utils/API";
import Swal from "sweetalert2";

const Gallery = ({ profile }) => {
  const [gallery, setGallery] = useState([{}]);

  const getAllGallery = async () => {
    const res = await NgoApi.getAllGalleryA();
    if (res.success) {
      setGallery(res.data[0]);
      console.log(res.data[0]);
    }
  };
  useEffect(() => {
    getAllGallery();
    if (profile === "Token Expired") {
      Cookies.remove("token");
    }
  }, []);
  const handleDeleteImage = async (id) => {
    Swal.fire({
      title: "Are you sure! want to delete this image?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await NgoApi.deleteGalleryA({ id: id });
        if (res.success) {
          
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          getAllGallery();
        }
      }
    });
  };
  const onChange = async (formData) => {
    const response = await NgoApi.createGallery(formData, (event) => {
      console.log(
        `Current progress:`,
        Math.round((event.loaded * 100) / event.total)
      );
    });
    if (response.success) {
      Swal.fire({
        title: "Successfull",
        text: "Image Uploaded Successfully",
        icon: "success",
      });
      getAllGallery();
    }
    console.log("response", response);
  };

  return (
    <>
      <style jsx>{`

      .imgdiv:hover{
        cursor:pointer;
      }

      .imgdiv:hover::before{
        opacity:1;
      }
      .imgdiv::before{
        display:grid;
        place-items:center;
        content:"Click to Delete";
        position:absolute;
        inset:0;
        background:rgba(0,0,0,0.2);
        opacity:0;
        transition:all 0.3s ease-in;
        color:white;
      }
      `}</style>
      <div className="container-fluid">
        <div className="row p-3 row-gap-2 ">
          <div className="col-12 shadow rounded-4 p-3 box-d w-100">
            <h2 className="h3">Gallery : </h2>

            <GalleryInput
              label="Upload image"
              uploadFileName="image"
              acceptedFileTypes={"image/*"}
              onChange={onChange}
            />
            <div className="container my-4 d-flex ">
              {gallery ? (
                <div className="row mx-2">
                  {gallery?.images?.map((img, i) => {
                    return (
                      <div key={i} className="col-3 p-2">
                        <div className="imgdiv position-relative" onClick={() => {
                            handleDeleteImage(img?.id);
                          }}>
                        <img
                          className=" w-100 imgTag"
                          alt={`img${i}`}
                          src={`/static/uploads/${img.imageName}`}
                        />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <h1 className="text-center w-100">No Photos</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);

  const baseApiUrl = `${origin}/api`;

  const { token } = getAppCookies(req);

  const profile = token ? verifyToken(token.split(" ")[1]) : "";
  console.log(profile);

  if (profile === "Token Expired" || !profile) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (profile?.userType === "SUPER_ADMIN") {
    return {
      redirect: {
        destination: "/superadmin",
        permanent: false,
      },
    };
  }
  return {
    props: {
      baseApiUrl,
      profile,
    },
  };
}
