import React from "react";
import { Entry } from "../types";
import { Dropdown, Form, Message } from "semantic-ui-react";
import AddEntryForm from "./AddEntryForm";

interface props {
  onClose: () => void;
  onSubmit: (values: Entry) => void;
}
const ChooseEntryForm = ({ onClose, onSubmit }: props) => {
  const [selectedValue, setSelectedValue] = React.useState("");
  const [error, setError] = React.useState<string>("");

  const fieldOptions: { text: string; key: string; value: string }[] = [
    { text: "Hospital Entry", key: "Hospital Entry", value: "Hospital Entry" },
    {
      text: "Occupational Healthcare Entry",
      key: "Occupational Healthcare Entry",
      value: "Occupational Healthcare Entry",
    },
    {
      text: "Health Check Entry",
      key: "Health Check Entry",
      value: "Health Check Entry",
    },
  ];

  return (
    <Form>
      {error === "" ? null : (
        <Message negative>
          <Message.Header>{error}</Message.Header>
        </Message>
      )}
      <Form.Field>
        <Dropdown
          placeholder="Setelct Entry Type"
          fluid
          selection
          options={fieldOptions}
          onChange={(_e, { value }) => {
            if (value) {
              setSelectedValue(value.toString());
            }
          }}
        />
        {console.log(selectedValue)}
      </Form.Field>
      <AddEntryForm
        type={selectedValue}
        onSubmit={onSubmit}
        onClose={onClose}
        setError={setError}
      />
    </Form>
  );
};

export default ChooseEntryForm;
