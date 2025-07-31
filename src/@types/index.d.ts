import { IRouteConfig } from "@/libs";

export type JwtUserPayload = {
  id: string;
  email: string;
};
export type RouteConfig = IRouteConfig[];
