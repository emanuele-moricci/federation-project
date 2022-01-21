import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  Container,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Button,
} from "reactstrap";

// core components
import nowLogo from "assets/img/fed-proj-logo.svg";
import bgImage from "assets/img/auth-bg.jpg";

import styles from "./styles.module.scss";

function LoginPage() {
  const [firstnameFocus, setfirstnameFocus] = useState(false);
  const [lastnameFocus, setlastnameFocus] = useState(false);

  return (
    <>
      <Head>
        <title>Login | Federation Project</title>
      </Head>
      <div className={styles.fullPage}>
        <div className={styles.loginPage}>
          <Container>
            <Col xs={12} md={8} lg={4} className="ml-auto mr-auto">
              <Form>
                <Card className="card-login card-plain">
                  <CardHeader>
                    <div className="logo-container">
                      <Image src={nowLogo} alt="now-logo" />
                    </div>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border form-control-lg " +
                        (firstnameFocus ? "input-group-focus" : "")
                      }
                    >
                      <InputGroupText>
                        <i className="now-ui-icons users_circle-08" />
                      </InputGroupText>
                      <Input
                        type="text"
                        placeholder="First Name..."
                        onFocus={(e) => setfirstnameFocus(true)}
                        onBlur={(e) => setfirstnameFocus(false)}
                      />
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border form-control-lg " +
                        (lastnameFocus ? "input-group-focus" : "")
                      }
                    >
                      <InputGroupText>
                        <i className="now-ui-icons text_caps-small" />
                      </InputGroupText>
                      <Input
                        type="text"
                        placeholder="Last Name..."
                        onFocus={(e) => setlastnameFocus(true)}
                        onBlur={(e) => setlastnameFocus(false)}
                      />
                    </InputGroup>
                  </CardBody>
                  <CardFooter>
                    <Button
                      block
                      color="primary"
                      size="lg"
                      href="#pablo"
                      className="mb-3 btn-round"
                    >
                      Get Started
                    </Button>
                    <div className="pull-left">
                      <h6>
                        <a href="#pablo" className="link footer-link">
                          Create Account
                        </a>
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <a href="#pablo" className="link footer-link">
                          Need Help?
                        </a>
                      </h6>
                    </div>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Container>
        </div>
      </div>
      <div
        className={styles.fullPageBackground}
        style={{ backgroundImage: `url(${require("assets/img/auth-bg.jpg")})` }}
      />
    </>
  );
}

export default LoginPage;
