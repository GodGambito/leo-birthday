import { NextResponse } from "next/server";
import { getSummary, addContribution } from "@/lib/db";

const DEFAULT_PIN = "1803";

export async function GET() {
  try {
    const summary = await getSummary();
    return NextResponse.json(summary);
  } catch (error) {
    console.error("Error fetching contributions:", error);
    return NextResponse.json(
      { error: "Error al obtener el ranking" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, amount, message, pin } = body;

    const validPin = process.env.ADMIN_PIN || DEFAULT_PIN;

    if (String(pin).trim() !== String(validPin).trim()) {
      return NextResponse.json(
        { error: "Clave de acceso incorrecta. Solo Leo o Paola pueden registrar montos." },
        { status: 401 }
      );
    }

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Por favor ingresa un nombre válido (mínimo 2 letras)." },
        { status: 400 }
      );
    }

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        { error: "Por favor ingresa un monto válido mayor a 0." },
        { status: 400 }
      );
    }

    const result = await addContribution({
      name,
      amount: parsedAmount,
      message,
    });

    const updatedSummary = await getSummary();

    return NextResponse.json({
      success: true,
      result,
      summary: updatedSummary,
    });
  } catch (error) {
    console.error("Error registering contribution:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al registrar el aporte." },
      { status: 500 }
    );
  }
}
