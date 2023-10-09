import { InputNumber, Input, message } from "antd";
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

type NumberProps = {
  question?: NumberType;
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

const Number = ({
  question,
  mode,
  deleteQuestion,
  createOrUpdateQuestions,
  category,
  setIsOpenQuestion,
}: NumberProps) => {
  const [number, setNumber] = useState<NumberType>({
    id: question?.id ?? "",
    type: "Number",
    question: question?.question ?? "",
    minNumber: question?.minNumber ?? 0,
    maxNumber: question?.maxNumber ?? 10,
  });

  const handleSave = () => {
    if (!number.question || (!number.minNumber && number.minNumber < 0) || !number.maxNumber) {
      message.error("Please fill in all fields before saving.");
      return;
    }

    if(number.minNumber > number.maxNumber){
      message.error("Minimum number should be less than maximum number")
      return;
    }

    if (mode === "create") {
      createOrUpdateQuestions(category, {
        ...number,
        id: generateUniqueId(),
      });
    };
    if(mode === "edit"){
      createOrUpdateQuestions(category, number);
    }
    setIsOpenQuestion(false);
  };

  return (
    <div className="flex-column" style={{ gap: "10px", paddingTop: "30px", alignItems: "stretch" }}>
      <label htmlFor="number" className="question-layout-heading">
        Question
      </label>

      <Input
        value={number.question}
        onChange={(e) => {
          setNumber({
            ...number,
            question: e.target.value,
          });
        }}
        name="number"
        placeholder="Type here"
        required
        size="large"
        style={{ borderColor: "black" }}
      />

      <div className="flex-column" style={{ gap: "10px", alignItems: "stretch" }}>
        <label htmlFor="minimum-number" className="question-layout-heading">
          Minimum Number
        </label>

        <InputNumber
          value={number.minNumber}
          onChange={(value) => {
            setNumber({
              ...number,
              minNumber: value as number,
            });
          }}
          name="minimum-number"
          placeholder="Type here"
          min={0}
          required
          size="large"
          style={{ width: "100%", borderColor: "black" }}
        />

        <label htmlFor="maximum-number" className="question-layout-heading">
          Maximum Number
        </label>

        <InputNumber
          value={number.maxNumber}
          onChange={(value) => {
            setNumber({
              ...number,
              maxNumber: value as number,
            });
          }}
          name="maximum-number"
          placeholder="Type here"
          min={0}
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
                deleteQuestion(category, number);
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

export default Number;
