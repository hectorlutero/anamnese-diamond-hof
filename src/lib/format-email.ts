import { AnamneseFormData, AnamneseSubmitPayload, MOOD_OPTIONS, YesNo } from "./types";

function yn(value: YesNo): string {
  if (value === "sim") return "Sim";
  if (value === "nao") return "Não";
  return "—";
}

function list(items: string[]): string {
  return items.length > 0 ? items.join(", ") : "—";
}

function formatHumor(ids: string[]): string {
  if (ids.length === 0) return "—";
  return ids
    .map((id) => {
      const mood = MOOD_OPTIONS.find((m) => m.id === id);
      return mood ? `${mood.emoji} ${mood.label}` : id;
    })
    .join(", ");
}

function formatAddress(data: AnamneseFormData): string {
  const parts = [
    data.cep && `CEP ${data.cep}`,
    data.logradouro,
    data.numero && `nº ${data.numero}`,
    data.complemento,
    data.bairro,
    [data.cidade, data.uf].filter(Boolean).join(" - "),
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "—";
}

const FUMANTE_LABELS: Record<string, string> = {
  sim: "Sim",
  nunca: "Não sou, nunca fui",
  ex: "Não sou, mas já fui",
};

const AGUA_LABELS: Record<string, string> = {
  "menos-1l": "Menos de 1L",
  "1l-ou-mais": "1L ou mais",
};

const INTESTINO_LABELS: Record<string, string> = {
  excelente: "Excelente",
  bom: "Bom",
  regular: "Regular",
  ruim: "Ruim",
  pessimo: "Péssimo",
};

export function formatAnamneseEmail(data: AnamneseSubmitPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Nova Anamnese — ${data.nome || "Paciente"}`;

  const sections: { title: string; rows: [string, string][] }[] = [
    {
      title: "Identificação",
      rows: [
        ["Nome", data.nome],
        ["Idade", data.idade],
        ["Contato", data.contato],
        ["Endereço completo", formatAddress(data)],
      ],
    },
    {
      title: "Histórico Geral",
      rows: [
        ["Tratamento estético anterior", yn(data.tratamentoEsteticoAnterior)],
        ["Usa ou já usou ácidos na pele", yn(data.usaAcidos)],
        ["Portador de marcapasso", yn(data.marcapasso)],
      ],
    },
    {
      title: "Histórico Geral (cont.)",
      rows: [
        ["Próteses metálicas", yn(data.protesesMetalicas)],
        ["Problemas cardíacos", yn(data.problemasCardiacos)],
        ["Epilepsia", yn(data.epilepsia)],
        ["Antecedentes oncológicos", yn(data.antecedentesOncologicos)],
        ["Ciclo menstrual regular", yn(data.cicloMenstrual)],
        ["Método anticoncepcional", yn(data.metodoAnticoncepcional)],
        ["Cuidados diários e produtos", yn(data.cuidadosDiarios)],
        ["Próteses dentárias", yn(data.protesesDentarias)],
        ["Costuma tomar sol", yn(data.tomaSol)],
      ],
    },
    {
      title: "Histórico Clínico",
      rows: [
        ["Condições", list(data.condicoesClinicas)],
        ["Cirurgias", data.cirurgia || "—"],
        ["Alergias", data.alergia || "—"],
        ["Medicamentos atuais", data.medicamentoAtual || "—"],
        ["Gestante/Lactante", yn(data.gestanteLactante)],
      ],
    },
    {
      title: "Hábitos de Vida",
      rows: [
        ["Água diária", AGUA_LABELS[data.aguaDiaria] || "—"],
        ["Fumante", FUMANTE_LABELS[data.fumanteHabitos] || "—"],
        ["Quais consome", data.quaisConsome || "—"],
        ["Intestino", INTESTINO_LABELS[data.intestino] || "—"],
        ["Qualidade do sono", data.qualidadeSono || "—"],
      ],
    },
    {
      title: "Diagnose Facial",
      rows: [
        ["Produtos em uso", list(data.produtosUso)],
        ["Procedimento facial (3 meses)", yn(data.procedimentoFacial)],
        ["Alergia/sensibilidade cosmético", yn(data.alergiaCosmetico)],
        ["Humor", formatHumor(data.humor)],
      ],
    },
    {
      title: "Anamnese Complementar",
      rows: [
        ["Medicamentos controlados", data.medicamentosControlados || "—"],
        ["Tratamento médico atual", data.tratamentoMedicoAtual || "—"],
        ["Tratamento estético atual", data.tratamentoEsteticoAtual || "—"],
        ["Atividade física", data.atividadeFisica || "—"],
        ["Anticoagulantes", data.anticoagulantes || "—"],
        ["Problemas respiratórios", data.problemasRespiratorios || "—"],
        ["Quelóide", yn(data.queloide)],
        ["Queixa principal", data.queixaPrincipal || "—"],
      ],
    },
    {
      title: "Termo de Responsabilidade",
      rows: [
        ["CPF", data.cpf],
        ["Local e data", data.localData],
        ["Aceite", data.aceiteTermo ? "Sim" : "Não"],
      ],
    },
  ];

  const htmlSections = sections
    .map(
      (s) => `
      <h2 style="color:#B8860B;font-size:16px;margin:24px 0 8px;border-bottom:1px solid #E8D5A3;padding-bottom:4px;">${s.title}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${s.rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;width:40%;">${label}</td>
            <td style="padding:6px 0;color:#333;vertical-align:top;">${value.replace(/\n/g, "<br>")}</td>
          </tr>`
          )
          .join("")}
      </table>`
    )
    .join("");

  const html = `
    <div style="font-family:Georgia,serif;max-width:640px;margin:0 auto;">
      <div style="text-align:center;padding:24px 0;border-bottom:2px solid #B8860B;">
        <h1 style="color:#B8860B;margin:0;font-size:24px;">Diamond HOF</h1>
        <p style="color:#888;margin:4px 0 0;font-size:12px;letter-spacing:2px;">ESTÉTICA INTEGRADA PREMIUM</p>
      </div>
      <p style="color:#666;font-size:13px;margin:16px 0;">Nova ficha de anamnese recebida em ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</p>
      ${htmlSections}
    </div>`;

  const text = sections
    .map(
      (s) =>
        `\n=== ${s.title} ===\n${s.rows.map(([l, v]) => `${l}: ${v}`).join("\n")}`
    )
    .join("\n");

  return { subject, html, text };
}
