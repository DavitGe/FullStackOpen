import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "CHANGE_PATIENT";
      payload: { id: string; newPatient: Patient };
    };

// export type Action = {
//   type: string;
//   payload: Patient | Patient[];
// };
export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList,
  };
};

export const changePatient = (id: string, newPatient: Patient): Action => {
  return {
    type: "CHANGE_PATIENT",
    payload: {
      id,
      newPatient,
    },
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "CHANGE_PATIENT":
      if (state.patients[action.payload.id]) {
        return {
          ...state,
          patients: {
            ...state.patients,
            [action.payload.id]: action.payload.newPatient,
          },
        };
      } else {
        return state;
      }
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};
