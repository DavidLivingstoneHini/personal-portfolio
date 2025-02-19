import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header_exx.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { useMediaQuery } from "../hooks/mediaQuery";

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Fullstack Developer", "Mobile Developer", "Open Source" ];
  const period = 1000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Hi there! 👋, welcome</span>
                <h1>{`I'm David. `} <span className="txt-rotate" dataPeriod="700" data-rotate='[ "Fullstack Developer", "Mobile Developer", "Open Source Advocate" ]' style={{ color: "#D60FCC" }}><span className="wrap">{text}</span></span></h1>
                  <p>A passionate software engineer with a knack for turning complex problems into elegant solutions through code. I thrive on creating efficient, user-friendly software that makes a positive impact. From designing algorithms to debugging code, I enjoy every aspect of the software development process and I'm constantly seeking new ways to enhance my skills and contribute to the ever-evolving tech industry.</p>
                  <button className=""><a href="https://drive.google.com/file/d/1j925Vd5fFZ4GiUZHTU85JvdlYl9XyvW4/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ color: "white"}}>View Resume/CV<ArrowRightCircle size={25} /></a></button>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
