import {connectToMongoDB, disconnectFromMongoDB, getCollection} from "@/lib/mongodb";
import {NextRequest, NextResponse} from "next/server";
import {Collection, ObjectId} from "mongodb";

export async function withMongoDB(handler: (collection: Collection) => Promise<NextResponse>, database: string, collectionName: string) {
    const client = await connectToMongoDB();
    const collection = await getCollection(client, database, collectionName);

    try {
        return await handler(collection);
    } catch (e) {
        return NextResponse.json(e, {status: 500});
    } finally {
        await disconnectFromMongoDB(client);
    }
}

export async function GET() {
    return withMongoDB(async (collection: Collection) => {
        const masasi = await collection.find({}).toArray();
        return NextResponse.json(masasi, {status: 200});
    }, "masasi", "masasi");
}

export async function POST(req: NextRequest) {
    return withMongoDB(async (collection: Collection) => {
        const userDetails = await req.json();

        console.log(userDetails);

        await collection.insertOne(userDetails);
        return NextResponse.json(userDetails, {status: 201});
    }, "masasi", "masasi");
}

export async function PUT(req: NextRequest) {
    return withMongoDB(async (collection: Collection) => {
        const {id, updatedData} = await req.json();

        const objectId = new ObjectId(id);
        const filter = {_id: objectId};
        const update = {$set: updatedData};

        await collection.updateOne(filter, update);

        return NextResponse.json({
            success: true,
            message: "User details updated successfully",
        })
    }, "masasi", "masasi");
}

export async function DELETE(req: NextRequest) {
    return withMongoDB(async (collection) => {
        const {id} = await req.json();

        const objectId = new ObjectId(id);
        const filter = {_id: objectId};

        await collection.deleteOne(filter);

        return NextResponse.json({
            success: true,
            message: "User deleted successfully",
        })
    }, "masasi", "masasi");
}