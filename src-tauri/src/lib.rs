use tauri::Manager;

use crate::application::{patient, Application};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app: &mut tauri::App| {
            let application = tauri::async_runtime::block_on(Application::new());
            app.manage(application);
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            patient::commands::get_all_patients,
            patient::commands::get_patient,
            patient::commands::delete_patient,
            patient::commands::create_patient,
            patient::commands::update_patient,
            patient::commands::get_patient_by_name,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

mod application;
mod domain;
