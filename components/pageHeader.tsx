import Image from "next/image";
import { Button, Container } from "react-bootstrap";

const PageHeader = () => {
  return (
    <div className="page-header">
      <Container>
        <div className="page-header-content-wrapper d-flex justify-content-between">
          <div className="d-flex">
            <div className="page-header-icon-wrapper">
              <Image
                src="/images/icon-computer.svg"
                width={30}
                height={30}
                alt="icon computer"
              />
            </div>
            <div className="page-header-title-wrapper">
              <div className="page-header-title">Screen Recording</div>
              <div className="page-header-tags d-flex">
                <div className="page-header-tag">1080p</div>
                <div className="page-header-tag">60 FPS</div>
              </div>
            </div>
          </div>
          <div>
            <Button className="btn btn-success btn-cta">Start Session</Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PageHeader;
