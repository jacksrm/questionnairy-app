import { invoke } from '@tauri-apps/api/core';

export async function getAllPatients(): Promise<Patient[]> {
  return await invoke<Patient[]>('get_all');
}
