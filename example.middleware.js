import { NextResponse } from "next/server";
import { store } from "./lib/store";
import { authApi } from "./lib/features/services/authApi";

const userPrefixes = [
  "/dashboard",
  "/analysis",
  "/bank",
  "/market",
  "/ranking",
  "/ratio",
  "/size",
  "/summary",
];
const allPrefixes = [
  "/dashboard",
  "/analysis",
  "/bank",
  "/market",
  "/ranking",
  "/ratio",
  "/size",
  "/summary",
  "/admin",
  "/login",
];

const allExceptLoginPrefixes = [
  "/dashboard",
  "/analysis",
  "/bank",
  "/market",
  "/ranking",
  "/ratio",
  "/size",
  "/summary",
  "/admin",
];

export async function middleware(req) {
  if (allPrefixes.some((prefix) => req.nextUrl.pathname.startsWith(prefix))) {
    const accessToken = req.cookies.get("accessToken")?.value;
    if (accessToken) {
      try {
        const verify = store.dispatch(
          authApi.endpoints.verifyToken.initiate({ token: accessToken })
        );
        const { data, error } = await verify;
        if (data) {
          const user = data.userObj;
          if (user) {
            if (user.role === "Admin" || user.role === "SuperAdmin") {
              if (req.nextUrl.pathname.startsWith("/login")) {
                return NextResponse.redirect(new URL("/admin", req.url));
              } else if (
                userPrefixes.some((prefix) =>
                  req.nextUrl.pathname.startsWith(prefix)
                )
              ) {
                return NextResponse.next();
              } else if (req.nextUrl.pathname.startsWith("/admin")) {
                return NextResponse.next();
              }
            } else if (user.role === "User") {
              if (req.nextUrl.pathname.startsWith("/login")) {
                return NextResponse.redirect(new URL("/dashboard", req.url));
              } else if (
                userPrefixes.some((prefix) =>
                  req.nextUrl.pathname.startsWith(prefix)
                )
              ) {
                return NextResponse.next();
              } else {
                return NextResponse.redirect(new URL("/dashboard", req.url));
              }
            }
          } else {
            if (
              allExceptLoginPrefixes.some((prefix) =>
                req.nextUrl.pathname.startsWith(prefix)
              )
            ) {
              return NextResponse.redirect(new URL("/login", req.url));
            }
          }
        } else if (error) {
          try {
            const refresh = store.dispatch(
              authApi.endpoints.refresh.initiate({ token: accessToken })
            );
            const { data, error } = await refresh;
            if (data) {
              const newAccessToken = req.cookies.get("accessToken")?.value;
              console.log(newAccessToken)
              if (newAccessToken) {
                const reVerify = store.dispatch(
                  authApi.endpoints.verifyToken.initiate({
                    token: newAccessToken,
                  })
                );
                const { data, error } = await reVerify;
                console.log(data)
                console.log(error)
                if (data) {
                  const user = data.userObj;
                  if (user) {
                    if (user.role === "Admin" || user.role === "SuperAdmin") {
                      if (req.nextUrl.pathname.startsWith("/login")) {
                        return NextResponse.redirect(
                          new URL("/admin", req.url)
                        );
                      } else if (
                        userPrefixes.some((prefix) =>
                          req.nextUrl.pathname.startsWith(prefix)
                        )
                      ) {
                        return NextResponse.next();
                      } else if (req.nextUrl.pathname.startsWith("/admin")) {
                        return NextResponse.next();
                      }
                    } else if (user.role === "User") {
                      if (req.nextUrl.pathname.startsWith("/login")) {
                        return NextResponse.redirect(
                          new URL("/dashboard", req.url)
                        );
                      } else if (
                        userPrefixes.some((prefix) =>
                          req.nextUrl.pathname.startsWith(prefix)
                        )
                      ) {
                        return NextResponse.next();
                      } else {
                        return NextResponse.redirect(
                          new URL("/dashboard", req.url)
                        );
                      }
                    }
                  } else {
                    if (
                      allExceptLoginPrefixes.some((prefix) =>
                        req.nextUrl.pathname.startsWith(prefix)
                      )
                    ) {
                      return NextResponse.redirect(new URL("/login", req.url));
                    }
                  }
                } else if (error) {
                  if (
                    allExceptLoginPrefixes.some((prefix) =>
                      req.nextUrl.pathname.startsWith(prefix)
                    )
                  ) {
                    return NextResponse.redirect(new URL("/login", req.url));
                  }
                }
              }
            } else if (error) {
              if (
                allExceptLoginPrefixes.some((prefix) =>
                  req.nextUrl.pathname.startsWith(prefix)
                )
              ) {
                return NextResponse.redirect(new URL("/login", req.url));
              }
            }
          } catch (e) {
            if (
              allExceptLoginPrefixes.some((prefix) =>
                req.nextUrl.pathname.startsWith(prefix)
              )
            ) {
              return NextResponse.redirect(new URL("/login", req.url));
            }
          }
        }
      } catch (e) {
        if (
          allExceptLoginPrefixes.some((prefix) =>
            req.nextUrl.pathname.startsWith(prefix)
          )
        ) {
          return NextResponse.redirect(new URL("/login", req.url));
        }
      }
    } else {
      if (
        allExceptLoginPrefixes.some((prefix) =>
          req.nextUrl.pathname.startsWith(prefix)
        )
      ) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
  } else {
    return NextResponse.next();
  }
}
