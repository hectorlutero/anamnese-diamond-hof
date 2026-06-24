export type YesNo = "sim" | "nao" | "";

export interface AnamneseFormData {
  // Identificação
  nome: string;
  idade: string;
  contato: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;

  // Histórico Geral
  tratamentoEsteticoAnterior: YesNo;
  usaAcidos: YesNo;
  marcapasso: YesNo;

  // Histórico Geral (cont.)
  protesesMetalicas: YesNo;
  problemasCardiacos: YesNo;
  epilepsia: YesNo;
  antecedentesOncologicos: YesNo;
  cicloMenstrual: YesNo;
  metodoAnticoncepcional: YesNo;
  cuidadosDiarios: YesNo;
  protesesDentarias: YesNo;
  tomaSol: YesNo;

  // Histórico Clínico
  condicoesClinicas: string[];
  cirurgia: string;
  alergia: string;
  medicamentoAtual: string;
  gestanteLactante: YesNo;

  // Hábitos de Vida
  aguaDiaria: string;
  fumanteHabitos: string;
  quaisConsome: string;
  intestino: string;
  qualidadeSono: string;

  // Diagnose Facial
  produtosUso: string[];
  procedimentoFacial: YesNo;
  alergiaCosmetico: YesNo;
  humor: string[];

  // Anamnese Complementar
  medicamentosControlados: string;
  tratamentoMedicoAtual: string;
  tratamentoEsteticoAtual: string;
  atividadeFisica: string;
  anticoagulantes: string;
  problemasRespiratorios: string;
  queloide: YesNo;
  queixaPrincipal: string;

  // Termo
  cpf: string;
  aceiteTermo: boolean;
}

export const initialFormData: AnamneseFormData = {
  nome: "",
  idade: "",
  contato: "",
  cep: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  uf: "",
  tratamentoEsteticoAnterior: "",
  usaAcidos: "",
  marcapasso: "",
  protesesMetalicas: "",
  problemasCardiacos: "",
  epilepsia: "",
  antecedentesOncologicos: "",
  cicloMenstrual: "",
  metodoAnticoncepcional: "",
  cuidadosDiarios: "",
  protesesDentarias: "",
  tomaSol: "",
  condicoesClinicas: [],
  cirurgia: "",
  alergia: "",
  medicamentoAtual: "",
  gestanteLactante: "",
  aguaDiaria: "",
  fumanteHabitos: "",
  quaisConsome: "",
  intestino: "",
  qualidadeSono: "",
  produtosUso: [],
  procedimentoFacial: "",
  alergiaCosmetico: "",
  humor: [],
  medicamentosControlados: "",
  tratamentoMedicoAtual: "",
  tratamentoEsteticoAtual: "",
  atividadeFisica: "",
  anticoagulantes: "",
  problemasRespiratorios: "",
  queloide: "",
  queixaPrincipal: "",
  cpf: "",
  aceiteTermo: false,
};

export const MOOD_OPTIONS = [
  { id: "calma", emoji: "😌", label: "Calma" },
  { id: "feliz", emoji: "😊", label: "Feliz" },
  { id: "energetica", emoji: "⚡", label: "Energética" },
  { id: "alegre", emoji: "😋", label: "Alegre" },
  { id: "mudancas-humor", emoji: "😢", label: "Mudanças de humor" },
  { id: "irritada", emoji: "😡", label: "Irritada" },
  { id: "triste", emoji: "☹️", label: "Triste" },
  { id: "ansiosa", emoji: "😰", label: "Ansiosa" },
  { id: "desanimada", emoji: "😞", label: "Desanimada" },
  { id: "culpada", emoji: "😔", label: "Culpada" },
  { id: "pensamentos-obsessivos", emoji: "💭", label: "Pensamentos obsessivos" },
  { id: "pouca-energia", emoji: "🔋", label: "Pouca energia" },
  { id: "apatica", emoji: "😑", label: "Apática" },
  { id: "confusa", emoji: "😕", label: "Confusa" },
  { id: "autocritica", emoji: "😫", label: "Muito autocrítica" },
] as const;

export interface AnamneseSubmitPayload extends AnamneseFormData {
  localData: string;
}
