import {withMongoDB} from "@/app/api/masasi/route";
import {NextRequest, NextResponse} from "next/server";
import {Collection} from "mongodb";

export async function POST(req: NextRequest) {
    return withMongoDB(async (collection: Collection) => {
        const {email} = await req.json();

        console.log(req)

        // Check if a user with the provided email exists in the collection
        const user = await collection.findOne({email});

        if (user) {
            // If the user exists, return a response indicating user existence
            return NextResponse.json({exists: true}, {status: 200});
        } else {
            // If the user does not exist, return a response indicating user doesn't exist
            return NextResponse.json({exists: false}, {status: 404});
        }
    }, "masasi", "users");
}