import { invoke } from '@tauri-apps/api/core';
import { commands } from '../../types/commands';

export function createPatient(input: CreatePatientInput): Promise<null> {
  return invoke<null>(commands.create_patient, { input });
}
