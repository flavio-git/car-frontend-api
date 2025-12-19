const BACKEND_URL = process.env.BACKEND_URL;

export async function GET(req) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (req.headers.get("authorization")) {
      headers["Authorization"] = req.headers.get("authorization");
    }

    const page = req.headers.get("page");
    const size = req.headers.get("size");

    if (page) {
      headers["page"] = page;
    }
    if (size) {
      headers["size"] = size;
    }

    const url = `${BACKEND_URL}/api/carros`;

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

export async function POST(req) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (req.headers.get("authorization")) {
      headers["Authorization"] = req.headers.get("authorization");
    }

    const body = await req.json();
    const url = `${BACKEND_URL}/api/carros`;

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
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
