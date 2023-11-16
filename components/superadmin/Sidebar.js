import React from "react";
import logo from "./../../public/assets/images/logo.png";
import dashboard from "./../../public/assets/images/icons/dashboard.png";
import members from "./../../public/assets/images/icons/members.png";
import gallery from "./../../public/assets/images/icons/gallery.png";
import setting from "./../../public/assets/images/icons/setting.png";

import Image from "next/image";
import ActiveLink from "../ActiveLink";
import { setLogout } from "../../middleware/utils";
const Sidebar = () => {
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

        .sidebar .sidebarLink {
          cursor: pointer;
          border-radius: 6px;
        }
        .sidebar .sidebarLink:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .sidebar .active {
          background: rgba(255, 255, 255, 0.1);
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
          <h1 className="h6">(Super Admin)</h1>
        </div>

        <div className="d-flex justify-content-between align-items-center flex-column  gap-4 py-4 h-fit">
          <div className="d-flex justify-content-center align-items-center flex-column w-100 px-1">

            <ActiveLink href="/superadmin" activeClassName={"active"}>
              <div className="d-flex justify-content-start px-5 gap-4 align-items-center w-100 py-2 sidebarLink">
                <div className="flex flex-col iconSize">
                  <Image src={members} alt="ngos" />
                </div>
                <h1 className="h6 m-0">NGOs</h1>
              </div>
            </ActiveLink>
            <ActiveLink href="/superadmin/members" activeClassName={"active"}>
              <div className="d-flex justify-content-start px-5 gap-4 align-items-center w-100 py-2 sidebarLink">
                <div className="flex flex-col iconSize">
                  <Image src={members} alt="members" />
                </div>
                <h1 className="h6 m-0">Members</h1>
              </div>
            </ActiveLink>
          </div>

          <div className="d-flex justify-content-center align-items-center flex-column w-100">
            <hr className="p-0 m-0" />
            <div className="dropdown">
              <a
                href="#"
                className="dropdown-toggle d-flex justify-content-start px-3 gap-3 align-items-center w-100 text-white text-decoration-none"
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
                  {/* <ActiveLink href="/superadmin/profile" activeClassName={"active"}>
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                  </ActiveLink> */}
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
