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

type DropdownProps = {
  question?: DropdownType
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

const Dropdown = ({
  question,
  mode,
  deleteQuestion,
  createOrUpdateQuestions,
  category,
  setIsOpenQuestion,
}: DropdownProps) => {
  const [inputData, setInputData] = useState<string>("");
  const [dropdown, setDropdown] = useState<DropdownType>({
    id: question?.id ?? "",
    type: "Dropdown",
    question: question?.question ?? "",
    choices: question?.choices ?? [],
    other: question?.other ?? false
  });

  const handleAddList = () => {
    if (inputData === "") return;
    setDropdown({
      ...dropdown,
      choices: [...dropdown.choices, inputData],
    });
    setInputData("");
  };

  const handleSave = () => {
    if (!dropdown.question || dropdown.choices.length === 0) {
      message.error("Please fill in all fields before saving.");
      return;
    }
    if (mode === "create") {
      createOrUpdateQuestions(category, {
        ...dropdown,
        id: generateUniqueId(),
      });
    };
    if(mode === "edit"){
      createOrUpdateQuestions(category, dropdown);
    }
    setIsOpenQuestion(false);
  };


  return (
    <div className="flex-column" style={{ gap: "10px", paddingTop: "30px", alignItems: "stretch" }}>
      <label htmlFor="dropdown" className="question-layout-heading">
        Question
      </label>

      <Input
        value={dropdown.question}
        onChange={(e) => {
          setDropdown({
            ...dropdown,
            question: e.target.value,
          });
        }}
        name="dropdown"
        placeholder="Type here"
        required
        size="large"
        style={{ borderColor: "black" }}
      />

      <div className="flex-column" style={{ gap: "10px", alignItems: "stretch" }}>
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
          defaultChecked={dropdown.other}
          value={dropdown.other}
          onChange={(e) => {
            setDropdown({
              ...dropdown,
              other: e.target.checked,
            });
          }}
          className="check"
          style={{ paddingLeft: "16px" }}
        >
          Enable "Other" option
        </Checkbox>

        {dropdown.choices.length > 0 &&
          dropdown.choices.map((item, index) => (
            <ul key={item + index}>
              <li>{item}</li>
            </ul>
          ))}
      </div>

      <div className="flex-between" style={{paddingTop: "20px"}}>
        <div
          className="flex-between"
          onClick={() => {
            if (mode === "edit") {
              if (deleteQuestion) {
                deleteQuestion(category, dropdown);
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

export default Dropdown;
