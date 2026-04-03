import { invoke } from '@tauri-apps/api/core';

export default async function getByName(input: string): Promise<Patient[]> {
  return invoke<Patient[]>('get_by_name', { input });
}
