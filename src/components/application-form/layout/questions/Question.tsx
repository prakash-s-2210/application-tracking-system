import {
  ApplicationForm,
  DateType,
  DropdownType,
  FileUploadType,
  MultipleChoiceType,
  NumberType,
  ParagraphType,
  ShortAnswerType,
  VideoType,
  YesNoType,
} from "../../types";
import { useState } from "react";
import Paragraph from "./question-layout/Paragraph";
import ShortAnswer from "./question-layout/ShortAnswer";
import YesNo from "./question-layout/YesNo";
import Dropdown from "./question-layout/Dropdown";
import MultipleChoice from "./question-layout/MultipleChoice";
import Date from "./question-layout/Date";
import Number from "./question-layout/Number";
import FileUpload from "./question-layout/FileUpload";
import VideoQuestion from "./question-layout/VideoQuestion";

interface QuestionProps {
  category: string;
  question:
    | DateType
    | DropdownType
    | FileUploadType
    | MultipleChoiceType
    | NumberType
    | ParagraphType
    | ShortAnswerType
    | VideoType
    | YesNoType;
  formData: ApplicationForm;
  updateFormData: (value: ApplicationForm) => void;
}

const Question = ({
  category,
  question,
  formData,
  updateFormData,
}: QuestionProps) => {
  const [isOpenQuestion, setIsOpenQuestion] = useState<boolean>(false);

  const createOrUpdateQuestions = (
    questionType: string,
    question:
      | ParagraphType
      | ShortAnswerType
      | YesNoType
      | DropdownType
      | MultipleChoiceType
      | DateType
      | NumberType
      | FileUploadType
      | VideoType
  ) => {
    const updatedFormData: ApplicationForm = {
      ...formData,
    };
    if (questionType === "personalQuestions") {
      const indexToUpdate =
        updatedFormData.personalInformation.personalQuestions.findIndex(
          (obj) => obj.id === question.id
        );

      if (indexToUpdate !== -1) {
        updatedFormData.personalInformation.personalQuestions[indexToUpdate] =
          question;
      }
    } else if (questionType === "profileQuestions") {
      const indexToUpdate = updatedFormData.profile.profileQuestions.findIndex(
        (obj) => obj.id === question.id
      );

      if (indexToUpdate !== -1) {
        updatedFormData.profile.profileQuestions[indexToUpdate] = question;
      }
    } else {
      const indexToUpdate = updatedFormData.customisedQuestions.findIndex(
        (obj) => obj.id === question.id
      );

      if (indexToUpdate !== -1) {
        updatedFormData.customisedQuestions[indexToUpdate] = question;
      }
    }
    updateFormData(updatedFormData);
  };

  const deleteQuestion = (
    category: string,
    question:
      | ParagraphType
      | ShortAnswerType
      | YesNoType
      | DropdownType
      | MultipleChoiceType
      | DateType
      | NumberType
      | FileUploadType
      | VideoType
  ) => {
    const updatedFormData: ApplicationForm = {
      ...formData,
    };

    if (category === "personalQuestions") {
      updatedFormData.personalInformation.personalQuestions =
        updatedFormData.personalInformation.personalQuestions.filter(
          (item) => item.id !== question.id
        );
    } else if (category === "profileQuestions") {
      updatedFormData.profile.profileQuestions =
        updatedFormData.profile.profileQuestions.filter(
          (item) => item.id !== question.id
        );
    } else {
      updatedFormData.customisedQuestions =
        updatedFormData.customisedQuestions.filter(
          (item) => item.id !== question.id
        );
    }

    updateFormData(updatedFormData);
  };

  return (
    <>
      <div className="question">
        <p className="heading">
          {(question.type === "YesNo" && "Yes/No questions") ||
            (question.type === "Video" &&
              `${(question as VideoType).maxDuration} ${
                (question as VideoType).secOrMin
              }`) ||
            question.type}
        </p>

        <div>
          <p>{question.question}</p>

          <img
            src="/assets/icons/pen.svg"
            alt="pen"
            width={18}
            height={17}
            style={{ cursor: "pointer" }}
            onClick={() => setIsOpenQuestion(true)}
          />
        </div>

        {isOpenQuestion &&
          ((question.type === "Paragraph" && (
            <Paragraph
              question={question}
              mode="edit"
              deleteQuestion={deleteQuestion}
              createOrUpdateQuestions={createOrUpdateQuestions}
              category={category}
              setIsOpenQuestion={setIsOpenQuestion}
            />
          )) ||
            (question.type === "ShortAnswer" && (
              <ShortAnswer
                question={question as ShortAnswerType}
                mode="edit"
                deleteQuestion={deleteQuestion}
                createOrUpdateQuestions={createOrUpdateQuestions}
                category={category}
                setIsOpenQuestion={setIsOpenQuestion}
              />
            )) ||
            (question.type === "YesNo" && (
              <YesNo
                question={question as YesNoType}
                mode="edit"
                deleteQuestion={deleteQuestion}
                createOrUpdateQuestions={createOrUpdateQuestions}
                category={category}
                setIsOpenQuestion={setIsOpenQuestion}
              />
            )) ||
            (question.type === "Dropdown" && (
              <Dropdown
                question={question as DropdownType}
                mode="edit"
                deleteQuestion={deleteQuestion}
                createOrUpdateQuestions={createOrUpdateQuestions}
                category={category}
                setIsOpenQuestion={setIsOpenQuestion}
              />
            )) ||
            (question.type === "MultipleChoice" && (
              <MultipleChoice
                question={question as MultipleChoiceType}
                mode="edit"
                deleteQuestion={deleteQuestion}
                createOrUpdateQuestions={createOrUpdateQuestions}
                category={category}
                setIsOpenQuestion={setIsOpenQuestion}
              />
            )) ||
            (question.type === "Date" && (
              <Date
                question={question as DateType}
                mode="edit"
                deleteQuestion={deleteQuestion}
                createOrUpdateQuestions={createOrUpdateQuestions}
                category={category}
                setIsOpenQuestion={setIsOpenQuestion}
              />
            )) ||
            (question.type === "Number" && (
              <Number
                question={question as NumberType}
                mode="edit"
                deleteQuestion={deleteQuestion}
                createOrUpdateQuestions={createOrUpdateQuestions}
                category={category}
                setIsOpenQuestion={setIsOpenQuestion}
              />
            )) ||
            (question.type === "FileUpload" && (
              <FileUpload
                question={question as FileUploadType}
                mode="edit"
                deleteQuestion={deleteQuestion}
                createOrUpdateQuestions={createOrUpdateQuestions}
                category={category}
                setIsOpenQuestion={setIsOpenQuestion}
              />
            )) ||
            (question.type === "Video" && (
              <VideoQuestion
                question={question as VideoType}
                mode="edit"
                deleteQuestion={deleteQuestion}
                createOrUpdateQuestions={createOrUpdateQuestions}
                category={category}
                setIsOpenQuestion={setIsOpenQuestion}
              />
            )))}
      </div>
    </>
  );
};

export default Question;
