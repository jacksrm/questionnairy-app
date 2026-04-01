import { invoke } from '@tauri-apps/api/core';

export function getPatient(input: GetPatientByInput): Promise<Patient | null> {
  return invoke<Patient | null>('get_patient', { input });
}
