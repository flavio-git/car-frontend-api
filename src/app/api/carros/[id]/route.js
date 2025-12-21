const BACKEND_URL = process.env.BACKEND_URL;

function buildForwardedHeaders(response) {
  const forwardedHeaders = {};
  for (const [key, value] of response.headers.entries()) {
    forwardedHeaders[key] = value;
  }
  return forwardedHeaders;
}

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    // Constroi a URL para o Spring Boot
    const url = `${BACKEND_URL}api/carros/${id}`;

    // Retorna a resposta do Spring Boot
    const response = await fetch(url, { method: "GET" });

    // Status da resposta do Spring Boot
    const status = response.status;

    // Pega os headers para repassar na resposta ao client-side
    const forwardedHeaders = buildForwardedHeaders(response);

    // Pega o corpo da resposta do Spring Boot
    const data = await response.json();

    return Response.json(data, { status, headers: forwardedHeaders });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = await params;

  try {
    // Constroi a URL para o Spring Boot
    const url = `${BACKEND_URL}api/carros/${id}`;

    // Pega o corpo da requisição
    const body = await req.json();

    // Retorna a resposta do Spring Boot
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Status da resposta do Spring Boot
    const status = response.status;

    // Pega os headers para repassar na resposta ao client-side
    const forwardedHeaders = buildForwardedHeaders(response);

    // Pega o corpo da resposta do Spring Boot
    const data = await response.json();

    return Response.json(data, { status, headers: forwardedHeaders });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;

  try {
    // Constroi a URL para o Spring Boot
    const url = `${BACKEND_URL}api/carros/${id}`;

    // Retorna a resposta do Spring Boot
    const response = await fetch(url, { method: "DELETE" });

    // Status da resposta do Spring Boot
    const status = response.status;

    // Pega os headers para repassar na resposta ao client-side
    const forwardedHeaders = buildForwardedHeaders(response);

    return Response.json({ status, headers: forwardedHeaders });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
