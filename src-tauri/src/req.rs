use reqwest::Client;
use reqwest::Method;
use std::collections::HashMap;

#[derive(Debug, serde::Deserialize)] // Add this line
pub struct CustomRequestOptions {
    pub headers: HashMap<String, String>,
    pub method: Option<Method>,
}
pub async fn request(
    url: &str,
    options: CustomRequestOptions,
) -> Result<String, Box<dyn std::error::Error>> {
    let client = Client::new();

    let mut req = client.request(options.method.unwrap_or(reqwest::Method::GET), url);

    for (key, value) in options.headers {
        req = req.header(key, value);
    }

    let response = req.send().await?;

    if response.status().is_success() {
        let text = response.text().await?;
        Ok(text)
    } else {
        let error_message = format!("Failed to fetch data: {}", response.status());
        Err(error_message.into())
    }
}
