/**
 * * Navbar component: handle root navigation
 */

import Link from "next/link"; // import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "next/image";

const NavbarComponent = () => {
  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <Link href="/">
            <Image
              src="/images/powder-logo.svg"
              width={18}
              height={18}
              alt="Powder logo"
            />
          </Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
