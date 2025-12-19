const BACKEND_URL = process.env.BACKEND_URL;

async function handleRequest(req, method) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (req.headers.get("authorization")) {
      headers["Authorization"] = req.headers.get("authorization");
    }

    let url = `${BACKEND_URL}/api/usuarios`;
    let options = { method, headers };

    if (method === "GET") {
      const { searchParams } = new URL(req.url);
      const endpoint = searchParams.get("endpoint");

      if (endpoint === "my-profile") {
        url = `${BACKEND_URL}/api/usuarios/my-profile`;
      }
    } else if (method === "POST") {
      const body = await req.json();
      options.body = JSON.stringify(body);

      const { searchParams } = new URL(req.url);
      const endpoint = searchParams.get("endpoint");

      if (endpoint === "login") {
        url = `${BACKEND_URL}/api/usuarios/login`;
      }
    }

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

export async function GET(req) {
  return handleRequest(req, "GET");
}

export async function POST(req) {
  return handleRequest(req, "POST");
}
