import Index from "views/Index.js";
import App from "views/examples/app"
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Authentication from "views/examples/Authentication"
import Sites from "views/examples/websites/sites"
import database from "views/examples/database"

var routes = [
  {
    path: "/app",
    name: "App:",
    app: true,
    icon: "ni ni-app text-primary",
    component: App,
    layout: "/admin"
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/authentication/u/1/",
    name: "Authentication",
    icon: "ni ni-single-02 text-red",
    component: Authentication,
    layout: "/admin"
  },
  {
    path: "/database/u/1/",
    name: "Storage",
    icon: "ni ni-cloud-download-95 text-red",
    component: database,
    
    layout: "/admin"
  }
  //
  //{
    //path: "/sites/u/1/",
    //name: "Sites",
    //icon: "ni ni-shop text-red",
    //component: Sites,
    //layout: "/admin"
  //},
  //
];
export default routes;
