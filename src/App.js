import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "font-awesome/css/font-awesome.min.css";

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const [userId, setUserId] = useState(""); //userId

  const isNameValid = userId.trim() !== "";

  const handleButtonClick = async (endpoint) => {
    // 버튼 클릭시 응답, 에러 화면 표시 제외 처리
    setResponse("");
    setError("");

    // 사용자명 입력했는지 체크
    if (userId.trim() === "") {
      setError("사용자 명을 입력바랍니다");
    } else {
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
        } else if (data === "error") {
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
    }

    // setIsLoading(true); // 요청 시작 시 로딩 상태를 true로 설정

    // // 버튼 클릭시 응답, 에러 화면 표시 제외 처리
    // setResponse("");
    // setError("");
    // try {
    //   const apiUrl = `http://localhost:8080/api/record/${endpoint}`;
    //   const requestBody = JSON.stringify(userId);
    //   const response = await fetch(apiUrl, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: requestBody,
    //   });
    //   if (!response.ok) {
    //     throw new Error("API 요청이 실패했습니다.");
    //   }
    //   const data = await response.text();

    //   if (data === "Sucess") {
    //     console.log("서버로부터 응답 제대로 옴");
    //     setResponse("등록 성공");
    //     setError("");
    //   } else if (data == "error") {
    //     setResponse("처리 실패");
    //     setError("");
    //   } else {
    //     setResponse("알수 없는 응답");
    //     setError("");
    //   }
    // } catch (error) {
    //   // setError(error.message);
    //   // setResponse(null);
    //   setError("API 요청 중 오류 발생");
    //   setResponse("");
    // } finally {
    //   setIsLoading(false); // 요청 완료 시 로딩 상태를 false로 설정
    // }
  };

  const clickAuthButton = async () => {
    setResponse("");
    setError("");

    if (userId.trim() === "") {
      setError("사용자 명을 입력바랍니다");
    } else {
      setIsLoading(true); // 요청 시작 시 로딩 상태를 true로 설정
      try {
        const apiUrl = "http://localhost:8080/api/record/authentication";
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
        const data = await response.json();

        if (data === "error") {
          setResponse("처리 실패");
          setError("");
        } else {
          console.log("서버로부터 응답 제대로 옴");

          const authScore = parseFloat(data.score);

          if (authScore > 0.77) {
            setResponse("인증 성공");
          } else {
            setResponse("인증 실패");
          }
          setError("");
        }
      } catch (error) {
        setError("API 요청 중 오류 발생");
        setResponse("");
      } finally {
        setIsLoading(false); // 요청 완료 시 로딩 상태를 false로 설정
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p style={titleStyle}>
          목소리 인증 Demo
          <span
            style={{ color: "green", marginLeft: "10px", fontSize: "50px" }}
          >
            <i className="fa fa-microphone" />
          </span>
        </p>
      </header>

      <div className="MainContainer">
        <div className="row" style={{ maxHeight: "10vh" }}>
          <h3>등록, 인증 테스트를 진행할 사용자명을 입력바랍니다</h3>
          <div className="column">
            <input
              type="text"
              value={userId}
              placeholder="사용자 명"
              onChange={(e) => {
                setUserId(e.target.value);
              }}
              style={{ height: "50px", width: "200px" }}
            ></input>
            {isNameValid && (
              <span
                style={{ color: "green", marginLeft: "10px", fontSize: "50px" }}
              >
                <i className="fa fa-check" />
              </span>
            )}
          </div>
        </div>
        <div className="row" style={{ maxHeight: "20vh" }}>
          <div className="column">
            <Button
              onClick={() => handleButtonClick("registration")}
              size="lg"
              style={{
                width: "200px",
                height: "50px",
                backgroundColor: "green",
                border: "none",
              }}
            >
              등록
            </Button>
          </div>
          <div className="column">
            <Button
              onClick={() => clickAuthButton()}
              size="lg"
              style={{
                width: "200px",
                height: "50px",
                backgroundColor: "green",
                border: "none",
              }}
            >
              인증
            </Button>
          </div>
        </div>
        {/* <div className="row"> */}
        {/* <div className="column"> */}
        <div className="resultContainer">
          <h3>요청 결과</h3>
          {isLoading && (
            <Spinner animation="border" role="status" style={{ size: "30px" }}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}{" "}
          {/* 로딩 중일 때 로딩 바 표시 */}
          {response && (
            <div style={{ fontSize: "30px" }}>
              {userId}님 {response}
            </div>
          )}
          {error && (
            <div style={{ fontSize: "30px", color: "red" }}>
              ! ! {error} ! !
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const titleStyle = {
  fontFamily: "GoogleFont, sans-serif",
  fontSize: "50px",
};

export default App;
