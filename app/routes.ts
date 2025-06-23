import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/cam.tsx"),
  route("test", "routes/test.tsx"),
  route("register", "routes/register.tsx"),
  route("login", "routes/login.tsx"),
  route(":userId/weight-dashboard", "routes/weightDashboard.tsx"),
  route(":userId/weight-input", "routes/input.tsx"),
  route(":userId/manual-upload", "routes/manualInputSection.tsx"),
  route(":userId/camera-upload", "routes/cameraUploadSection.tsx")
] satisfies RouteConfig;
