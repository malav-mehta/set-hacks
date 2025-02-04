import { useState } from "react";
import { Col, Container, Row, Image, Card } from "react-bootstrap";
import { Heading, Text, Link, invertAccentColor } from "../components";
import styled, { ThemeProvider } from "styled-components";
import { media } from "../theme";
import { hashString } from "react-hash-string";

type TrackProps = {
  heading: string;
  subheading: string;
  text: string[];
  tracks: IconProps[];
  maxWidth?: string;
  dark?: boolean;
};

type IconProps = {
  title: string;
  icon: string;
  info: string;
  id: number;
};

const TrackWrapper = styled(Container)`
  > * {
    color: ${(props) =>
      props.dark
        ? props.theme.colors.white
        : props.theme.colors.brand[800]} !important;
  }
`;

const LargeIcon = styled(Image)`
  position: absolute;
  display: none;
  height: 470px;
  max-height: 35vw;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 500;
  ${media.lg`display: block`};
`;

const TrackCard = styled(Card)`
  border-radius: 15px;
  min-height: 500px;
  padding: 50px;
  ${media.lg`padding-left: 150px`};
`;

const Buttons = styled(Text)`
  font-weight: bold;
  font-size: 110%;
  ${media.lg`font-size: 140%`};
`;

const Icons = styled(Col)`
  opacity: ${(props) => (props.active ? 1 : 0.3)};
  cursor: pointer;
  ${media.lg`transform: ${(props) =>
    props.active ? "scale(1.1)" : "scale(0.9)"}`};
  ${media.lg`transition: .4s transform cubic-bezier(.155,1.105,.295,1.12)`};
  ${(props) =>
    !props.active &&
    `
    &:hover {
      opacity: 0.8;
      transform: translate(0%, -3%);
      transition: 0.2s ease-out;
    }
  `}
`;

const IconsText = styled(Text)`
  font-size: 80%;
  font-weight: 500;
  ${media.lg`font-size: 120%`};
`;

const Accent = styled.span`
  color: ${({ theme }) => theme.colors.brand[400]};
  font-weight: 600;
`;

const render = (text: string) => {
  let textMap = text.split("*");
  let jsxMap = [];
  for (let i = 0; i < textMap.length; i++) {
    if (i % 2 === 0)
      jsxMap.push(<span key={hashString(textMap[i])}>{textMap[i]}</span>);
    else
      jsxMap.push(<Accent key={hashString(textMap[i])}>{textMap[i]}</Accent>);
  }
  return <>{jsxMap}</>;
};

const Track = ({
  heading,
  subheading,
  text,
  tracks,
  maxWidth = "100%",
  dark = false,
}: TrackProps) => {
  const [activeTrack, setActiveTrack] = useState<number>(0);
  const length = tracks.length;

  return (
    <>
      <ThemeProvider theme={invertAccentColor}>
        <TrackWrapper dark={dark ? 1 : 0}>
          <Row className="row justify-content-md-center mb-4">
            <Col
              xs={12}
              lg={6}
              className="text-center mb-4"
              style={{ maxWidth }}
            >
              <Heading className="mb-4">{heading}</Heading>
              <Text style={{ fontWeight: 500 }} text={subheading} />
              {text &&
                text.map((line) => {
                  return <Text text={line} key={line} />;
                })}
            </Col>
          </Row>
          <Row className="row justify-content-md-center mb-5">
            {tracks &&
              tracks.map((track) => {
                return (
                  <Icons
                    xs={4}
                    lg={2}
                    style={{ maxWidth }}
                    key={track.id}
                    active={track.id === activeTrack ? 1 : 0}
                    onClick={() => setActiveTrack(track.id)}
                  >
                    <Image
                      className="p-4"
                      src={track.icon}
                      alt={track.title}
                      fluid
                    />
                    <IconsText
                      className="text-center mb-4"
                      text={track.title}
                    />
                  </Icons>
                );
              })}
          </Row>
        </TrackWrapper>
      </ThemeProvider>
      <TrackWrapper>
        <Row className="position-relative d-flex align-items-center">
          <Col xs={0} lg={3} />
          <Col xs={12} lg={9}>
            <LargeIcon
              className="p-4"
              src={tracks[activeTrack].icon}
              alt={tracks[activeTrack].title}
              fluid
            />
            <TrackCard>
              <Text
                className="mb-4"
                text={tracks[activeTrack].title}
                style={{ fontWeight: "bold", fontSize: "180%" }}
              />
              {/* <Text
                className="mb-4"
                text={tracks[activeTrack].info}
                style={{ fontSize: "120%" }}
              /> */}
              <div className="mb-4" style={{ fontSize: "120%" }}>
                {render(tracks[activeTrack].info)}
              </div>
              <Row className="mt-auto">
                <Col xs={12} lg={6}>
                  {activeTrack - 1 >= 0 && (
                    <div
                      className="btn p-0"
                      onClick={() => setActiveTrack(activeTrack - 1)}
                    >
                      <Link>{"← " + tracks[activeTrack - 1].title}</Link>
                    </div>
                  )}
                </Col>
                <Col xs={12} lg={6}>
                  {activeTrack + 1 < length && (
                    <div
                      className="btn p-0"
                      onClick={() => setActiveTrack(activeTrack + 1)}
                      style={{ float: "right" }}
                    >
                      <Link>{tracks[activeTrack + 1].title + " →"}</Link>
                    </div>
                  )}
                </Col>
              </Row>
            </TrackCard>
          </Col>
        </Row>
      </TrackWrapper>
    </>
  );
};

export default Track;
