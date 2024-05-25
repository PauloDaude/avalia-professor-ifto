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

export interface INote {
  [key: number]: number;
}
