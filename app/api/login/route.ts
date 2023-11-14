import { withMongoDB } from "@/app/api/masasi/route";
import { NextRequest, NextResponse } from "next/server";
import { Collection } from "mongodb";
const bcrypt = require('bcryptjs');

export async function findByEmail(email: string, collection: Collection) {
    return collection.findOne({ email });
}

export async function POST(req: NextRequest) {
    return withMongoDB(async (collection: Collection) => {
        const { email, password } = await req.json();

        const user = await findByEmail(email, collection);

        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Return a success response or generate a token for authentication
        return NextResponse.json({ message: "Login successful" }, { status: 200 });
    }, "masasi", "users");
}