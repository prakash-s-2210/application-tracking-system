import { Input, InputNumber, message } from "antd";
import {
  DateType,
  DropdownType,
  FileUploadType,
  MultipleChoiceType,
  NumberType,
  ParagraphType,
  ShortAnswerType,
  VideoType,
  YesNoType,
} from "../../../types";
import { useState } from "react";
const generateUniqueId = require("generate-unique-id");

type ShortAnswerProps = {
  question?: ShortAnswerType
  mode: string;
  deleteQuestion?: (
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
  ) => void;
  createOrUpdateQuestions: (
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
  ) => void;
  category: string;
  setIsOpenQuestion: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShortAnswer = ({
  question,
  mode,
  deleteQuestion,
  createOrUpdateQuestions,
  category,
  setIsOpenQuestion,
}: ShortAnswerProps) => {
  const [shortAnswer, setShortAnswer] = useState<ShortAnswerType>({
    id: question?.id ?? "",
    type: "ShortAnswer",
    question: question?.question ?? "",
    charactersLimit: question?.charactersLimit ?? 1000,
  });

  const handleSave = () => {
    if (!shortAnswer.question || !shortAnswer.charactersLimit) {
      message.error("Please fill in all fields before saving.");
      return;
    }
    if (mode === "create") {
      createOrUpdateQuestions(category, {
        ...shortAnswer,
        id: generateUniqueId(),
      });
    };
    if(mode === "edit"){
      createOrUpdateQuestions(category, shortAnswer);
    }
    setIsOpenQuestion(false);
  };

  return (
    <div className="flex-column" style={{ gap: "10px", paddingTop: "30px" , alignItems: "stretch" }}>
      <label htmlFor="short-answer" className="question-layout-heading">
        Question
      </label>

      <Input
        value={shortAnswer.question}
        onChange={(e) => {
          setShortAnswer({
            ...shortAnswer,
            question: e.target.value,
          });
        }}
        name="short-answer"
        placeholder="Type here"
        required
        size="large"
        style={{ borderColor: "black" }}
      />

      <div className="flex-column" style={{ gap: "10px", alignItems: "stretch" }}>
        <label htmlFor="limit" className="question-layout-heading">
          Characters Limit
        </label>

        <InputNumber
          name="limit"
          placeholder="Type here"
          value={shortAnswer.charactersLimit}
          onChange={(value) => {
            setShortAnswer({
              ...shortAnswer,
              charactersLimit: value as number,
            });
          }}
          min={50}
          max={2000}
          required
          size="large"
          style={{ width: "100%", borderColor: "black" }}
        />
      </div>

      <div className="flex-between" style={{paddingTop: "20px"}}> 
        <div
          className="flex-between"
          onClick={() => {
            if (mode === "edit") {
              if (deleteQuestion) {
                deleteQuestion(category, shortAnswer);
              }
            }
            setIsOpenQuestion(false);
          }}
          style={{ cursor: "pointer", gap: "10px" }}
        >
          <img
            src="/assets/icons/close.svg"
            alt="close"
            width={24}
            height={24}
          />

          <p className="delete">Delete question</p>
        </div>

        <button type="button" onClick={handleSave} className="save">
          Save
        </button>
      </div>
    </div>
  );
};

export default ShortAnswer;
