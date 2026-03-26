import { createEntityId, loadCollection, saveCollection } from "./crudStorage";

export type ProfessionalStatus = "ativo" | "ferias";

export type Professional = {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  shiftStart: string;
  shiftEnd: string;
  status: ProfessionalStatus;
};

export type ProfessionalFormData = {
  name: string;
  email: string;
  phone: string;
  specialty: string;
  shiftStart: string;
  shiftEnd: string;
  status: ProfessionalStatus;
};

export type ProfessionalFormErrors = Partial<Record<keyof ProfessionalFormData, string>>;

export const PROFESSIONALS_STORAGE_KEY = "horarius:profissionais";

const initialProfessionals: Professional[] = [
  {
    id: 1,
    name: "João",
    email: "joao@horarius.com",
    phone: "11998887766",
    specialty: "Corte e barba",
    shiftStart: "09:00",
    shiftEnd: "18:00",
    status: "ativo",
  },
  {
    id: 2,
    name: "Maria",
    email: "maria@horarius.com",
    phone: "11995554433",
    specialty: "Coloração",
    shiftStart: "10:00",
    shiftEnd: "19:00",
    status: "ativo",
  },
  {
    id: 3,
    name: "Rafael",
    email: "rafael@horarius.com",
    phone: "11997773322",
    specialty: "Pigmentação",
    shiftStart: "08:00",
    shiftEnd: "17:00",
    status: "ferias",
  },
];

export function loadProfessionals() {
  return loadCollection(PROFESSIONALS_STORAGE_KEY, initialProfessionals);
}

export function getProfessionalById(professionalId: number) {
  return loadProfessionals().find((professional) => professional.id === professionalId) ?? null;
}

export function createProfessional(formData: ProfessionalFormData) {
  const nextProfessional: Professional = {
    id: createEntityId(),
    name: formData.name.trim(),
    email: formData.email.trim().toLowerCase(),
    phone: formData.phone.trim(),
    specialty: formData.specialty.trim(),
    shiftStart: formData.shiftStart,
    shiftEnd: formData.shiftEnd,
    status: formData.status,
  };

  saveCollection(PROFESSIONALS_STORAGE_KEY, [nextProfessional, ...loadProfessionals()]);
}

export function updateProfessional(professionalId: number, formData: ProfessionalFormData) {
  const nextProfessionals = loadProfessionals().map((professional) =>
    professional.id === professionalId
      ? {
          ...professional,
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          specialty: formData.specialty.trim(),
          shiftStart: formData.shiftStart,
          shiftEnd: formData.shiftEnd,
          status: formData.status,
        }
      : professional,
  );

  saveCollection(PROFESSIONALS_STORAGE_KEY, nextProfessionals);
}

export function deleteProfessional(professionalId: number) {
  saveCollection(
    PROFESSIONALS_STORAGE_KEY,
    loadProfessionals().filter((professional) => professional.id !== professionalId),
  );
}

export function validateProfessionalForm(formData: ProfessionalFormData) {
  const errors: ProfessionalFormErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formData.name.trim()) {
    errors.name = "Informe o nome do profissional.";
  }

  if (!formData.email.trim()) {
    errors.email = "Informe o e-mail.";
  } else if (!emailPattern.test(formData.email.trim())) {
    errors.email = "Digite um e-mail válido.";
  }

  if (formData.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Digite um telefone válido com DDD.";
  }

  if (!formData.specialty.trim()) {
    errors.specialty = "Informe a especialidade principal.";
  }

  if (!formData.shiftStart) {
    errors.shiftStart = "Informe o início do turno.";
  }

  if (!formData.shiftEnd) {
    errors.shiftEnd = "Informe o fim do turno.";
  }

  return errors;
}
