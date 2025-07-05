import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    layout("routes/main/mainLayout.tsx", [index("routes/main/home/index.tsx")]),

    // Dashboard
    layout("routes/admin/layout.tsx", [
      ...prefix("admin", [
        route("dashboard", "routes/admin/dashboard/index.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
