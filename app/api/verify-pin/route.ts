import { NextResponse } from "next/server";

const DEFAULT_PIN = "1803";

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();
    const validPin = process.env.ADMIN_PIN || DEFAULT_PIN;

    if (String(pin).trim() === String(validPin).trim()) {
      return NextResponse.json({ valid: true });
    }

    return NextResponse.json(
      { valid: false, error: "Clave incorrecta" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { valid: false, error: "Petición inválida" },
      { status: 400 }
    );
  }
}
