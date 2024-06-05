export interface IClass {
  id: number;
  class: string;
  id_professor: number;
  professor: string;
}

export interface IQuestion {
  id: number;
  text: string;
}

export interface IFormData {
  IDMateria: number;
  IDProfessor: number;
  Nota1: number;
  Nota2: number;
  Nota3: number;
  Nota4: number;
  Nota5: number;
  Nota6: number;
}

export interface IAverageNotes {
  name: string;
  media_nota1: number;
  media_nota2: number;
  media_nota3: number;
  media_nota4: number;
  media_nota5: number;
  media_nota6: number;
  media_total: number;
}

export interface IProfessorNotes {
  id_professor: number;
  professor: string;
  media_por_materia: IAverageNotes;
  media_das_medias: number;
}

export interface INote {
  [key: number]: number;
}
