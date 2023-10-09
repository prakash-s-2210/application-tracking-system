import "./ApplicationForm.css";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import UploadCover from "./layout/upload-cover/UploadCover";
import PersonalInformation from "./layout/PersonalInformation";
import Profile from "./layout/Profile";
import { ApplicationForm } from "./types";
import Questions from "./layout/questions/Questions";
import Question from "./layout/questions/Question";

const MyUploadComponent: React.FC = () => {
  const [isOpenQuestion, setIsOpenQuestion] = useState<boolean>(false);
  const [formData, setFormData] = useState<ApplicationForm>({
    coverImage: "",
    personalInformation: {
      firstName: {
        internalUse: false,
        show: true,
      },
      lastName: {
        internalUse: false,
        show: true,
      },
      emailId: {
        internalUse: false,
        show: true,
      },
      phoneNumber: {
        internalUse: false,
        show: true,
      },
      nationality: {
        internalUse: false,
        show: true,
      },
      currentResidence: {
        internalUse: false,
        show: true,
      },
      idNumber: {
        internalUse: false,
        show: true,
      },
      dateOfBirth: {
        internalUse: false,
        show: true,
      },
      gender: {
        internalUse: false,
        show: true,
      },
      personalQuestions: [],
    },
    profile: {
      education: {
        mandatory: true,
        show: true,
      },
      experience: {
        mandatory: true,
        show: true,
      },
      resume: {
        mandatory: true,
        show: true,
      },
      profileQuestions: [],
    },
    customisedQuestions: [],
  });

  useEffect(() => {
    const result = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:4010/api/691.1025563731114/programs/aperiam/application-form"
        );
        const mockData = await response.json();
        setFormData(mockData.data.attributes);
      } catch (error) {
        message.error("Prism mock server is not running");
      }
    };

    result();
  }, []);

  const updateFormData = (data: ApplicationForm) => {
    setFormData({ ...formData, ...data });
  };

  const handleSubmit = async (event: React.SyntheticEvent<HTMLElement>) => {
    event.preventDefault();
    if (!formData.coverImage) {
      message.error("cover image is required");
      return;
    }
    try{
    const result = await fetch(
      "http://127.0.0.1:4010/api/736.8244003957476/programs/est/application-form",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
            type: "applicationForm",
            attributes: formData,
          },
        }),
      }
    );
    if (result.status === 204) {
      message.success("Application form updated");
    }}
    catch(error){
      message.error("Prism mock server is not running")
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <UploadCover formData={formData} updateFormData={updateFormData} />

      <PersonalInformation
        formData={formData}
        updateFormData={updateFormData}
      />

      <Profile formData={formData} updateFormData={updateFormData} />

      <div className="layout">
        <h3 className="layout-heading">Additional questions</h3>

        {formData.customisedQuestions.length > 0 && <div style={{padding: "13px 48px 10px 30px"}}>
          {formData.customisedQuestions.map((question) => (
            <Question
              key={question.id}
              category="customisedQuestions"
              question={question}
              formData={formData}
              updateFormData={updateFormData}
            />
          ))}
        </div>}

        <div
          className="add-question"
          onClick={() => setIsOpenQuestion(true)}
          style={{ cursor: "pointer", paddingLeft: "30px" , paddingBottom: "50px" }}
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

      {isOpenQuestion && (
        <Questions
          formData={formData}
          updateFormData={updateFormData}
          category={"customisedQuestions"}
          setIsOpenQuestion={setIsOpenQuestion}
        />
      )}

      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  );
};

export default MyUploadComponent;
