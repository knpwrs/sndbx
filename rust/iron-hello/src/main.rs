extern crate iron;
extern crate rustc_serialize;

use iron::prelude::*;
use iron::status;
use iron::mime::Mime;
use rustc_serialize::json;

#[derive(RustcEncodable)]
struct JsonResponse {
    hello: String,
}

fn main() {
    Iron::new(|_: &mut Request| {
        let content_type = "application/json".parse::<Mime>().unwrap();
        let response = JsonResponse { hello: String::from("world") };
        let out = json::encode(&response).unwrap();
        Ok(Response::with((content_type, status::Ok, out)))
    }).http("localhost:3000").unwrap();
    // or: 0.0.0.0:3000
}
