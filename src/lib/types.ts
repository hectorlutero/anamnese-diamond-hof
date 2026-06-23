export type YesNo = "sim" | "nao" | "";

export interface AnamneseFormData {
  // Identificação
  nome: string;
  idade: string;
  contato: string;
  endereco: string;

  // Histórico Geral
  tratamentoEsteticoAnterior: YesNo;
  tratamentoEsteticoAnteriorQual: string;
  antecedentesAlergicos: YesNo;
  antecedentesAlergicosQual: string;
  funcionamentoIntestinal: YesNo;
  funcionamentoIntestinalQual: string;
  praticaEsportes: YesNo;
  praticaEsportesQual: string;
  fumanteHistorico: YesNo;
  fumanteHistoricoQual: string;
  alimentacaoBalanceada: YesNo;
  alimentacaoBalanceadaQual: string;
  tratamentoMedico: YesNo;
  tratamentoMedicoQual: string;
  usaMedicamento: YesNo;
  usaMedicamentoQual: string;
  usaAcidos: YesNo;
  usaAcidosQual: string;
  gestanteHistorico: YesNo;
  gestanteHistoricoQual: string;
  marcapasso: YesNo;
  marcapassoQual: string;

  // Histórico Geral (cont.)
  protesesMetalicas: YesNo;
  protesesMetalicasQual: string;
  problemasCardiacos: YesNo;
  problemasCardiacosQual: string;
  epilepsia: YesNo;
  epilepsiaQual: string;
  antecedentesOncologicos: YesNo;
  antecedentesOncologicosQual: string;
  cicloMenstrual: YesNo;
  cicloMenstrualQual: string;
  metodoAnticoncepcional: YesNo;
  metodoAnticoncepcionalQual: string;
  cuidadosDiarios: YesNo;
  cuidadosDiariosQual: string;
  diabetesHistorico: YesNo;
  diabetesHistoricoQual: string;
  protesesDentarias: YesNo;
  protesesDentariasQual: string;
  tomaSol: YesNo;
  tomaSolQual: string;

  // Histórico Clínico
  condicoesClinicas: string[];
  cirurgia: string;
  alergia: string;
  medicamentoAtual: string;
  gestanteClinico: YesNo;

  // Hábitos de Vida
  aguaDiaria: string;
  fumanteHabitos: string;
  alimentacaoHabitos: string[];
  intestino: string;
  qualidadeSono: string;

  // Diagnose Facial
  produtosUso: string[];
  procedimentoFacial: YesNo;
  alergiaCosmetico: YesNo;
  bemEstar: string[];

  // Anamnese Complementar
  medicamentosControlados: string;
  tratamentoMedicoAtual: string;
  tratamentoEsteticoAtual: string;
  atividadeFisica: string;
  alergiasComplementar: string;
  anticoagulantes: string;
  problemasRespiratorios: string;
  diabetesComplementar: YesNo;
  gestanteLactante: YesNo;
  hepatiteQueloide: YesNo;
  fumanteComplementar: YesNo;
  queixaPrincipal: string;

  // Termo
  cpf: string;
  localData: string;
  aceiteTermo: boolean;
}

export const initialFormData: AnamneseFormData = {
  nome: "",
  idade: "",
  contato: "",
  endereco: "",
  tratamentoEsteticoAnterior: "",
  tratamentoEsteticoAnteriorQual: "",
  antecedentesAlergicos: "",
  antecedentesAlergicosQual: "",
  funcionamentoIntestinal: "",
  funcionamentoIntestinalQual: "",
  praticaEsportes: "",
  praticaEsportesQual: "",
  fumanteHistorico: "",
  fumanteHistoricoQual: "",
  alimentacaoBalanceada: "",
  alimentacaoBalanceadaQual: "",
  tratamentoMedico: "",
  tratamentoMedicoQual: "",
  usaMedicamento: "",
  usaMedicamentoQual: "",
  usaAcidos: "",
  usaAcidosQual: "",
  gestanteHistorico: "",
  gestanteHistoricoQual: "",
  marcapasso: "",
  marcapassoQual: "",
  protesesMetalicas: "",
  protesesMetalicasQual: "",
  problemasCardiacos: "",
  problemasCardiacosQual: "",
  epilepsia: "",
  epilepsiaQual: "",
  antecedentesOncologicos: "",
  antecedentesOncologicosQual: "",
  cicloMenstrual: "",
  cicloMenstrualQual: "",
  metodoAnticoncepcional: "",
  metodoAnticoncepcionalQual: "",
  cuidadosDiarios: "",
  cuidadosDiariosQual: "",
  diabetesHistorico: "",
  diabetesHistoricoQual: "",
  protesesDentarias: "",
  protesesDentariasQual: "",
  tomaSol: "",
  tomaSolQual: "",
  condicoesClinicas: [],
  cirurgia: "",
  alergia: "",
  medicamentoAtual: "",
  gestanteClinico: "",
  aguaDiaria: "",
  fumanteHabitos: "",
  alimentacaoHabitos: [],
  intestino: "",
  qualidadeSono: "",
  produtosUso: [],
  procedimentoFacial: "",
  alergiaCosmetico: "",
  bemEstar: [],
  medicamentosControlados: "",
  tratamentoMedicoAtual: "",
  tratamentoEsteticoAtual: "",
  atividadeFisica: "",
  alergiasComplementar: "",
  anticoagulantes: "",
  problemasRespiratorios: "",
  diabetesComplementar: "",
  gestanteLactante: "",
  hepatiteQueloide: "",
  fumanteComplementar: "",
  queixaPrincipal: "",
  cpf: "",
  localData: "",
  aceiteTermo: false,
};
