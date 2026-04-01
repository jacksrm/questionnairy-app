type UIError =
  | 'INVALID_CPF_FIELD'
  | 'INVALID_NAME_FIELD'
  | 'INVALID_PHONE1_FIELD'
  | 'INVALID_PHONE2_FIELD'
  | 'INVALID_BIRTH_DATE_FIELD'
  | 'INVALID_ID_FIELD'
  | 'CPF_ALREADY_IN_USE'
  | 'PATIENT_NOT_FOUND'
  | 'ERROR_CONVERTING_DB_ENTITY'
  | RepositoryError;

type RepositoryError = { RepositoryError: string };

type ResponseError = {
  content: UIError[];
};
