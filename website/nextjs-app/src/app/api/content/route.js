import { MongoClient } from 'mongodb';
import clientPromise from '@/app/lib/mongodb';

export async function POST(request: Request) {
    try {
        const client: MongoClient = await clientPromise;
        const db = client.db('content');
        const collection = db.collection('pages');
        
        const content = await request.json();
        const result = await collection.insertOne(content);
        
        return new Response(JSON.stringify({
            success: true,
            id: result.insertedId
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}