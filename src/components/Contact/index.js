import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import "./style.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -moz-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -webkit-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    MessageTitle: "",
    Message: "",
    Email: "",
    GuestName: "",
    Phone: "",
  });
  const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^[0-9]{10}$/; //
    return phonePattern.test(phoneNumber);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    if (!formData.MessageTitle) {
      alert("Message Title is required");
      return;
    }

    if (!formData.Message) {
      alert("Message is required");
      return;
    }

    if (!formData.Email || !validateEmail(formData.Email)) {
      alert("Email is invalid");
      return;
    }

    if (!formData.GuestName) {
      alert("Guest Name is required");
      return;
    }
    if (!formData.Phone || !validatePhoneNumber(formData.Phone)) {
      alert("Phone number is invalid");
      return;
    }
    try {
      const response = await axios.post(
        "https://a30d11nla2.execute-api.us-east-1.amazonaws.com/new/resource",
        formData
      );

      console.log(response.data);

      if (response.status === 200) {
        alert("Form submitted successfully");
      } else {
        alert("Form submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Form submission failed");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>
          Feel free to reach out to me for any questions or opportunities!
        </Desc>

        <ContactTitle>Email Me 🚀</ContactTitle>
        <form style={{ width: 600 }} onSubmit={handleSubmit}>
          <div>
            <label>Message Title:</label>
            <input
              type="text"
              name="MessageTitle"
              value={formData.MessageTitle}
              onChange={(e) =>
                setFormData({ ...formData, MessageTitle: e.target.value })
              }
            />
          </div>
          <div>
            <label>Message:</label>
            <textarea
              name="Message"
              value={formData.Message}
              onChange={(e) =>
                setFormData({ ...formData, Message: e.target.value })
              }
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={(e) =>
                setFormData({ ...formData, Email: e.target.value })
              }
            />
          </div>
          <div>
            <label>Guest Name:</label>
            <input
              type="text"
              name="GuestName"
              value={formData.GuestName}
              onChange={(e) =>
                setFormData({ ...formData, GuestName: e.target.value })
              }
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="tel"
              name="Phone"
              value={formData.Phone}
              onChange={(e) =>
                setFormData({ ...formData, Phone: e.target.value })
              }
            />
          </div>
          <button className="button" type="submit">
            Submit
          </button>
        </form>
      </Wrapper>
    </Container>
  );
};

export default Contact;
