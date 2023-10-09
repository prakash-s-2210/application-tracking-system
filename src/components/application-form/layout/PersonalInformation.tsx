import { useState } from "react";
import { Checkbox, Switch } from "antd";
import Questions from "./questions/Questions";
import { ApplicationForm } from "../types";
import Question from "./questions/Question";

type PersonalInformationProps = {
  formData: ApplicationForm;
  updateFormData: (value: ApplicationForm) => void;
};

const PersonalInformation = ({
  formData,
  updateFormData,
}: PersonalInformationProps) => {
  const [isOpenQuestion, setIsOpenQuestion] = useState<boolean>(false);

  const updateField = (
    fieldName:
      | "firstName"
      | "lastName"
      | "emailId"
      | "phoneNumber"
      | "nationality"
      | "currentResidence"
      | "idNumber"
      | "idNumber"
      | "dateOfBirth"
      | "gender",
    property: "internalUse" | "show",
    value: boolean
  ) => {
    const updatedFormData: ApplicationForm = {
      ...formData,
    };
    console.log(value);
    if (property === "show") {
      updatedFormData.personalInformation[fieldName][property] = !value;
    } else {
      updatedFormData.personalInformation[fieldName][property] = value;
    }

    updateFormData(updatedFormData);
  };

  return (
    <>
      <div className="layout">
        <h3 className="layout-heading">Personal Information</h3>

        <div className="layout-wrapper">
          <p className="label">First Name</p>

          <p className="label">Last Name</p>

          <p className="label">Email</p>

          <div className="label flex">
            <p>
              Phone <span>(without dial code)</span>
            </p>

            <Checkbox
              onChange={(e) =>
                updateField("phoneNumber", "internalUse", e.target.checked)
              }
              checked={formData.personalInformation.phoneNumber.internalUse}
              className="check"
            >
              Internal
            </Checkbox>

            <div>
              <Switch
                onChange={(checked) =>
                  updateField("phoneNumber", "show", checked)
                }
                checked={!formData.personalInformation.phoneNumber.show}
                style={{ width: "49px", height: "24px" }}
              />
              <span>
                {!formData.personalInformation.phoneNumber.show
                  ? "Hide"
                  : "Show"}
              </span>
            </div>
          </div>

          <div className="label flex">
            <p>Nationality</p>

            <Checkbox
              onChange={(e) =>
                updateField("nationality", "internalUse", e.target.checked)
              }
              checked={formData.personalInformation.nationality.internalUse}
              className="check"
            >
              Internal
            </Checkbox>

            <div>
              <Switch
                onChange={(checked) =>
                  updateField("nationality", "show", checked)
                }
                checked={!formData.personalInformation.nationality.show}
                style={{ width: "49px", height: "24px" }}
              />
              <span>
                {!formData.personalInformation.nationality.show
                  ? "Hide"
                  : "Show"}
              </span>
            </div>
          </div>

          <div className="label flex">
            <p>Current Residence</p>

            <Checkbox
              onChange={(e) =>
                updateField("currentResidence", "internalUse", e.target.checked)
              }
              checked={
                formData.personalInformation.currentResidence.internalUse
              }
              className="check"
            >
              Internal
            </Checkbox>

            <div>
              <Switch
                onChange={(checked) =>
                  updateField("currentResidence", "show", checked)
                }
                checked={!formData.personalInformation.currentResidence.show}
                style={{ width: "49px", height: "24px" }}
              />
              <span>
                {!formData.personalInformation.currentResidence.show
                  ? "Hide"
                  : "Show"}
              </span>
            </div>
          </div>

          <div className="label flex">
            <p>ID Number</p>

            <Checkbox
              onChange={(e) =>
                updateField("idNumber", "internalUse", e.target.checked)
              }
              checked={formData.personalInformation.idNumber.internalUse}
              className="check"
            >
              Internal
            </Checkbox>

            <div>
              <Switch
                onChange={(checked) => updateField("idNumber", "show", checked)}
                checked={!formData.personalInformation.idNumber.show}
                style={{ width: "49px", height: "24px" }}
              />
              <span>
                {!formData.personalInformation.idNumber.show ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <div className="label flex">
            <p>Date of Birth</p>

            <Checkbox
              onChange={(e) =>
                updateField("dateOfBirth", "internalUse", e.target.checked)
              }
              checked={formData.personalInformation.dateOfBirth.internalUse}
              className="check"
            >
              Internal
            </Checkbox>

            <div>
              <Switch
                onChange={(checked) =>
                  updateField("dateOfBirth", "show", checked)
                }
                checked={!formData.personalInformation.dateOfBirth.show}
                style={{ width: "49px", height: "24px" }}
              />
              <span>
                {!formData.personalInformation.dateOfBirth.show
                  ? "Hide"
                  : "Show"}
              </span>
            </div>
          </div>

          <div className="label flex no-border">
            <p>Gender</p>

            <Checkbox
              onChange={(e) =>
                updateField("gender", "internalUse", e.target.checked)
              }
              checked={formData.personalInformation.gender.internalUse}
              className="check"
            >
              Internal
            </Checkbox>

            <div>
              <Switch
                onChange={(checked) => updateField("gender", "show", checked)}
                checked={!formData.personalInformation.gender.show}
                style={{ width: "49px", height: "24px" }}
              />
              <span>
                {!formData.personalInformation.gender.show ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {formData.personalInformation.personalQuestions.length > 0 && (
            <h3 className="questions-heading">Personal Questions</h3>
          )}

          {formData.personalInformation.personalQuestions.map((question) => (
            <Question key={question.id} category="personalQuestions" question={question} formData = {formData} updateFormData = {updateFormData} />
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
        <Questions
          formData={formData}
          updateFormData={updateFormData}
          category="personalQuestions"
          setIsOpenQuestion={setIsOpenQuestion}
        />
      )}
    </>
  );
};

export default PersonalInformation;
