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

type YesNoProps = {
  question?: YesNoType
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

const YesNo = ({
  question,
  mode,
  deleteQuestion,
  createOrUpdateQuestions,
  category,
  setIsOpenQuestion,
}: YesNoProps) => {
  const [yesNo, setYesNo] = useState<YesNoType>({
    id: question?.id ?? "",
    type: "YesNo",
    question: question?.question ?? "",
    disqualify: question?.disqualify ?? false,
  });

  const handleSave = () => {
    if (!yesNo.question) {
      message.error("Please fill in all fields before saving.");
      return;
    }
    if (mode === "create") {
      createOrUpdateQuestions(category, {
        ...yesNo,
        id: generateUniqueId(),
      });
    };
    if(mode === "edit"){
      createOrUpdateQuestions(category, yesNo);
    }
    setIsOpenQuestion(false);
  };

  return (
    <div className="flex-column" style={{ gap: "10px", paddingTop: "30px", alignItems: "stretch" }}>
      <label htmlFor="yes-no" className="question-layout-heading">
        Question
      </label>

      <Input
        value={yesNo.question}
        onChange={(e) => {
          setYesNo({
            ...yesNo,
            question: e.target.value,
          });
        }}
        name="yes-no"
        placeholder="Type here"
        required
        size="large"
        style={{ borderColor: "black" }}
      />

      <Checkbox
      defaultChecked = {yesNo.disqualify}
        value={yesNo.disqualify}
        onChange={(e) => {
          setYesNo({
            ...yesNo,
            disqualify: e.target.checked,
          });
        }}
        className="check"
        style={{ paddingLeft: "16px" }}
      >
        Disqualify candidate if the answer is no
      </Checkbox>

      <div className="flex-between" style={{paddingTop: "20px"}}>
        <div
          className="flex-between"
          onClick={() => {
            if (mode === "edit") {
              if (deleteQuestion) {
                deleteQuestion(category, yesNo);
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

export default YesNo;
