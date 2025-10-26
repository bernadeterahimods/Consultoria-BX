
import {
  HeartIcon,
  AcademicCapIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  HomeModernIcon,
  BriefcaseIcon,
  UsersIcon,
  ChartBarIcon,
  BuildingOffice2Icon,
  ExclamationTriangleIcon,
  ScaleIcon,
  MapIcon,
  CloudIcon
} from '@heroicons/react/24/outline';
import { CavalcanteData } from '../types';

// NOTA: Estes dados são fictícios e baseados em estimativas para fins de demonstração.
// Fontes reais incluem IBGE Cidades, DataSUS, Tesouro Transparente, etc.

export const cavalcanteData: CavalcanteData = {
  health: [
    { title: "Unidades Básicas de Saúde (UBS)", value: "5", icon: BuildingOffice2Icon, description: "Número de postos de saúde na cidade e zona rural." },
    { title: "Cobertura da Estratégia Saúde da Família", value: "85%", icon: UsersIcon, description: "Percentual da população coberta por equipes de saúde da família." },
    { title: "Leitos Hospitalares (por 1.000 hab.)", value: "1.2", icon: HeartIcon, description: "Indicador de capacidade hospitalar local." },
    { title: "Taxa de Mortalidade Infantil", value: "12.5 por 1.000", icon: ExclamationTriangleIcon, description: "Óbitos de crianças menores de um ano por mil nascidos vivos." },
  ],
  education: [
    { title: "Ideb - Anos Iniciais (Rede Pública)", value: "4.9", icon: ChartBarIcon, description: "Índice de Desenvolvimento da Educação Básica (meta: 5.5)." },
    { title: "Ideb - Anos Finais (Rede Pública)", value: "4.2", icon: ChartBarIcon, description: "Índice de Desenvolvimento da Educação Básica (meta: 5.0)." },
    { title: "Escolas com Internet Banda Larga", value: "78%", icon: CloudIcon, description: "Percentual de escolas públicas com acesso à internet de alta velocidade." },
    { title: "Taxa de Analfabetismo (15+ anos)", value: "18%", icon: AcademicCapIcon, description: "Percentual da população acima de 15 anos que não sabe ler ou escrever." },
  ],
  qualityOfLife: [
    { title: "IDH Municipal (IDHM)", value: "0.615 (Médio)", icon: SparklesIcon, description: "Índice de Desenvolvimento Humano Municipal, considera renda, longevidade e educação." },
    { title: "População Estimada (2023)", value: "9.780 hab.", icon: UsersIcon, description: "Fonte: IBGE." },
    { title: "Área de Urbanização Adequada", value: "65%", icon: MapIcon, description: "Percentual de área urbana com infraestrutura como calçadas e iluminação." },
  ],
  economy: [
    { title: "Renda Per Capita Mensal", value: "R$ 850,00", icon: CurrencyDollarIcon, description: "Valor médio do rendimento domiciliar por pessoa." },
    { title: "Principal Segmento Econômico", value: "Turismo e Serviços", icon: BriefcaseIcon, description: "Setor que mais gera empregos e movimenta a economia local." },
    { title: "Maiores Empregadores", value: "Prefeitura Municipal, Comércio local, Pousadas/Hotéis", icon: BuildingOffice2Icon, description: "Principais fontes de emprego formal na cidade." },
    { title: "PIB per capita (2021)", value: "R$ 15.200,45", icon: ChartBarIcon, description: "Produto Interno Bruto dividido pela população. Fonte: IBGE." },
  ],
  publicSafety: [
    { title: "Taxa de Homicídios (por 100 mil hab.)", value: "15.8", icon: ShieldCheckIcon, description: "Número de homicídios em relação à população." },
    { title: "Registros de Violência Doméstica (Ano)", value: "45 casos", icon: ExclamationTriangleIcon, description: "Ocorrências registradas oficialmente pela polícia (Lei Maria da Penha)." },
    { title: "Efetivo Policial (por 1.000 hab.)", value: "1.5", icon: UsersIcon, description: "Número de policiais em relação à população." },
  ],
  sanitation: [
    { title: "Acesso à Água Potável", value: "92%", icon: HomeModernIcon, description: "Domicílios com acesso à rede geral de abastecimento de água." },
    { title: "Coleta de Esgoto", value: "35%", icon: ScaleIcon, description: "Domicílios atendidos pela rede de coleta de esgoto." },
    { title: "Coleta de Lixo Doméstico", value: "98%", icon: HomeModernIcon, description: "Percentual de domicílios com serviço de coleta de resíduos." },
  ],
};
