import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/cam.tsx"),
  route("register", "routes/register.tsx"),
  route("login", "routes/login.tsx"),
  route(":userId/weight-dashboard", "routes/weightDashboard.tsx"),
  route(":userId/weight-input", "routes/input.tsx"),
  route(":userId/manual-upload", "routes/manualInputSection.tsx"),
  route(":userId/camera-upload", "routes/cameraUploadSection.tsx"),
  route(":userId/cam", "routes/openCam.tsx")
] satisfies RouteConfig;
