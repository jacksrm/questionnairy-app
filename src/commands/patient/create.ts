import { invoke } from '@tauri-apps/api/core';

export function createPatient(input: CreatePatientInput): Promise<null> {
  return invoke<null>('create', { input });
}
