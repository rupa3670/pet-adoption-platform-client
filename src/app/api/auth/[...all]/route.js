import { auth } from "@/lib/auth";

export async function GET(request) {
    const res = await auth.handler(request);
    return res;
}

export async function POST(request) {
    const res = await auth.handler(request);
    return res;
}