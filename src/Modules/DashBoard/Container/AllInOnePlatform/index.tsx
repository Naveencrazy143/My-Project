import { icons, image } from "@Assets";
import { Button, Card, Image, StatusIcon } from "@Components";
import { useDynamicHeight, useGrowingTitleLine } from "@Hooks";
import { Col, Container, Row } from "reactstrap";
import "./index.css";

const CREATE_JD_AND_ADD_CANDIDATE = [
  { id: 1, mainText: "Interview", subText: " with different duration" },
  { id: 2, mainText: "Notification", subText: " over Email & Phone" },
  { id: 3, mainText: "Candidate", subText: " can attend at their convenient time"},
  { id: 4, mainText: "Deadlines", subText: " for interviews" },
  { id: 5, mainText: "Unlimited Candidates", subText: " for single JD" },
];

const REPORTS_AND_AUTO_APPROVALS = [
  { id: 1, mainText: "Interview video recording", subText: "" },
  { id: 2, mainText: "Skill Matrix", subText: " Report" },
  { id: 3, mainText: "Communication", subText: " Report" },
  { id: 4, mainText: "Aptitude", subText: " Report" },
  { id: 5, mainText: "Personality Traits", subText: " included" },
];

function AllInOnePlatform() {
  let dynamicHeight: any = useDynamicHeight();

  const { titleLineRef: effortlessInterviewsRef, growingWidth } =
    useGrowingTitleLine();

  // const screenHeight = dynamicHeight.dynamicWidth <= 576 ? "" : "h-100vh";

  return (
    <div
      className=""
      ref={effortlessInterviewsRef}
      style={{ backgroundColor: "#ffffff" }}
    >
      <section className={`container-fluid`}>
      <div className="m-lg-6 m-md-6 m-sm-0">
          <div className="header-body">
            <Row className="">
              {" "}
              {/**h-100vh */}
              <Col className={`text-black  text-center mt-6`} >
                <span
                  className={"display-3 font-weight-bolder text-secondary "}
               
                >
                  All-In-One Platform For Interview
                </span>
                <div className="mt-3 text-align-center" >
                  <span
                    className="text-secondary"
                    style={{ fontSize: 14.5, fontWeight: 500 }}
                  >
                    Create a Job description and add the candidates. Our system
                    conducts an automated video interview and auto approves the
                    candidates based on their performance. Get complete insights
                    and reports on the candidate interview in one place.
                  </span>
                  <div
                    className="text-secondary pt-6 row row-cols-1 boldText"
                    style={{ fontSize: 21 }}
                    id="Automated Interviews"
                  >
                    <div className="col-md-4">
                      <div>
                        <span>Create JD</span>
                      </div>
                      <div className="allInOneMarginTop">
                        <span>&</span>
                      </div>
                      <div className="allInOneMarginTop">
                        <span>Add Candidates</span>
                      </div>
                    </div>
                    <div className="col-md-4 mt-5 mt-md-0">
                      <div>
                        <span>Automated Interviews</span>
                      </div>
                      <div className="allInOneMarginTop">
                        <span>with</span>
                      </div>
                      <div className="allInOneMarginTop">
                        <span>Flexible Timings</span>
                      </div>
                    </div>
                    <div className="col-md-4 mt-5 mt-md-0">
                      <div>
                        <span>Reports</span>
                      </div>
                      <div className="allInOneMarginTop">
                        <span>&</span>
                      </div>
                      <div className="allInOneMarginTop">
                        <span>Auto Approvals</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div >
                <div className="mt-7">
                <Col >
              <div className="text-center mx-4 mt-sm-0 mt-2">
                <Image
                  src={image.StreamlinedAutomatedInterview}
                  width={"80%"}
                  height={"100%"}
                />
              </div>
              </Col>
              </div>
              <div>
                  <Card
                    className="text-left mt-7 mx-lg-4 mx-md-4 mx-sm-0"
                    style={{
                      borderWidth: 1.5,
                      borderColor: "#e8edff",
                      backgroundColor: "transparent",
                    }}
                  >
                    <div className="row">
                      <div className="col-md-4 d-flex flex-column justify-content-center align-items-start">
                        {CREATE_JD_AND_ADD_CANDIDATE.map((item) => {
                          return (
                            <>
                              <div className="mt-2 d-flex align-items-baseline" >
                                <StatusIcon />
                                <div
                                  className="ml-2 text-secondary"
                                  style={{ fontSize: 12.5, fontWeight: 800 }}
                                >
                                  {item.mainText}
                                <span
                                  className="text-secondary"
                                  style={{ fontSize: 12.5, fontWeight: 500 }}
                                >
                                  {item.subText}
                                </span>
                                </div>

                              </div>
                            </>
                          );
                        })}
                      </div>

                      <div className="col-md-4 d-flex flex-column align-items-center justify-content-center mt-5 mt-md-2">
                        <div className="row">
                          <div className="d-none d-xl-block">
                            <div
                              style={{
                                width: 1.3,
                                height: 300,
                                backgroundColor: "#f2faf0",
                              }}
                            />
                          </div>
                          <div className="mx-xl-4 mx-lg-1 mb-2 mx-md-0 mx-3">
                            <div
                              className="text-secondary boldText "
                              style={{ fontSize: 21 }}
                            >
                              <div className="text-center">
                                <span>{`Automated Interviews,`}</span>
                              </div>
                              <div className="allInOneMarginTop text-center">
                                <span>Approvals & Reports</span>
                              </div>
                            </div>
                            <div className="mt-4 text-center">
                              <span
                                className="text-gray"
                                style={{ fontSize: 13, fontFamily: "cursive" }}
                              >
                            
                                <Image src={icons.moneyDefalt} height={50} width={60} style={{
                                  objectFit: 'contain'
                                }} />

                              </span>

                            </div>
                            <div className={'d-flex align-items-center justify-content-center'}>
                              <div className={'badge-schedule'}>
                                <span className={'badge-text'}>{'SAVE 58%'}</span>
                              </div>
                            </div>
                            <div className="text-center">
                              <span
                                className="text-secondary"
                                style={{
                                  fontSize: 18,
                                  fontWeight: 500,
                                  fontFamily: "cursive",
                                }}
                              >
                                {"₹"}
                              </span>
                              <span className="text-secondary display-2 ml-1">
                                700
                              </span>
                              <span
                                className="text-secondary ml-1"
                                style={{ fontSize: 18, fontWeight: 500 }}
                              >
                                /interview
                              </span>
                            </div>
                            <div className="d-flex float-center ">
                              <Button
                                text={"Register"}
                                className={"mt-3 ls-0"}
                                block
                                style={{ borderRadius: 4 }}
                              />
                            </div>
                            <div className="mt-3 text-center">
                              <span
                                className="text-gray"
                                style={{ fontFamily: "cursive", fontSize: 13 }}
                              >
                                {"₹"}
                              </span>
                              <span
                                className="text-gray"
                                style={{ fontSize: 13 }}
                              >
                                {"600.00/interview for 1000+"}
                              </span>
                            </div>
                          </div>

                          <div className="d-none d-xl-block">
                            <div
                              style={{
                                width: 1.4,
                                height: 300,
                                backgroundColor: "#f2faf0",
                              }}
                            />
                          </div>

                        </div>
                      </div>

                      <div className="col-md-4 d-flex flex-column justify-content-center mt-5 mt-md-0">
                        {REPORTS_AND_AUTO_APPROVALS.map((item) => {
                          return (
                            <>
                              <div className="mt-2 d-flex align-items-baseline">
                                <StatusIcon />
                                <div
                                  className="ml-2 text-secondary"
                                  style={{ fontSize: 12.5, fontWeight: 800 }}
                                >
                                  {item.mainText}
                               
                                <span
                                  className="text-secondary"
                                  style={{ fontSize: 12.5, fontWeight: 500 }}
                                >
                                  {item.subText}
                                </span>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </Card>
                  </div>
                </div>
                <div className="pt-md-6 pt-lg-6 pt-sm-0 pt-4">
                  <span className="display-3 font-weight-bolder text-secondary">
                    How it works ?
                  </span>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </div>
  );
}

export { AllInOnePlatform };
