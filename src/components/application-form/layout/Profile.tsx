import { useState } from "react";
import { Checkbox, Switch } from "antd";
import Questions from "./questions/Questions";
import { ApplicationForm } from "../types";
import Question from "./questions/Question";

type ProfileProps = {
  formData: ApplicationForm;
  updateFormData: (value: ApplicationForm) => void;
};

const Profile = ({ formData, updateFormData }: ProfileProps) => {
  const [isOpenQuestion, setIsOpenQuestion] = useState<boolean>(false);

  const updateField = (
    fieldName: "education" | "experience" | "resume",
    property: "mandatory" | "show",
    value: boolean
  ) => {
    const updatedFormData: ApplicationForm = {
      ...formData,
    };
    if (property === "show") {
      updatedFormData.profile[fieldName][property] = !value;
    } else {
      updatedFormData.profile[fieldName][property] = value;
    }

    updateFormData(updatedFormData);
  };

  return (
    <>
      <div className="layout">
        <h3 className="layout-heading">Profile</h3>

        <div className="layout-wrapper">
          <div className="label flex">
            <p>Education</p>

            <Checkbox
              onChange={(e) =>
                updateField("education", "mandatory", e.target.checked)
              }
              checked={formData.profile.education.mandatory}
              className="check"
            >
              Mandatory
            </Checkbox>

            <div>
              <Switch
                onChange={(checked) =>
                  updateField("education", "show", checked)
                }
                checked={!formData.profile.education.show}
                style={{ width: "49px", height: "24px" }}
              />
              <span>{!formData.profile.education.show ? "Hide" : "Show"}</span>
            </div>
          </div>

          <div className="label flex">
            <p>Experience</p>

            <Checkbox
              onChange={(e) =>
                updateField("experience", "mandatory", e.target.checked)
              }
              checked={formData.profile.experience.mandatory}
              className="check"
            >
              Mandatory
            </Checkbox>

            <div>
              <Switch
                onChange={(checked) =>
                  updateField("experience", "show", checked)
                }
                checked={!formData.profile.experience.show}
                style={{ width: "49px", height: "24px" }}
              />
              <span>{!formData.profile.experience.show ? "Hide" : "Show"}</span>
            </div>
          </div>

          <div className="label flex no-border">
            <p>Resume</p>

            <Checkbox
              onChange={(e) =>
                updateField("resume", "mandatory", e.target.checked)
              }
              checked={formData.profile.resume.mandatory}
              className="check"
            >
              Mandatory
            </Checkbox>

            <div>
              <Switch
                onChange={(checked) =>
                  updateField("resume", "show", checked)
                }
                checked={!formData.profile.resume.show}
                style={{ width: "49px", height: "24px" }}
              />
              <span>{!formData.profile.resume.show ? "Hide" : "Show"}</span>
            </div>
          </div>

          {formData.profile.profileQuestions.length > 0 && (
            <h3 className="questions-heading">Profile Questions</h3>
          )}

          {formData.profile.profileQuestions.map((question) => (
            <Question key={question.id} category="profileQuestions" question={question} formData = {formData} updateFormData = {updateFormData} />
          ))}

          <div
            className="add-question"
            onClick={() => setIsOpenQuestion(true)}
            style={{ cursor: "pointer" }}
          >
            <img
              src="/assets/icons/plus.svg"
              alt="plus icon"
              width={24}
              height={24}
            />

            <p>Add a question</p>
          </div>
        </div>
      </div>

      {isOpenQuestion && (
        <Questions formData = {formData} updateFormData = {updateFormData} category="profileQuestions" setIsOpenQuestion={setIsOpenQuestion} />
      )}
    </>
  );
};

export default Profile;
