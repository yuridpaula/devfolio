import MediaSocialCrud from "scenes/admin/MediaSocialCrud";
import MediaSocialList from "scenes/admin/MediaSocialList";
import ProjectsCrud from "scenes/admin/ProjectsCrud";
import ProjectsList from "scenes/admin/ProjectsList";
import TechsCrud from "scenes/admin/TechsCrud";
import TechsList from "scenes/admin/TechsList";
import TestimonialsCrud from "scenes/admin/TestimonialsCrud";
import TestimonialsList from "scenes/admin/TestimonialsList";
import Landing from "scenes/Landing/Landing";
import Login from "scenes/Auth/Login.js";
import IconsCrud from "./scenes/admin/IconsCrud";
import IconsList from "./scenes/admin/IconsList";
import Profile from "./scenes/admin/Profile";

var routes = [
  {
    path: "",
    name: "Home",
    icon: "ni ni-shop text-blue",
    component: Landing,
    layout: "/landing",
    hide: true
  },

  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    hide: true
  },

  {
    path: "/profile",
    name: "Profile",
    icon: "ni ni-single-02 text-red",
    component: Profile,
    layout: "/admin"
  },
  {
    group: "Registers",
    innerRoutes: [
      {
        path: "/iconsCrud",
        name: "Icons",
        icon: "ni ni-album-2 text-black",
        component: IconsCrud,
        layout: "/admin"
      },
      {
        path: "/mediaSocialCrud",
        name: "MediaSocial",
        icon: "ni ni-like-2 text-blue",
        component: MediaSocialCrud,
        layout: "/admin"
      },
      {
        path: "/techsCrud",
        name: "Techs",
        icon: "ni ni-settings text-green",
        component: TechsCrud,
        layout: "/admin"
      },
      {
        path: "/testimonialsCrud",
        name: "Testimonials",
        icon: "ni ni-collection text-yellow",
        component: TestimonialsCrud,
        layout: "/admin"
      },
      {
        path: "/projectsCrud",
        name: "Projects",
        icon: "ni ni-atom text-purple",
        component: ProjectsCrud,
        layout: "/admin"
      },
    ]
  },

  {
    group: "Lists",
    innerRoutes: [
      {
        path: "/iconsList",
        name: "Icons",
        icon: "ni ni-album-2 text-black",
        component: IconsList,
        layout: "/admin"
      },
      {
        path: "/mediaSocialList",
        name: "MediaSocial",
        icon: "ni ni-like-2 text-blue",
        component: MediaSocialList,
        layout: "/admin"
      },
      {
        path: "/techsList",
        name: "Techs",
        icon: "ni ni-settings text-green",
        component: TechsList,
        layout: "/admin"
      },
      {
        path: "/testimonialsList",
        name: "Testimonials",
        icon: "ni ni-collection text-yellow",
        component: TestimonialsList,
        layout: "/admin"
      },
      {
        path: "/projectsList",
        name: "Projects",
        icon: "ni ni-atom text-purple",
        component: ProjectsList,
        layout: "/admin"
      }
    ]
  },

];
export default routes;
