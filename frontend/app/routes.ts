import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    layout("routes/main/mainLayout.tsx", [
      index("routes/main/home/index.tsx"),
      route("/login", "routes/main/login/index.tsx"),
    ]),

    // Dashboard
    layout("routes/admin/layout.tsx", [
      ...prefix("admin", [
        route("dashboard", "routes/admin/dashboard/index.tsx"),
        route("about", "routes/admin/contact/about.tsx"),
        route("skill", "routes/admin/skill/index.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
