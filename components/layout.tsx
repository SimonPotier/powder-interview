import Navbar from "./navbar";
import Container from "react-bootstrap/Container";
import PageHeader from "./pageHeader";

interface LayoutProps {
  children?: any;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <PageHeader />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
