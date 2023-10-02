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
import Image from "next/image";
import systemImg from "../../../assets/system.png";

const MyPage = () => {
  const [isLoading, setIsLoading] = useState(true);
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
      <div>
        <div></div>
        {userData && (
          <div className="myInfoContents">
            <div>
              <div className="profile">
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
            <div className="followList">
              <div style={{ marginBottom: "10px" }}>
                <FollowedPlayer />
              </div>
              <FollowedTeam />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyPage;
