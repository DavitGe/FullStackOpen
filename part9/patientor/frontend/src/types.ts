export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface HospitalEntry {
  id: string;
  date: string;
  type: "Hospital";
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
  description: string;
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry {
  id: string;
  date: string;
  type: "OccupationalHealthcare";
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
  description: string;
  sickLeave: {
    startDate: string;
    endDate: string;
  };
}

export interface HealthCheckEntry {
  id: string;
  date: string;
  type: "HealthCheck";
  specialist: string;
  description: string;
  healthCheckRating: number;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type State = {
  patients: { [id: string]: Patient | undefined };
};
