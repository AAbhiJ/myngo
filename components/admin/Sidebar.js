import React from "react";
import logo from "./../../public/assets/images/logo.png";
import dashboard from "./../../public/assets/images/icons/dashboard.png";
import members from "./../../public/assets/images/icons/members.png";
import gallery from "./../../public/assets/images/icons/gallery.png";
import setting from "./../../public/assets/images/icons/setting.png";

import Image from "next/image";
import ActiveLink from "../ActiveLink";
import { setLogout } from "../../middleware/utils";
import jwt from 'jwt-decode'
import Cookies from "js-cookie";
const Sidebar = () => {
  let ngoName;
  try {
     ngoName =jwt(Cookies.get('token')?.split(" ")[1])?.ngoName
  } catch (error) {
    console.log(error)
  }
  return (
    <>
      <style jsx>{`
        .box-d {
          min-height: 14rem;
        }
        .logoSize {
          width: 4rem;
        }
        .iconSize {
          width: 2rem;
        }
        .sidebar {
          position: sticky;
          max-height: 100vh;
          min-height: 100vh;
          left: 0;
          top: 0;
          bottom: 0;
          width: 16rem;
        }
        .w-18rem {
          width: 18rem;
        }
        .h-18rem {
          width: 18rem;
        }
        .sidebar .Heading {
          border-bottom: 2px solid white;
        }

        .h-fit {
          height: calc(100% - 60px);
        }

        .sidebar .sidebarLink{
            cursor:pointer;
            border-radius:6px;
        }
        .sidebar .sidebarLink:hover{
            background:rgba(255,255,255,0.1);
        }
        .sidebar .active{
            background:rgba(255,255,255,0.1);
        }
        .sidebar .dropdown-item.active{
          background:var(--blueish-dark);
          color:white;
      }

      `}</style>
      <div className="sidebar py-3 bg-blueish-dark">
        <div className="d-flex justify-content-center align-items-center Heading gap-3 w-100">
          <div className="flex flex-col logoSize">
            <Image src={logo} alt="logo" />
          </div>
          <h1 className="h6">{ngoName}</h1>
        </div>

        <div className="d-flex justify-content-between align-items-center flex-column  gap-4 py-4 h-fit">
          <div className="d-flex justify-content-center align-items-center flex-column w-100 px-1">
            <ActiveLink href="/admin" activeClassName={"active"}>
              <div className="d-flex justify-content-start px-5 gap-4 align-items-center w-100 py-2 sidebarLink">
                <div className="flex flex-col iconSize">
                  <Image src={dashboard} alt="dashboard" />
                </div>
                <h1 className="h6 m-0">Dashboard</h1>
              </div>
            </ActiveLink>
            <ActiveLink href="/admin/members" activeClassName={"active"}>
            <div className="d-flex justify-content-start px-5 gap-4 align-items-center w-100 py-2 sidebarLink">
              <div className="flex flex-col iconSize">
                <Image src={members} alt="members" />
              </div>
              <h1 className="h6 m-0">Members</h1>
            </div>
            </ActiveLink>
            
            <ActiveLink href="/admin/gallery" activeClassName={"active"}>
            <div className="d-flex justify-content-start px-5 gap-4 align-items-center w-100 py-2 sidebarLink">
              <div className="flex flex-col iconSize">
                <Image src={gallery} alt="gallery" />
              </div>
              <h1 className="h6 m-0">Gallery</h1>
            </div>
            </ActiveLink>

            <ActiveLink href="/admin/donation" activeClassName={"active"}>
            <div className="d-flex justify-content-start px-5 gap-4 align-items-center w-100 py-2 sidebarLink">
              <div className="flex flex-col iconSize">
              <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="currentColor" className="bi bi-piggy-bank" viewBox="0 0 16 16">
  <path d="M5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.138-1.496A6.613 6.613 0 0 1 7.964 4.5c.666 0 1.303.097 1.893.273a.5.5 0 0 0 .286-.958A7.602 7.602 0 0 0 7.964 3.5c-.734 0-1.441.103-2.102.292a.5.5 0 1 0 .276.962z" />
  <path fillRule="evenodd" d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069c0-.145-.007-.29-.02-.431.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a.95.95 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.735.735 0 0 0-.375.562c-.024.243.082.48.32.654a2.112 2.112 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595zM2.516 6.26c.455-2.066 2.667-3.733 5.448-3.733 3.146 0 5.536 2.114 5.536 4.542 0 1.254-.624 2.41-1.67 3.248a.5.5 0 0 0-.165.535l.66 2.175h-.985l-.59-1.487a.5.5 0 0 0-.629-.288c-.661.23-1.39.359-2.157.359a6.558 6.558 0 0 1-2.157-.359.5.5 0 0 0-.635.304l-.525 1.471h-.979l.633-2.15a.5.5 0 0 0-.17-.534 4.649 4.649 0 0 1-1.284-1.541.5.5 0 0 0-.446-.275h-.56a.5.5 0 0 1-.492-.414l-.254-1.46h.933a.5.5 0 0 0 .488-.393zm12.621-.857a.565.565 0 0 1-.098.21.704.704 0 0 1-.044-.025c-.146-.09-.157-.175-.152-.223a.236.236 0 0 1 .117-.173c.049-.027.08-.021.113.012a.202.202 0 0 1 .064.199z" />
</svg>
              </div>
              <h1 className="h6 m-0">Donation</h1>
            </div>
            </ActiveLink>


          </div>

          <div className="d-flex justify-content-center align-items-center flex-column w-100">
            <hr className="p-0 m-0" />
            <div className="dropdown">
              <a
                href="#"
                className="dropdown-toggle p-0 d-flex justify-content-start px-3 gap-3 align-items-center w-100 text-white text-decoration-none"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="flex flex-col iconSize">
                  <Image src={setting} alt="setting" />
                </div>
                <h1 className="h6">Setting</h1>
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                <ActiveLink href="/admin/profile" activeClassName={"active"}>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                  </ActiveLink>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={(e) => setLogout(e)}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
