export interface Application {
  id: string;
  vacancyId: string;
  vacancyTitle: string;
  companyName: string;
  applicantName: string;
  applicantEmail: string;
  status: 'Pendiente' | 'En Revisión' | 'Entrevista' | 'Aceptada' | 'Rechazada';
  appliedAt: string;
  vacancy?: {
    id: string;
    slug: string;
    title: string;
    companyName: string;
    location: string;
    modality: 'Remoto' | 'Híbrido' | 'Presencial';
    stipend: string;
    duration: string;
    category: string;
  };
}
