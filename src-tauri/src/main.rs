// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager, Window};

#[tauri::command]
async fn close_splashscreen(window: Window) -> tauri::Result<String> {
  window.get_window("splashscreen").expect("no window labeled 'splashscreen' found").close().unwrap();
  window.get_window("main").expect("no window labeled 'main' found").show().unwrap();
  
  Ok("Splashscreen closed and main window opened".to_string())
}
 
fn main() {
    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![close_splashscreen])
    .run(tauri::generate_context!())
    .expect("failed to run app");
}
 