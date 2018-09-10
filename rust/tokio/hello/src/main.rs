extern crate tokio;

use tokio::io;
use tokio::net::TcpListener;
use tokio::prelude::*;

fn main() {
    let addr = "127.0.0.1:6142".parse().unwrap();
    let listener = TcpListener::bind(&addr).unwrap();

    let server = listener.incoming().for_each(|socket| {
        println!("accepted socket; addr={:?}", socket.peer_addr().unwrap());

        // create a task which takes ownership of the socket:
        let connection = io::write_all(socket, "hello, world\n")
            .then(|res| {
                // `res` holds the original socket so we can continue writing if we want to
                println!("wrote message; success={:?}", res.is_ok());
                Ok(())
            });
        // `connection` holds the final task, no work has yet been performed.
        // Spawn a new task that processes the socket:
        tokio::spawn(connection);

        Ok(())
    })
    .map_err(|err| {
        println!("accept error = {:?}", err);
    });

    tokio::run(server);
    println!("server running on localhost:6142");
}
