export async function POST(request: Request) {
    const { email, password } = await request.json();
}