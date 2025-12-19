const BACKEND_URL = process.env.BACKEND_URL;

async function handleRequest(req, method, paramsPromise) {
  const params = await paramsPromise;
  const { id } = params;

  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (req.headers.get("authorization")) {
      headers["Authorization"] = req.headers.get("authorization");
    }

    const url = `${BACKEND_URL}/api/carros/${id}`;
    let options = { method, headers };

    if (method === "PUT") {
      const body = await req.json();
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    const status = response.status;

    const forwardedHeaders = {};
    for (const [key, value] of response.headers.entries()) {
      forwardedHeaders[key] = value;
    }

    const isNoBodyStatus =
      (status >= 100 && status < 200) ||
      status === 204 ||
      status === 205 ||
      status === 304;

    if (isNoBodyStatus) {
      return new Response(null, { status, headers: forwardedHeaders });
    }

    if (!response.ok) {
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Failed to parse error response" }));
        return Response.json(errorData, { status, headers: forwardedHeaders });
      }
      const text = await response
        .text()
        .catch(() => "Failed to parse error response");
      return new Response(text, { status, headers: forwardedHeaders });
    }

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await response.json();
      console.log(`Backend response for ${method} /api/carros/${id}:`, data);
      return Response.json(data, { status, headers: forwardedHeaders });
    }

    if (response.body) {
      return new Response(response.body, { status, headers: forwardedHeaders });
    }

    const text = await response.text();
    return new Response(text, { status, headers: forwardedHeaders });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  return handleRequest(req, "GET", params);
}

export async function PUT(req, { params }) {
  return handleRequest(req, "PUT", params);
}

export async function DELETE(req, { params }) {
  return handleRequest(req, "DELETE", params);
}
