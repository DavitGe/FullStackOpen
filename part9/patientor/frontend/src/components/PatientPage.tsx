import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStateValue, changePatient } from "../state";
import { Icon, Button } from "semantic-ui-react";

import AddEntryModal from "./AddEntryModal";
import { Entry } from "../types";
import { apiBaseUrl } from "../constants";

const PatientPage = () => {
  // eslint-disable-next-line
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const id: string = useParams<{ id: string }>().id;

  const patient = patients[id];
  if (!patient) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  const entryStyles = {
    padding: "12px",
    borderStyle: "solid",
    borderWidth: "1px",
    listStyleType: "none",
    borderColor: "#e6e6e6",
    marginBottom: "24px",
  };

  const name = patient.gender === "male" ? "venus" : "mars";

  const submitNewEntry: (values: Entry) => void = (values: Entry): void => {
    try {
      // eslint-disable-next-line
      axios
        .post<Entry>(`${apiBaseUrl}/patients/${patient.id}/entries`, values)
        .then((result) => {
          const newEntry = result.data;
          dispatch(
            changePatient(patient.id, {
              ...patient,
              entries: [...patient.entries, newEntry],
            })
          );
          setModalOpen(false);
        });
      // eslint-disable-next-line
    } catch (e: any) {
      console.error(e.response?.data || "unknown error");
    }
  };

  return (
    <div>
      <h1>
        {patient.name} <Icon name={name} />
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <div>
        <h2>entries:</h2>
        {patient.entries.map((entry) => {
          switch (entry.type) {
            case "Hospital":
              if (entry.diagnosisCodes) {
                return (
                  <>
                    <ul key={entry.id}>
                      {entry.diagnosisCodes.map((diagnose) => (
                        <li style={entryStyles} key={diagnose}>
                          <h3>{entry.date}</h3>
                          <p>Diagnosis: {diagnose}</p>
                          <p style={{ color: "#808080" }}>
                            {entry.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </>
                );
              } else {
                return <p key={entry.id}>{entry.description}</p>;
              }
            case "OccupationalHealthcare":
              if (entry.diagnosisCodes) {
                return (
                  <>
                    <ul key={entry.id}>
                      {entry.diagnosisCodes.map((diagnose) => (
                        <li style={entryStyles} key={diagnose}>
                          <h3>{entry.date}</h3>
                          <p>Diagnosis: {diagnose} </p>
                          <p style={{ color: "#808080" }}>
                            {entry.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </>
                );
              } else {
                return <p key={entry.id}>{entry.description}</p>;
              }
            case "HealthCheck":
              return (
                <div key={entry.id} style={entryStyles}>
                  <h3>{entry.date}</h3>
                  <p>{entry.description}</p>
                </div>
              );
            default:
              return <p>default</p>;
          }
        })}
        <AddEntryModal
          modal={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={submitNewEntry}
        />
        <Button onClick={() => setModalOpen(true)}>Add Entry</Button>
      </div>
    </div>
  );
};

export default PatientPage;
