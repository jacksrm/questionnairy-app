import { invoke } from '@tauri-apps/api/core';
import { commands } from '../../types/commands';

export function getPatient(input: GetPatientByInput): Promise<Patient | null> {
  return invoke<Patient | null>(commands.get_patient, { input });
}
