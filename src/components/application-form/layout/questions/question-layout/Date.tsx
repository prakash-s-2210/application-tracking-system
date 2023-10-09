import { Checkbox, Input, message } from "antd";
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

type DateProps = {
  question?: DateType;
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

const Date = ({
  question,
  mode,
  deleteQuestion,
  createOrUpdateQuestions,
  category,
  setIsOpenQuestion,
}: DateProps) => {
  const [date, setDate] = useState<DateType>({
    id: question?.id ?? "",
    type: "Date",
    question: question?.question ?? "",
    allow: question?.allow ?? false,
  });

  const handleSave = () => {
    if (!date.question) {
      message.error("Please fill in all fields before saving.");
      return;
    }
    if (mode === "create") {
      createOrUpdateQuestions(category, {
        ...date,
        id: generateUniqueId(),
      });
    };
    if(mode === "edit"){
      createOrUpdateQuestions(category, date);
    }
    setIsOpenQuestion(false);
  };

  return (
    <div
      className="flex-column"
      style={{ gap: "10px", paddingTop: "30px", alignItems: "stretch" }}
    >
      <label htmlFor="date" className="question-layout-heading">
        Question
      </label>

      <Input
        value={date.question}
        onChange={(e) => {
          setDate({
            ...date,
            question: e.target.value,
          });
        }}
        name="date"
        placeholder="Type here"
        required
        size="large"
        style={{ borderColor: "black" }}
      />

      <Checkbox
        defaultChecked={question?.allow}
        value={date.allow}
        onChange={(e) => {
          setDate({
            ...date,
            allow: e.target.checked,
          });
        }}
        className="check"
        style={{ paddingLeft: "16px" }}
      >
        Allow only future date
      </Checkbox>

      <div className="flex-between" style={{ paddingTop: "20px" }}>
        <div
          className="flex-between"
          onClick={() => {
            if (mode === "edit") {
              if (deleteQuestion) {
                deleteQuestion(category, date);
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

export default Date;
