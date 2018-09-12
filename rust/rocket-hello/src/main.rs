#![feature(plugin, decl_macro)]
#![plugin(rocket_codegen)]

extern crate rocket;

#[cfg(test)] mod tests;

#[get("/")]
fn hello() -> &'static str {
    "Hello, World!"
}

fn main() {
    rocket::ignite().mount("/", routes![hello]).launch();
}
