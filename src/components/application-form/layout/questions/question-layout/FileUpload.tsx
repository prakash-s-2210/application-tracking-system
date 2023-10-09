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

type FileUploadProps = {
  question?: FileUploadType;
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

const FileUpload = ({
  question,
  mode,
  deleteQuestion,
  createOrUpdateQuestions,
  category,
  setIsOpenQuestion,
}: FileUploadProps) => {
  const [fileUpload, setFileUpload] = useState<FileUploadType>({
    id: question?.id ?? "",
    type: "FileUpload",
    question: question?.question ?? "",
    maxSize: question?.maxSize ?? 2,
  });

  const handleSave = () => {
    if (!fileUpload.question || !fileUpload.maxSize) {
      message.error("Please fill in all fields before saving.");
      return;
    }

    if (mode === "create") {
      createOrUpdateQuestions(category, {
        ...fileUpload,
        id: generateUniqueId(),
      });
    };
    if(mode === "edit"){
      createOrUpdateQuestions(category, fileUpload);
    }
    setIsOpenQuestion(false);
  };

  return (
    <div
      className="flex-column"
      style={{ gap: "10px", paddingTop: "30px", alignItems: "stretch" }}
    >
      <label htmlFor="file-upload" className="question-layout-heading">
        Question
      </label>

      <Input
        value={fileUpload.question}
        onChange={(e) => {
          setFileUpload({
            ...fileUpload,
            question: e.target.value,
          });
        }}
        name="file-upload"
        placeholder="Type here"
        required
        size="large"
        style={{ borderColor: "black" }}
      />

      <div
        className="flex-column"
        style={{ gap: "10px", alignItems: "stretch" }}
      >
        <label htmlFor="limit" className="question-layout-heading">
          Maximum File Size (MB):
        </label>

        <InputNumber
          value={fileUpload.maxSize}
          onChange={(value) => {
            setFileUpload({
              ...fileUpload,
              maxSize: value as number,
            });
          }}
          name="limit"
          placeholder="Type here"
          min={0}
          max={1024}
          required
          size="large"
          style={{ width: "100%", borderColor: "black" }}
        />
      </div>

      <div className="flex-between" style={{ paddingTop: "20px" }}>
        <div
          className="flex-between"
          onClick={() => {
            if (mode === "edit") {
              if (deleteQuestion) {
                deleteQuestion(category, fileUpload);
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

export default FileUpload;
