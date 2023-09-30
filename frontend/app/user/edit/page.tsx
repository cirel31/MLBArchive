'use client'
import {useDispatch, useSelector} from "react-redux";
import {AxiosResponse} from "axios";
import {fetchHittingRankerDataAPI} from "@/app/redux/api/rankAPI";
import {userInfoUpdateAPI} from "@/app/redux/api/userAPI";
import {useEffect, useRef, useState} from "react";
import {fetchReUserData} from "@/app/redux/features/userSlice";
import {useRouter} from "next/navigation";

const ProfileEditPage = () => {
  const router = useRouter()
  const userInfo = useSelector((state:any) => state.user.userData) ?? null
  console.log(userInfo)
  const [imgFile, setImgFile] = useState('');
  const [originNickname, setOriginNickname] = useState('');
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("실행중")
    dispatch(fetchReUserData())
  }, [])
  useEffect(() => {
    if (userInfo && userInfo.nickname && userInfo.image) {
      setOriginNickname(userInfo.nickname)
      setImgFile(userInfo.image)
    }
  }, [userInfo])

  const imgRef = useRef<HTMLInputElement>(null);
  const nickRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const saveImgFile = () => {
    const file = imgRef.current?.files?.[0];
    if (file) {
      setImgFile(URL.createObjectURL(file));
    }
  };
  const saveNickname = () => {
    const nickname = nickRef.current?.value
    if (nickname) {
      setOriginNickname(nickname)
    }
  }

  const handleSubmit = () => {
    console.log('일단 버튼 확인')
    const data = {

    }
    // const response: Promise<AxiosResponse> = userInfoUpdateAPI(accessToken, data)
    //   response
    //     .then((response) => {
    //
    //     })
    //     .catch((error) => {
    //
    //     })
  }
  const handleMyPage = () => {
    router.push('/user/mypage')
  }

  return (
    <>
      <div>
        <div>
          <form ref={formRef}>
            <div>
              <img
                  src={imgFile}
                  alt="프로필 이미지를 불러올 수 없습니다."
              />
              <input
                  name="file"
                  type="file"
                  accept="image/*"
                  onChange={saveImgFile}
                  ref={imgRef}
                  id="edit_image"
              />
              <label>
                <p>사진 변경하기</p>
              </label>
            </div>
            <div >
              <div>
                <h2>닉네임 변경하기</h2>
                <input
                  style={{ color: "black" }}
                  name="nickName"
                  type="text"
                  value={originNickname || ''}
                  onChange={saveNickname}
                  ref={nickRef}
                />
              </div>
              <button onClick={() => handleSubmit()}>프로필 변경하기</button>
            </div>
          </form>
          <button onClick={handleMyPage}>뒤로 가기</button>
        </div>
      </div>
    </>
  )
}

export default ProfileEditPage