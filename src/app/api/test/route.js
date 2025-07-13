// app/api/hello/route.js

export async function GET(request) {
  return Response.json({ message: "Hello from Next.js 15 API!" });
}

export async function POST(request) {
  const body = await request.json();
  return Response.json({ received: body });
}
