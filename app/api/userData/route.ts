import { withMongoDB } from "@/app/api/masasi/route";
import { NextRequest, NextResponse } from "next/server";
import { Collection } from "mongodb";
import { parse } from "url";

export async function GET(req: NextRequest) {
    return withMongoDB(async (collection: Collection) => {
        const { query } = parse(req.url, true);
        const email = query.email as string;

        // Check if a user with the provided email exists in the collection
        const user = await collection.findOne({ email });

        if (user) {
            // If the user exists, return a response with the user's data
            return NextResponse.json(user, { status: 200 });
        } else {
            // If the user does not exist, return a response indicating user doesn't exist
            return NextResponse.json({ exists: false }, { status: 404 });
        }
    }, "masasi", "users");
}