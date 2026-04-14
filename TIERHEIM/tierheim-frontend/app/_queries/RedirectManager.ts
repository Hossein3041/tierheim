import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function internalRedirect(
  relativePath: string,
  router: AppRouterInstance,
) {
  if (process.env.NEXT_PUBLIC_ENV === "local") {
    router.push(relativePath);
  } else {
    router.push(
      relativePath + (relativePath.endsWith("/") ? "index.html" : ".html"),
    );
  }
}
