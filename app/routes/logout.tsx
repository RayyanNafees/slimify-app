import { redirect } from "react-router";
import type { Route } from "./+types/logout";
import { cookieStore } from "../cookies";

export const loader = async ({ request }: Route.ClientActionArgs) => {
  await request.headers.delete("Cookie");
  await request.headers.delete("Set-Cookie");

  return redirect("/login", {
    headers: {
      "Set-Cookie": await cookieStore.serialize(""),
    },
  });
};
