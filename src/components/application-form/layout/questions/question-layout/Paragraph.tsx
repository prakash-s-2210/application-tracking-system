import { Input, message } from "antd";
import { useState } from "react";
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
const generateUniqueId = require("generate-unique-id");

type ParagraphProps = {
  question?: ParagraphType;
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

const Paragraph = ({
  question,
  mode,
  deleteQuestion,
  createOrUpdateQuestions,
  category,
  setIsOpenQuestion,
}: ParagraphProps) => {
  const [paragraphQuestion, setParagraphQuestion] = useState<ParagraphType>({
    id: question?.id ?? "",
    type: "Paragraph",
    question: question?.question ?? "",
  });

  const handleSave = () => {
    if (!paragraphQuestion.question) {
      message.error("Please fill input before saving.");
      return;
    }
    if (mode === "create") {
      createOrUpdateQuestions(category, {
        ...paragraphQuestion,
        id: generateUniqueId(),
      });
    };
    if(mode === "edit"){
      createOrUpdateQuestions(category, paragraphQuestion);
    }
    setIsOpenQuestion(false);
  };

  return (
    <div
      className="flex-column"
      style={{ gap: "10px", paddingTop: "30px", alignItems: "stretch" }}
    >
      <label htmlFor="paragraph" className="question-layout-heading">
        Question
      </label>

      <Input
        value={paragraphQuestion.question}
        onChange={(e) => {
          setParagraphQuestion({
            ...paragraphQuestion,
            question: e.target.value,
          });
        }}
        name="paragraph"
        placeholder="Type here"
        required
        size="large"
        style={{ borderColor: "black" }}
      />

      <div className="flex-between" style={{ paddingTop: "20px" }}>
        <div
          className="flex-between"
          onClick={() => {
            if (mode === "edit") {
              if (deleteQuestion) {
                deleteQuestion(category, paragraphQuestion);
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

        <button type="button" className="save" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Paragraph;
