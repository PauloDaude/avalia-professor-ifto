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
  average_rating1: number;
  average_rating2: number;
  average_rating3: number;
  average_rating4: number;
  average_rating5: number;
  average_rating6: number;
  average_ratingF: number;
}

export interface IProfessorNotes {
  id_professor: number;
  professor: string;
  average_by_subject: IAverageNotes[];
  average_of_averages: number;
}

export interface IResponseClasses {
  idProfessor: number;
  classesNames: string[];
  nameProfessor?: string;
}

interface IResponseFinalClasses {
  name: string;
  averageFinal: number;
}
export interface IResponseFinalResults {
  idProfessor: number;
  classesNames: IResponseFinalClasses[];
  averageGeneral: number;
}

export interface INote {
  [key: number]: number;
}
