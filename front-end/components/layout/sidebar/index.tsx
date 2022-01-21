import { useEffect, useRef } from "react";
import Image from "next/image";

import avatar from "assets/img/default-avatar.png";
import logo from "assets/img/fed-proj-logo.svg";

import Routes from "./routes";
import Link from "next/link";

function Sidebar(props) {
  const sidebar = useRef();
  useEffect(() => {
    return () => {
      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });

  return (
    <>
      <div className="sidebar" data-color={props.backgroundColor}>
        <div className="logo">
          <Link href="/">
            <a className="simple-text logo-mini">
              <div className="logo-img">
                <Image src={logo} alt="react-logo" />
              </div>
            </a>
          </Link>
          <a className="simple-text logo-normal">Federation</a>
        </div>

        <div className="sidebar-wrapper" ref={sidebar}>
          <div className="user">
            <div className="photo">
              <Image src={avatar} alt="Avatar" />
            </div>
            <div className="info">
              <Link href="/profile">
                <a>
                  <span>Test User</span>
                </a>
              </Link>
              <div>
                <ul className="nav">
                  <Routes />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Sidebar.defaultProps = {
  routes: [],
  backgroundColor: "green",
};

export default Sidebar;
