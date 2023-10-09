import { Checkbox, Input, InputNumber, message } from "antd";
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

type MultipleChoiceProps = {
  question?: MultipleChoiceType;
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

const MultipleChoice = ({
  question,
  mode,
  deleteQuestion,
  createOrUpdateQuestions,
  category,
  setIsOpenQuestion,
}: MultipleChoiceProps) => {
  const [inputData, setInputData] = useState<string>("");
  const [multipleChoice, setMultipleChoice] = useState<MultipleChoiceType>({
    id: question?.id ?? "",
    type: "MultipleChoice",
    question: question?.question ?? "",
    choices: question?.choices ?? ([] as string[]),
    other: question?.other ?? false,
    maxChoice: question?.maxChoice ?? 10,
  });

  const handleAddList = () => {
    if (inputData === "") return;
    setMultipleChoice({
      ...multipleChoice,
      choices: [...multipleChoice.choices, inputData],
    });
    setInputData("");
  };

  const handleSave = () => {
    if (!multipleChoice.question || multipleChoice.choices.length === 0) {
      message.error("Please fill in all fields before saving.");
      return;
    }
    if (mode === "create") {
      createOrUpdateQuestions(category, {
        ...multipleChoice,
        id: generateUniqueId(),
      });
    };
    if(mode === "edit"){
      createOrUpdateQuestions(category, multipleChoice);
    }
    setIsOpenQuestion(false);
  };

  return (
    <div
      className="flex-column"
      style={{ gap: "10px", paddingTop: "30px", alignItems: "stretch" }}
    >
      <label htmlFor="multiple-choice" className="question-layout-heading">
        Question
      </label>

      <Input
        value={multipleChoice.question}
        onChange={(e) => {
          setMultipleChoice({
            ...multipleChoice,
            question: e.target.value,
          });
        }}
        name="multiple-choice"
        placeholder="Type here"
        required
        size="large"
        style={{ borderColor: "black" }}
      />

      <div
        className="flex-column"
        style={{ gap: "10px", alignItems: "stretch" }}
      >
        <label
          htmlFor="choice"
          className="question-layout-heading"
          style={{ fontWeight: 500, color: "black", paddingLeft: "30px" }}
        >
          Choice
        </label>

        <div className="flex-between" style={{ gap: "10px" }}>
          <img
            src="/assets/icons/unorderedlist.svg"
            alt="unordered list"
            width={24}
            height={24}
          />

          <Input
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            name="choice"
            placeholder="Type here"
            size="large"
            style={{ borderColor: "#A0A0A0", flex: 1 }}
          />

          <img
            src="/assets/icons/plus.svg"
            alt="plus"
            width={14}
            height={14}
            onClick={handleAddList}
            style={{ cursor: "pointer" }}
          />
        </div>

        <Checkbox
          defaultChecked={multipleChoice.other}
          value={multipleChoice.other}
          onChange={(e) => {
            setMultipleChoice({
              ...multipleChoice,
              other: e.target.checked,
            });
          }}
          className="check"
          style={{ paddingLeft: "16px" }}
        >
          Enable "Other" option
        </Checkbox>

        {multipleChoice.choices.length > 0 &&
          multipleChoice.choices.map((item, index) => (
            <ul key={item + index}>
              <li>{item}</li>
            </ul>
          ))}
        <div
          className="flex-column"
          style={{ gap: "10px", alignItems: "stretch" }}
        >
          <label htmlFor="limit" className="question-layout-heading">
            Max choice allowed
          </label>

          <InputNumber
            name="limit"
            placeholder="Enter number of choice allowed here"
            value={multipleChoice.maxChoice}
            onChange={(value) => {
              setMultipleChoice({
                ...multipleChoice,
                maxChoice: value as number,
              });
            }}
            min={1}
            max={25}
            required
            size="large"
            style={{ width: "100%", borderColor: "black" }}
          />
        </div>
      </div>

      <div className="flex-between" style={{ paddingTop: "20px" }}>
        <div
          className="flex-between"
          onClick={() => {
            if (mode === "edit") {
              if (deleteQuestion) {
                deleteQuestion(category, multipleChoice);
              }
            }
            setIsOpenQuestion(false);
          }}
          style={{ cursor: "pointer" }}
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

export default MultipleChoice;
