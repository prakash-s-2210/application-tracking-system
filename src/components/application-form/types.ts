export interface ApplicationForm {
  coverImage: string;
  personalInformation: {
    firstName: {
      internalUse: boolean;
      show: boolean;
    };
    lastName: {
      internalUse: boolean;
      show: boolean;
    };
    emailId: {
      internalUse: boolean;
      show: boolean;
    };
    phoneNumber: {
      internalUse: boolean;
      show: boolean;
    };
    nationality: {
      internalUse: boolean;
      show: boolean;
    };
    currentResidence: {
      internalUse: boolean;
      show: boolean;
    };
    idNumber: {
      internalUse: boolean;
      show: boolean;
    };
    dateOfBirth: {
      internalUse: boolean;
      show: boolean;
    };
    gender: {
      internalUse: boolean;
      show: boolean;
    };
    personalQuestions: (ParagraphType | ShortAnswerType | YesNoType | DropdownType | MultipleChoiceType | DateType | NumberType | FileUploadType | VideoType)[] | []; 
  };
  profile: {
    education: {
      mandatory: boolean;
      show: boolean;
    };
    experience: {
      mandatory: boolean;
      show: boolean;
    };
    resume: {
      mandatory: boolean;
      show: boolean;
    };
    profileQuestions: (ParagraphType | ShortAnswerType | YesNoType | DropdownType | MultipleChoiceType | DateType | NumberType | FileUploadType | VideoType)[] | [];
  };
  customisedQuestions: (ParagraphType | ShortAnswerType | YesNoType | DropdownType | MultipleChoiceType | DateType | NumberType | FileUploadType | VideoType)[] | []; 
}

export interface ParagraphType {
    id: string;
    type: string;
    question: string;
}

export interface ShortAnswerType {
    id: string;
    type: string;
    question: string;
    charactersLimit: number;
}

export interface YesNoType {
    id: string;
    type: string;
    question: string;
    disqualify: boolean;
}

export interface DropdownType {
    id: string;
    type: string;
    question: string;
    choices: string[];
    other: boolean;
}

export interface MultipleChoiceType {
    id: string;
    type: string;
    question: string;
    choices: string[];
    other: boolean;
    maxChoice: number
}

export interface DateType {
    id: string;
    type: string;
    question: string;
    allow: boolean;
}
export interface NumberType {
    id: string;
    type: string;
    question: string;
    minNumber: number;
    maxNumber: number;
}
export interface FileUploadType {
    id: string;
    type: string;
    question: string;
    maxSize: number;
}

export interface VideoType {
    id: string;
    type: string;
    question: string;
    description: string;
    maxDuration: number;
    secOrMin: string;
}

