import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/cam.tsx"),
  route("register", "routes/register.tsx"),
  route("login", "routes/login.tsx"),
  route("logout", "routes/logout.tsx"),
  route("weight-dashboard", "routes/weightDashboard.tsx"),
  route("weight-input", "routes/input.tsx"),
  route("manual-upload", "routes/manualInputSection.tsx"),
  route("camera-upload", "routes/cameraUploadSection.tsx"),
] satisfies RouteConfig;
