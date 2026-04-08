import { invoke } from '@tauri-apps/api/core';
import { commands } from '../../types/commands';

export async function getAllPatients(): Promise<Patient[]> {
  return await invoke<Patient[]>(commands.get_all_patients);
}
