const BACKEND_URL = process.env.BACKEND_URL;

export async function POST(req) {
  try {
    const body = await req.json();

    const headers = {
      "Content-Type": "application/json",
    };

    const url = `${BACKEND_URL}/api/usuarios/login`;
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    };

    const response = await fetch(url, options);
    const data = await response.json().catch(() => ({}));

    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
