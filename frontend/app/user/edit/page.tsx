"use client";
import { useDispatch, useSelector } from "react-redux";
import { AxiosResponse } from "axios";
import { fetchHittingRankerDataAPI } from "@/app/redux/api/rankAPI";
import {EditAPI, userInfoUpdateAPI} from "@/app/redux/api/userAPI";
import { useEffect, useRef, useState } from "react";
import { fetchReUserData } from "@/app/redux/features/userSlice";
import { useRouter } from "next/navigation";
import "../../../styles/MyPageStyle.scss";

const ProfileEditPage = () => {
  const router = useRouter();
  const userInfo = useSelector((state: any) => state.user.userData) ?? null;
  console.log(userInfo);
  const [imgFile, setImgFile] = useState("");
  const [originNickname, setOriginNickname] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("실행중");
    dispatch(fetchReUserData());
  }, []);
  useEffect(() => {
    if (userInfo && userInfo.nickname && userInfo.image) {
      setOriginNickname(userInfo.nickname);
      setImgFile(userInfo.image);
    }
  }, [userInfo]);

  const imgRef = useRef<HTMLInputElement>(null);
  const nickRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const saveImgFile = () => {
    const file = imgRef.current?.files?.[0];
    if (file) {
      setImgFile(URL.createObjectURL(file));
    }
  };
  const saveNickname = () => {
    const nickname = nickRef.current?.value;
    if (nickname) {
      setOriginNickname(nickname);
    }
  };

  const handleSubmit = () => {
    console.log("일단 버튼 확인");
    // const formData = new FormData()
    // formData.append('nickName', originNickname)
    // formData.append('image', imgFile)
    const formData = new FormData(formRef.current || undefined)
    try {
      const response = EditAPI(formData);
      response
        .then(() => {
          dispatch(fetchReUserData())
          router.push('/user/mypage')
        })
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };
  const handleMyPage = () => {
    router.push("/user/mypage");
  };

  return (
    <>
      <div className="editbox">
        <button className="logout" onClick={handleMyPage}>
          뒤로가기
        </button>
        <div className="textbox">
          <form ref={formRef}>
            <div>
              <img
                className="userImg"
                src={imgFile}
                alt="프로필 이미지를 불러올 수 없습니다."
              />
              {/* <label>
                <p>프로필사진 변경</p>
              </label> */}
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={saveImgFile}
                ref={imgRef}
                id="edit_image"
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h2>닉네임 : </h2>
                <input
                  style={{
                    color: "black",
                    border: "1px solid",
                    borderRadius: "5px",
                    paddingLeft: "3px",
                  }}
                  name="nickName"
                  type="text"
                  value={originNickname || ""}
                  onChange={saveNickname}
                  ref={nickRef}
                />
              </div>
            </div>
          </form>
          <div style={{ marginTop: "20px" }}>
            <button className="fix" onClick={() => handleSubmit()}>
              변경완료
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEditPage;
