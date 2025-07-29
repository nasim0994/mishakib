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
        route("about", "routes/admin/about/index.tsx"),
        route("contact", "routes/admin/contact/index.tsx"),
        route("skill", "routes/admin/skill/index.tsx"),

        route("counter/all", "routes/admin/counter/allCounter.tsx"),
        route("counter/add", "routes/admin/counter/addCounter.tsx"),
        route("counter/edit/:id", "routes/admin/counter/editCounter.tsx"),

        route("service/all", "routes/admin/service/all.tsx"),
        route("service/add", "routes/admin/service/add.tsx"),
        route("service/edit/:id", "routes/admin/service/edit.tsx"),

        route("project/category/all", "routes/admin/project/category/all.tsx"),
        route("project/category/add", "routes/admin/project/category/add.tsx"),
        route(
          "project/category/edit/:id",
          "routes/admin/project/category/edit.tsx"
        ),

        route("project/all", "routes/admin/project/project/all.tsx"),
        route("project/add", "routes/admin/project/project/add.tsx"),
        route("project/edit/:id", "routes/admin/project/project/edit.tsx"),

        route("social/all", "routes/admin/contact/social/all.tsx"),
        route("social/add", "routes/admin/contact/social/add.tsx"),
        route("social/edit/:id", "routes/admin/contact/social/edit.tsx"),

        route("setting/logo", "routes/admin/setting/logo/index.tsx"),
        route("setting/seo", "routes/admin/setting/seo/index.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
