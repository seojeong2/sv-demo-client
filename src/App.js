import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const [userId, setUserId] = useState(""); //userId

  const handleButtonClick = async (endpoint) => {
    setIsLoading(true); // 요청 시작 시 로딩 상태를 true로 설정

    try {
      const apiUrl = `http://localhost:8080/api/record/${endpoint}`;
      const requestBody = JSON.stringify(userId);
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });
      if (!response.ok) {
        throw new Error("API 요청이 실패했습니다.");
      }
      const data = await response.text();

      if (data === "Sucess") {
        console.log("서버로부터 응답 제대로 옴");
        setResponse("등록 성공");
        setError("");
      } else if (data == "error") {
        setResponse("처리 실패");
        setError("");
      } else {
        setResponse("알수 없는 응답");
        setError("");
      }
    } catch (error) {
      // setError(error.message);
      // setResponse(null);
      setError("API 요청 중 오류 발생");
      setResponse("");
    } finally {
      setIsLoading(false); // 요청 완료 시 로딩 상태를 false로 설정
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>VAS</h2>

        <p>목소리 인증 Demo</p>
      </header>

      <div className="MainContainer">
        <div className="row" style={{ maxHeight: "10vh" }}>
          <div className="column">
            <input
              type="text"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                console.log("userId: " + userId);
              }}
            ></input>
          </div>
        </div>
        <div className="row" style={{ maxHeight: "20vh" }}>
          <div className="column">
            <Button
              onClick={() => handleButtonClick("authentication")}
              size="lg"
              style={{ width: "200px", height: "50px" }}
            >
              인증
            </Button>
          </div>
          <div className="column">
            <Button
              onClick={() => handleButtonClick("registration")}
              size="lg"
              style={{ width: "200px", height: "50px" }}
            >
              등록
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="column">
            {isLoading && (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}{" "}
            {/* 로딩 중일 때 로딩 바 표시 */}
            {response && <div>응답: {response}</div>}
            {error && <div>에러: {error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
