import { withMongoDB } from "@/app/api/masasi/route";
import { NextRequest, NextResponse } from "next/server";
import {Collection, ObjectId} from "mongodb";
const bcrypt  = require('bcryptjs');

export async function GET() {
    return withMongoDB(async (collection: Collection) => {
        const data = await collection.find({}).toArray();
        return NextResponse.json(data, { status: 200 });
    }, "masasi", "users");
}

// Function to find a user by email
export async function findByEmail(email: string, collection: Collection) {
    return collection.findOne({ email });
}

export async function POST(req: NextRequest) {
    return withMongoDB(async (collection: Collection) => {
        const { name, email, password } = await req.json();

        // Check if a user with the same email already exists
        const existingUser = await findByEmail(email, collection);
        if (existingUser) {
            return NextResponse.json(
                { error: "Email already in use" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
            name,
            email,
            password: hashedPassword,
        };

        // Insert the user object into the collection
        await collection.insertOne(user);

        return NextResponse.json(user, { status: 201 });
    }, "masasi", "users");
}

export async function PUT(req: NextRequest) {
    return withMongoDB(async (collection: Collection) => {
        const { id, updatedData } = await req.json();

        const objectId = new ObjectId(id);
        const filter = { _id: objectId };
        const update = { $set: updatedData };

        await collection.updateOne(filter, update);

        return NextResponse.json({
            success: true,
            message: "User details updated successfully",
        });
    }, "masasi", "users");
}

export async function DELETE(req: NextRequest) {
    return withMongoDB(async (collection) => {
        const { id } = await req.json();

        const objectId = new ObjectId(id);
        const filter = { _id: objectId };

        await collection.deleteOne(filter);

        return NextResponse.json({
            success: true,
            message: "User deleted successfully",
        });
    }, "masasi", "users");
}