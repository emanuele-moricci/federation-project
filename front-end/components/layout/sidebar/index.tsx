import { useEffect, useRef } from "react";
import Image from "next/image";

import { Nav } from "reactstrap";

import avatar from "assets/img/default-avatar.png";
import logo from "assets/img/fed-proj-logo.svg";

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

  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return (
          <li key={key}>
            <div>
              {prop.icon !== undefined ? (
                <>
                  <i className={prop.icon} />
                  <p>
                    {prop.name}
                    <b className="caret" />
                  </p>
                </>
              ) : (
                <>
                  <span className="sidebar-mini-icon">{prop.mini}</span>
                  <span className="sidebar-normal">
                    {prop.name}
                    <b className="caret" />
                  </span>
                </>
              )}
            </div>
            <div>
              <ul className="nav">{createLinks(prop.views)}</ul>
            </div>
          </li>
        );
      }
      return (
        <li className={activeRoute(prop.layout + prop.path)} key={key}>
          <a href={prop.layout + prop.path}>
            {prop.icon !== undefined ? (
              <>
                <i className={prop.icon} />
                <p>{prop.name}</p>
              </>
            ) : (
              <>
                <span className="sidebar-mini-icon">{prop.mini}</span>
                <span className="sidebar-normal">{prop.name}</span>
              </>
            )}
          </a>
        </li>
      );
    });
  };
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return window.location.href.indexOf(routeName) > -1 ? "active" : "";
  };

  return (
    <>
      <div className="sidebar" data-color={props.backgroundColor}>
        <div className="logo">
          <a
            href="https://www.creative-tim.com?ref=nudr-sidebar"
            className="simple-text logo-mini"
            target="_blank"
            rel="noreferrer"
          >
            <div className="logo-img">
              <Image src={logo} alt="react-logo" />
            </div>
          </a>
          <a
            href="https://www.creative-tim.com?ref=nudr-sidebar"
            className="simple-text logo-normal"
            target="_blank"
            rel="noreferrer"
          >
            Federation
          </a>
        </div>

        <div className="sidebar-wrapper" ref={sidebar}>
          <div className="user">
            <div className="photo">
              <Image src={avatar} alt="Avatar" />
            </div>
            <div className="info">
              <a href="#pablo">
                <span>Test User</span>
              </a>
              <div>
                <ul className="nav">
                  <li>
                    <a href="#pablo" onClick={(e) => e.preventDefault}>
                      <span className="sidebar-normal">My Profile</span>
                    </a>
                  </li>
                  <li>
                    <a href="#pablo" onClick={(e) => e.preventDefault}>
                      <span className="sidebar-normal">Edit Profile</span>
                    </a>
                  </li>
                  <li>
                    <a href="#pablo" onClick={(e) => e.preventDefault}>
                      <span className="sidebar-normal">Settings</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Nav>{createLinks(props.routes)}</Nav>
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
