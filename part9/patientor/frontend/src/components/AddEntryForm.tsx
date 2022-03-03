/*eslint-disable */
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { getDiagnosis } from "../services/diagnosis";
import {
  Container,
  Input,
  Dropdown,
  Form,
  Rating,
  Button,
} from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";

import { Diagnosis, Entry } from "../types";

interface option {
  key: string;
  value: string;
  text: string;
  description: string;
}

// eslint-disable-next-line
const AddEntryForm = (props: any) => {
  const [diagnosis, setDiagnosis] = useState<option[]>([]);

  const [date, setDate] = useState<Date | undefined | Date[] | null>();
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [rating, setRating] = useState<number>(1);
  const [sickLeave, setSickLeave] = useState<{
    startDate: Date | undefined | Date[] | null;
    endDate: Date | undefined | Date[] | null;
  }>({ startDate: null, endDate: null });
  const [discharge, setDischarge] = useState<{
    date: Date | undefined | Date[] | null;
    criteria: string;
  }>({ date: null, criteria: "" });

  useEffect(() => {
    let temp: option[] = [];
    // eslint-disable-next-line
    getDiagnosis().then((result) => {
      // eslint-disable-next-line
      result.data.map((x: Diagnosis) => {
        temp = [
          ...temp,
          {
            key: x.code,
            value: x.code,
            text: x.code,
            description: x.name,
          },
        ];
      });
      setDiagnosis(temp);
    });
  }, []);

  function valueCheck(item: unknown): item is string[] {
    return true;
  }

  function ratingCheck(item: unknown): item is number {
    return true;
  }

  function checkEntry(item: unknown): item is Entry {
    return true;
  }
  switch (props.type) {
    case "Occupational Healthcare Entry":
      return (
        <Container>
          <Form.Field>
            <label>Specialist:</label>
            <Input
              placeholder="Specialist..."
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Description:</label>
            <Input
              placeholder="Description..."
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Date:</label>
            <SemanticDatepicker
              placeholder="Date..."
              value={date}
              onChange={(_e, data) => {
                setDate(data.value);
              }}
            />
          </Form.Field>
          <Form.Field>
            <SemanticDatepicker
              placeholder="Start Date"
              value={sickLeave.startDate}
              onChange={(_e, data) =>
                setSickLeave({ ...sickLeave, startDate: data.value })
              }
            />
            <SemanticDatepicker
              placeholder="End Date"
              value={sickLeave.endDate}
              onChange={(_e, data) =>
                setSickLeave({ ...sickLeave, endDate: data.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Diseases:</label>
            <Dropdown
              placeholder="Choose Diseases"
              fluid
              multiple
              selection
              options={diagnosis}
              onChange={(_e, { value }) => {
                if (valueCheck(value)) {
                  setDiagnosisCodes(value);
                }
              }}
            />
          </Form.Field>
          <Form.Field>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button
              onClick={() => {
                let entry = {
                  id: uuid(),
                  type: "OccupationalHealthcare",
                  date,
                  specialist,
                  diagnosisCodes,
                  description,
                  sickLeave,
                };
                if (checkEntry(entry)) {
                  try {
                    props.onSubmit(entry);
                  } catch (e) {
                    console.error(e);
                  }
                } else {
                  props.setError(
                    "Your Request Is Invalid. Enter Correct Parameters"
                  );
                }
              }}
              primary
            >
              Add
            </Button>
          </Form.Field>
        </Container>
      );
    case "Health Check Entry":
      return (
        <Container>
          <Form.Field>
            <label>Date:</label>
            <SemanticDatepicker
              placeholder="Date..."
              value={date}
              onChange={(_e, data) => setDate(data.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Specialist:</label>
            <Input
              placeholder="Specialist..."
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Description:</label>
            <Input
              placeholder="Description..."
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>health Check Rating</label>
            <Rating
              icon="heart"
              defaultRating={1}
              maxRating={4}
              value={rating}
              onRate={(_e, data) => {
                if (
                  ratingCheck(data.rating) &&
                  data.rating <= 4 &&
                  data.rating > 0
                ) {
                  setRating(data.rating);
                }
              }}
            />
          </Form.Field>
          <Form.Field>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button
              onClick={() => {
                let entry = {
                  id: uuid(),
                  type: "HealthCheck",
                  healthCheckRating: rating,
                  date,
                  specialist,
                  description,
                };
                if (checkEntry(entry)) {
                  try {
                    props.onSubmit(entry);
                  } catch (e) {
                    console.error(e);
                  }
                } else {
                  props.setError(
                    "Your Request Is Invalid. Enter Correct Parameters"
                  );
                }
              }}
              primary
            >
              Add
            </Button>
          </Form.Field>
        </Container>
      );
    case "Hospital Entry":
      return (
        <Container>
          <Form.Field>
            <label>Specialist:</label>
            <Input
              placeholder="Specialist..."
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Description:</label>
            <Input
              placeholder="Description..."
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Date:</label>
            <SemanticDatepicker
              placeholder="Date..."
              value={date}
              onChange={(_e, data) => setDate(data.value)}
            />
          </Form.Field>
          <Form.Field style={{ display: "flex" }}>
            <Container>
              <label>Discharge Date:</label>
              <SemanticDatepicker
                placeholder="Date..."
                value={discharge.date}
                onChange={(_e, data) =>
                  setDischarge({ ...discharge, date: data.value })
                }
              />
            </Container>
            <Container>
              <label>Criteria:</label>
              <Input
                placeholder="Criteria..."
                value={discharge.criteria}
                onChange={(e) =>
                  setDischarge({ ...discharge, criteria: e.target.value })
                }
              />
            </Container>
          </Form.Field>
          <Form.Field>
            <label>Diseases:</label>
            <Dropdown
              placeholder="Choose Diseases"
              fluid
              multiple
              selection
              options={diagnosis}
              onChange={(_e, { value }) => {
                if (valueCheck(value)) {
                  setDiagnosisCodes(value);
                  console.log(diagnosisCodes);
                }
              }}
            />
          </Form.Field>
          <Form.Field>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button
              onClick={() => {
                let entry = {
                  id: uuid(),
                  type: "Hospital",
                  date,
                  specialist,
                  diagnosisCodes,
                  description,
                  discharge,
                };
                if (checkEntry(entry)) {
                  try {
                    props.onSubmit(entry);
                  } catch (e) {
                    console.error(e);
                  }
                } else {
                  props.setError(
                    "Your Request Is Invalid. Enter Correct Parameters"
                  );
                }
              }}
              primary
            >
              Add
            </Button>
          </Form.Field>
        </Container>
      );
    default:
      return null;
  }
};

export default AddEntryForm;
