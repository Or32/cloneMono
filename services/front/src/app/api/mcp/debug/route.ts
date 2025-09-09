import {NextRequest, NextResponse} from 'next/server';
import {z} from 'zod';
import { saveNewLiveDebugSession } from '@/server/services/liveDebug.service';
import { liveDebugRequestSchema } from '@contxthub/contracts';

export async function POST(req: NextRequest) {
    try {
        const json = await req.json();
        const parsedLiveDebugRequest = liveDebugRequestSchema.parse(json);

        // TODO: Use actual data
        await saveNewLiveDebugSession("", parsedLiveDebugRequest.tunnelAddress);

        return NextResponse.json('created', { status: 201 });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return NextResponse.json({ error: 'Validation failed', issues: err.issues }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
