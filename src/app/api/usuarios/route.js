const BACKEND_URL = process.env.BACKEND_URL;

export async function GET(req) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    let url = `${BACKEND_URL}api/usuarios`;

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

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
