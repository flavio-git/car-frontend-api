const BACKEND_URL = process.env.BACKEND_URL;

export async function GET(req) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const authHeader = req.headers.get("authorization");
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const url = `${BACKEND_URL}api/usuarios/my-profile`;
    console.log("My Profile URL:", url);
    const options = {
      method: "GET",
      headers,
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
