import { NextResponse } from "next/server";
import { fetchCell } from "../../../../utils/actions";

export const GET = async (req: NextResponse) => {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  //use param from route
  console.log(search);

  //   const cells = await fetchCell();
  //   return Response.json({ cells });
  return NextResponse.redirect(new URL("/", req.url));
};
