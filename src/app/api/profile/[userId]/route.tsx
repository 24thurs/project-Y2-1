import { NextResponse } from "next/server";
import { connectMongoDB } from "@/config/config";
import { User } from "@/models/models";

export async function GET(req: Request) {
    try {
        await connectMongoDB();

        const url = new URL(req.url);
        const userId = url.pathname.split("/").pop();
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        console.log(user);
        return NextResponse.json({ user });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
