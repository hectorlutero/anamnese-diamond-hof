import { NextResponse } from "next/server";
import { formatLocalData } from "@/lib/date";
import { formatAnamneseEmail } from "@/lib/format-email";
import { sendAnamneseEmail } from "@/lib/send-email";
import { AnamneseSubmitPayload } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const data: AnamneseSubmitPayload = await request.json();

    if (!data.nome?.trim() || !data.contato?.trim()) {
      return NextResponse.json(
        { error: "Nome e contato são obrigatórios" },
        { status: 400 }
      );
    }

    if (!data.aceiteTermo) {
      return NextResponse.json(
        { error: "É necessário aceitar o termo de responsabilidade" },
        { status: 400 }
      );
    }

    const payload: AnamneseSubmitPayload = {
      ...data,
      localData: data.localData || formatLocalData(data.cidade, data.uf),
    };

    const to = process.env.EMAIL_TO || "dras.diamondhof@gmail.com";
    const { subject, html, text } = formatAnamneseEmail(payload);

    await sendAnamneseEmail({ to, subject, html, text });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar anamnese:", error);
    return NextResponse.json(
      { error: "Falha ao enviar formulário. Tente novamente." },
      { status: 500 }
    );
  }
}
