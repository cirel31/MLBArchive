"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchFollowData,
  fetchReUserData,
  fetchUserLogout,
} from "@/app/redux/features/userSlice";
import { useRouter } from "next/navigation";
import FollowedTeam from "@/app/components/user/followedTeam";
import FollowedPlayer from "@/app/components/user/followedPlayer";
import "../../../styles/MyPageStyle.scss";
import { Divider } from "antd";
import { recommendAPI } from "@/app/redux/api/userAPI";

const MyPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [matchList, setMatchList] = useState([]);
  const userData = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn: boolean = useSelector(
    (state: any) => state?.user?.isLoggedIn
  );

  useEffect(() => {
    if (!isLoggedIn && !sessionStorage.getItem("refreshToken")) {
      console.log(isLoggedIn);
      router.push(`/login`);
    }
  });
  useEffect(() => {
    if (sessionStorage.getItem("refreshToken")) {
      dispatch(fetchReUserData());
    }
    const response: any = recommendAPI();
    response.then((response: any) => {
      console.log("결과", response);
      setMatchList(response.resultData);
    });
  }, []);

  const getFollowBTN = () => {
    dispatch(fetchFollowData());
  };

  const logoutBTN = () => {
    dispatch(fetchUserLogout());
    router.push("/login");
  };
  return (
    <>
      {userData && (
        <div className="myInfoContents">
          <div>
            <div className="my_profile">
              <img
                src={userData.image}
                alt="이미지에러"
                className="profileImage"
              />

              <div className="namebox">
                <p> 닉네임 : {userData.nickname}</p>
                <p> e-mail : {userData.email}</p>
              </div>
              <div>
                <button
                  className="fix"
                  onClick={() => router.push("/user/edit")}
                >
                  수정하기
                </button>
                <button className="logout" onClick={logoutBTN}>
                  로그아웃
                </button>
              </div>
            </div>
            {/* <Image className="system" src={systemImg} alt="설정 이미지" />
             */}
          </div>
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <div className="followList">
          <div style={{ marginBottom: "10px" }}>
            <FollowedPlayer />
          </div>
          <Divider />
          <FollowedTeam />
        </div>
        <div className="gamebox_profile">
          <div className="top5">추천 경기 TOP5</div>
          <div>
            {matchList && matchList.length > 0 ? (
              matchList.map((content: any) => (
                <div key={content.id} className="one_game">
                  <div>{content.matchDate.slice(0, 10)}</div>
                  <div style={{ fontWeight: "bold" }}>
                    {content.awayName} vs {content.homeName}
                  </div>
                </div>
              ))
            ) : (
              <div className="one_game">
                <p>추천 경기가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default MyPage;
