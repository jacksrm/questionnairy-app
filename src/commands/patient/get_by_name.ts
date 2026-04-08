import { invoke } from '@tauri-apps/api/core';
import { commands } from '../../types/commands';

export default async function getByName(input: string): Promise<Patient[]> {
  return invoke<Patient[]>(commands.get_patient_by_name, { input });
}
