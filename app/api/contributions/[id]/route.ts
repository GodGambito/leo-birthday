import { NextResponse } from "next/server";
import { deleteContribution, getSummary } from "@/lib/db";

const DEFAULT_PIN = "1803";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const pin = searchParams.get("pin");

    const validPin = process.env.ADMIN_PIN || DEFAULT_PIN;
    if (String(pin).trim() !== String(validPin).trim()) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const success = await deleteContribution(id);
    if (!success) {
      return NextResponse.json(
        { error: "Aporte no encontrado" },
        { status: 404 }
      );
    }

    const summary = await getSummary();
    return NextResponse.json({ success: true, summary });
  } catch (error) {
    console.error("Error deleting contribution:", error);
    return NextResponse.json(
      { error: "Error al eliminar aporte" },
      { status: 500 }
    );
  }
}
