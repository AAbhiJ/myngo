import Image from "next/image";
import Logo from "./../public/assets/images/logo.png";
import ActiveLink from "./ActiveLink";
const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-blueish-dark fixed-top shadow-lg">
        <div className="container-fluid px-5">
                <ActiveLink href='/' activeClassName={''}>
          <a className="navbar-brand" >
          {/* flex flex-col justify-center */}
            <div className="d-flex justify-content-center align-items-center position-relative image-container">
                <Image
                  src={Logo}
                  alt="LOGO"
                  className="image position-absolute"
                  width={80}
                  height={80}
                  priority={true}
                ></Image>
              <div className="d-flex justify-content-center align-items-center ps-3">
                <h1 className="h5 m-0 position-relative">
                  Fortunate <p className="m-0 p-0"></p> Folks
                </h1>
              </div>
            </div>
          </a>
              </ActiveLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <ActiveLink href="/donation" activeClassName={"active"}>
                  <a className="nav-link">Skill Donation</a>
                </ActiveLink>
              </li>
              <li className="nav-item">
                <ActiveLink href="/work" activeClassName={"active"}>
                  <a className="nav-link">Our Work</a>
                </ActiveLink>
              </li>
              <li className="nav-item">
                <ActiveLink href="/about" activeClassName={"active"}>
                  <a className="nav-link">About Us</a>
                </ActiveLink>
              </li>
              <li className="nav-item">
                <ActiveLink href="/registration" activeClassName={"active"}>
                  <a className="nav-link ">NGO Registration</a>
                </ActiveLink>
              </li>
              <li className="nav-item border rounded-3">
                <ActiveLink href="/login" activeClassName={"active"}>
                  <a className="nav-link text-white">Login</a>
                </ActiveLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
