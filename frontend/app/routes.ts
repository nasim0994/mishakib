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

        route("counter/all", "routes/admin/contact/counter/allCounter.tsx"),
        route("counter/add", "routes/admin/contact/counter/addCounter.tsx"),
        route(
          "counter/edit/:id",
          "routes/admin/contact/counter/editCounter.tsx"
        ),

        route("service/all", "routes/admin/service/all.tsx"),
        route("service/add", "routes/admin/service/add.tsx"),
        route("service/edit/:id", "routes/admin/service/edit.tsx"),

        route("gallery/category/all", "routes/admin/gallery/category/all.tsx"),
        route("gallery/category/add", "routes/admin/gallery/category/add.tsx"),
        route(
          "gallery/category/edit/:id",
          "routes/admin/gallery/category/edit.tsx"
        ),

        route("gallery/all", "routes/admin/gallery/gallery/all.tsx"),
        route("gallery/add", "routes/admin/gallery/gallery/add.tsx"),
        route("gallery/edit/:id", "routes/admin/gallery/gallery/edit.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
