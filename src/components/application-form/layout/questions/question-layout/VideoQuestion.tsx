import { Input, Select, InputNumber, message } from "antd";
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
import TextArea from "antd/es/input/TextArea";
const generateUniqueId = require("generate-unique-id");

type VideoQuestionProps = {
  question?: VideoType;
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

const VideoQuestion = ({
  question,
  mode,
  deleteQuestion,
  createOrUpdateQuestions,
  category,
  setIsOpenQuestion,
}: VideoQuestionProps) => {
  const [video, setVideo] = useState<VideoType>({
    id: question?.id ?? "",
    type: "Video",
    question: question?.question ?? "",
    description: question?.description ?? "",
    maxDuration: question?.maxDuration ?? 2,
    secOrMin: question?.secOrMin ?? "",
  });

  const handleSave = () => {
    if (
      !video.question ||
      !video.description ||
      !video.maxDuration ||
      !video.secOrMin
    ) {
      message.error("Please fill in all fields before saving.");
      return;
    }

    if (mode === "create") {
      createOrUpdateQuestions(category, {
        ...video,
        id: generateUniqueId(),
      });
    };
    if(mode === "edit"){
      createOrUpdateQuestions(category, video);
    }
    setIsOpenQuestion(false);
  };

  return (
    <div
      className="flex-column"
      style={{ gap: "10px", paddingTop: "30px", alignItems: "stretch" }}
    >
      <label htmlFor="video-details" className="question-layout-heading">
        Question
      </label>

      <Input
        value={video.question}
        onChange={(e) => {
          setVideo({
            ...video,
            question: e.target.value,
          });
        }}
        name="video-details"
        placeholder="Type here"
        required
        size="large"
        style={{ borderColor: "black" }}
      />

      <TextArea
        value={video.description}
        onChange={(e) => {
          setVideo({
            ...video,
            description: e.target.value,
          });
        }}
        required
        placeholder="Enter your description here"
        autoSize={{ minRows: 4, maxRows: 6 }}
        style={{ borderColor: "black", marginTop: "10px" }}
      />

      <div className="flex-between" style={{ gap: "10px", marginTop: "10px" }}>
        <InputNumber
          name="max-duration"
          placeholder="Type here"
          value={video.maxDuration}
          onChange={(value) => {
            setVideo({
              ...video,
              maxDuration: value as number,
            });
          }}
          min={1}
          required
          size="large"
          style={{ borderColor: "black", width: "55%" }}
        />

        <Select
          value={video.secOrMin}
          size="large"
          placeholder="in (sec/min)"
          style={{ width: "40%" }}
          onChange={(value) => {
            setVideo({
              ...video,
              secOrMin: value,
            });
          }}
          options={[
            { value: "Seconds", label: "Seconds" },
            { value: "Minutes", label: "Minutes" },
          ]}
        />
      </div>

      <div className="flex-between" style={{ paddingTop: "20px", gap: "10px" }}>
        <div
          className="flex-between"
          onClick={() => {
            if (mode === "edit") {
              if (deleteQuestion) {
                deleteQuestion(category, video);
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

export default VideoQuestion;
