import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("register", "routes/register.tsx"),
  route("login", "routes/login.tsx"),
  // route(":userId/track", "routes/track.tsx"),
  route(":userId/weight-dashboard", "routes/weightDashboard.tsx"),
  route(":userId/input-weight", "routes/input.tsx"),
  route(":userId/manual-upload", "routes/manualInputSection.tsx"),
  route(":userId/camera-upload", "routes/cameraUploadSection.tsx")
] satisfies RouteConfig;
