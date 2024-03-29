import { icons, image, videos } from "@Assets";
import { Button, Image, StatusIcon } from "@Components";
import { useGrowingTitleLine, useNavigation } from "@Hooks";
import { ROUTES } from "@Routes";
import { Col, Container, Row } from "reactstrap";
import { VideoStream } from "../VideoStream";

const packageContent = [
  { id: 1, description: "Automated Video Interviews" },
  { id: 2, description: "Flexible Interview timings of candidate's choice" },
  { id: 3, description: "Interview Video Recordings" },
  { id: 4, description: "Detailed Insights & Reports" },
  { id: 5, description: "Auto Approvals based on objective analytics" },
];

function WebsiteHeader() {
  const { goTo } = useNavigation();


  const { titleLineRef: websiteHeaderRef } =
    useGrowingTitleLine();

  return (
    <div
      className={`header pt-lg-6 pt-md-6 pt-sm-0 pt-5`}
      ref={websiteHeaderRef}
      style={{ backgroundColor: "" }}
      id="home"
    >
      <div className='container-fluid'>
        <div className="m-lg-6 m-md-6 m-sm-0 mb-6">
          <Row>
            <Col lg="5">
              <div className="">
                <div>
                  <div>
                    <span
                      className=" mb-0 text-secondary"
                      style={{ fontWeight: "800", fontSize: 18 }}
                    >
                      {" "}
                      Streamlined Automated Interviews
                    </span>
                  </div>
                  <div>
                    <span className="display-3 text-secondary font-weight-bolder mb-0 ls-1">
                      Where AI
                    </span>
                  </div>
                  <div style={{ marginTop: -11 }}>
                    <span className="display-3 text-secondary font-weight-bolder ls-1">
                      meets HR
                    </span>
                  </div>
                </div>
                <div className="pt-3">
                  <span
                    className="text-secondary"
                    style={{ fontSize: 14, fontWeight: "500" }}
                  >
                    {"Create a job description and add the candidates,"} <br />
                    {"Let us take care of the rest of you!"}
                  </span>
                </div>

                <div className="pt-md-5 pt-lg-5 pt-sm-0 pt-3">
                  {packageContent.map((item) => {
                    return (
                      <>
                        <div className="pt-2 d-flex">
                          <StatusIcon />
                          <span
                            className="ml-2 text-secondary"
                            style={{ fontSize: 12.5, fontWeight: 800 }}
                          >
                            {item.description}
                          </span>
                        </div>
                      </>
                    );
                  })}
                </div>

                <Button
                  className={"mt-md-7 mt-sm-0 mt-4 col-sm-10 ls-0"}
                  style={{ borderRadius: 4 }}
                  block
                  text={"Register"}
                  size="lg"
                  onClick={() => {
                    goTo(ROUTES['auth-module']['register-company']);
                  }}
                />

                <div className="pt-3 pb-sm-0 pb-3 ">
                  <Image src={icons.headSet} height={20} />
                  <span
                    className="ml-2 text-secondary"
                    style={{ fontSize: 14, fontWeight: 500 }}
                  >
                    {"24/7 Customer Support"}
                  </span>
                </div>
              </div>
            </Col>
            <Col className="mt-xl-0 mt-lg-0 mt-7" lg="7" sm="12">
              <div className="text-center ml-lg-3 ml-md-3 mt-2">
              <video  
                // autoPlay={true} 
                controls 
                poster={image.intrvuSpaceIv} 
                preload="metadata"
                controlsList="nodownload"
                width="100%" height="100%">
              <source src={videos?.landingPageVideo} type="video/mp4" />
              </video>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export { WebsiteHeader };
