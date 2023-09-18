import {useSelector} from "react-redux";
import {AxiosResponse} from "axios";
import {fetchHittingRankerDataAPI} from "@/app/redux/api/rankAPI";
import {userInfoUpdateAPI} from "@/app/redux/api/userAPI";

const ProfileEditPage = () => {
  const userInfo = useSelector((state:any) => state.user.userData) ?? null
  const accessToken = useSelector((state:any) => state.user.accessToken) ?? ''
  const userInfoChange = () => {
    const data = {

    }
    const response: Promise<AxiosResponse> = userInfoUpdateAPI(accessToken, data)
      response
        .then((response) => {

        })
        .catch((error) => {

        })
  }

  return (
    <>
      <div>
        {userInfo && (
          <div>
            <div>{userInfo.id}</div>
            <div>{userInfo.name}</div>
            <div>{userInfo.email}</div>
          </div>
        )}

      </div>
    </>
  )
}

export default ProfileEditPage