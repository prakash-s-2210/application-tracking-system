import { Select } from "antd";
import { useState } from "react";
import { ApplicationForm, DateType, DropdownType, FileUploadType, MultipleChoiceType, NumberType, ParagraphType, ShortAnswerType, VideoType, YesNoType } from "../../types";
import Paragraph from "./question-layout/Paragraph";
import ShortAnswer from "./question-layout/ShortAnswer";
import YesNo from "./question-layout/YesNo";
import Dropdown from "./question-layout/Dropdown";
import MultipleChoice from "./question-layout/MultipleChoice";
import Date from "./question-layout/Date";
import Number from "./question-layout/Number";
import FileUpload from "./question-layout/FileUpload";
import VideoQuestion from "./question-layout/VideoQuestion";

type QuestionsProps = {
  formData: ApplicationForm;
  updateFormData: (value: ApplicationForm) => void;
  category: string;
  setIsOpenQuestion: React.Dispatch<React.SetStateAction<boolean>>;
};


const Questions = ({
  formData,
  updateFormData,
  category,
  setIsOpenQuestion,
}: QuestionsProps) => {
  const [type, setType] = useState<null | string>(null);
  const handleChange = (value: string) => {
    setType(value);
  };

  const createOrUpdateQuestions = (questionType: string, question: ParagraphType | ShortAnswerType | YesNoType | DropdownType | MultipleChoiceType | DateType | NumberType | FileUploadType | VideoType) => {
    const updatedFormData: ApplicationForm = {
      ...formData,
    };
    if(questionType === "personalQuestions"){
      updatedFormData.personalInformation.personalQuestions = [...updatedFormData.personalInformation.personalQuestions, question];
    }
    else if (questionType === "profileQuestions"){
      updatedFormData.profile.profileQuestions = [...updatedFormData.profile.profileQuestions, question];
    }
    else{
      updatedFormData.customisedQuestions = [...updatedFormData.customisedQuestions, question];
    }

    updateFormData(updatedFormData);
  };

  return (
    <div className="layout">
      <h3 className="layout-heading">Questions</h3>

      <div className="questions-layout" style={{gap:"0px"}}>
        <div className="flex-column" style={{ gap: "10px" }}>
          <p className="question-layout-heading">Type</p>

          <Select
            size="large"
            placeholder="Select Type"
            style={{ width: "100%" }}
            onChange={handleChange}
            options={[
              { value: "Paragraph", label: "Paragraph" },
              { value: "ShortAnswer", label: "Short answer" },
              { value: "YesNo", label: "Yes/No" },
              { value: "Dropdown", label: "Dropdown" },
              { value: "MultipleChoice", label: "Multiple choice" },
              { value: "Date", label: "Date" },
              { value: "Number", label: "Number" },
              { value: "FileUpload", label: "File upload" },
              { value: "VideoQuestion", label: "Video question" },
            ]}
          />
        </div>

        {type === "Paragraph" && (
          <Paragraph mode="create" createOrUpdateQuestions = {createOrUpdateQuestions} category = {category} setIsOpenQuestion={setIsOpenQuestion} />
        )}

        {type === "ShortAnswer" && (
          <ShortAnswer mode="create" createOrUpdateQuestions = {createOrUpdateQuestions} category = {category} setIsOpenQuestion={setIsOpenQuestion} />
        )}

        {type === "YesNo" && (
          <YesNo mode = "create" createOrUpdateQuestions = {createOrUpdateQuestions} category = {category} setIsOpenQuestion={setIsOpenQuestion} />
        )}

        {type === "Dropdown" && (
          <Dropdown mode = "create" createOrUpdateQuestions = {createOrUpdateQuestions} category = {category} setIsOpenQuestion={setIsOpenQuestion} />
        )}

        {type === "MultipleChoice" && (
          <MultipleChoice mode = "create" createOrUpdateQuestions = {createOrUpdateQuestions} category = {category} setIsOpenQuestion={setIsOpenQuestion} />
        )}

        {type === "Date" && (
          <Date mode = "create" createOrUpdateQuestions = {createOrUpdateQuestions} category = {category} setIsOpenQuestion={setIsOpenQuestion} />
        )}

        {type === "Number" && (
          <Number mode = "create" createOrUpdateQuestions = {createOrUpdateQuestions} category = {category} setIsOpenQuestion={setIsOpenQuestion} />
        )}

        {type === "FileUpload" && (
          <FileUpload mode = "create" createOrUpdateQuestions = {createOrUpdateQuestions} category = {category} setIsOpenQuestion={setIsOpenQuestion} />
        )}

        {type === "VideoQuestion" && (
          <VideoQuestion mode = "create" createOrUpdateQuestions = {createOrUpdateQuestions} category = {category} setIsOpenQuestion={setIsOpenQuestion} />
        )}
      </div>
    </div>
  );
};

export default Questions;
