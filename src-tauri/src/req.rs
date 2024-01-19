// req.rs

use reqwest::{Method, header::HeaderMap};
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct CustomHeaders {
    #[serde(rename = "Miru-Url")]
    miru_url: String,
    #[serde(rename = "anyOtherHeader")]
    any_other_header: Option<String>,
}

impl From<CustomHeaders> for HeaderMap {
    fn from(custom_headers: CustomHeaders) -> Self {
        let mut headers = HeaderMap::new();
        headers.insert("Miru-Url", custom_headers.miru_url.parse().unwrap());
        if let Some(other_header) = custom_headers.any_other_header {
            headers.insert("anyOtherHeader", other_header.parse().unwrap());
        }
        headers
    }
}

#[derive(Serialize, Deserialize)]
pub struct CustomRequestOptions {
    #[serde(serialize_with = "serialize_method", deserialize_with = "deserialize_method")]
    method: Method,
    headers: CustomHeaders,
}

fn serialize_method<S>(method: &Method, serializer: S) -> Result<S::Ok, S::Error>
where
    S: serde::Serializer,
{
    method.as_str().serialize(serializer)
}

fn deserialize_method<'de, D>(deserializer: D) -> Result<Method, D::Error>
where
    D: serde::Deserializer<'de>,
{
    let method_str: &str = Deserialize::deserialize(deserializer)?;
    Method::from_bytes(method_str.as_bytes()).map_err(serde::de::Error::custom)
}

pub async fn make_request_impl(url: String, options: CustomRequestOptions) -> Result<String, String> {
    // Build the reqwest client
    let client = reqwest::Client::new();

    // Convert CustomHeaders to HeaderMap
    let headers: HeaderMap = options.headers.into();

    // Extract Method from options
    let method: Method = options.method;

    // Build the request with the provided URL, method, and headers
    let request = client.request(method, &url).headers(headers);

    // Send the request and await the response
    match request.send().await {
        Ok(response) => {
            // Check if the response status is OK (200)
            if response.status().is_success() {
                // Return the response body as a string
                Ok(response.text().await.unwrap())
            } else {
                Err(format!("Request failed with status: {}", response.status()))
            }
        }
        Err(err) => Err(format!("Request failed: {}", err)),
    }
}
