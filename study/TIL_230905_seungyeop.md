# OAuth 2.0

# OAuth 2.0과 Spring Security를 함께 사용하는 이유

## 1. 외부 서비스 연동

- OAuth 2.0: 외부 서비스와의 연동 및 권한 부여를 관리하는데 사용
- Spring Security: 애플리케이션 내의 자체 보안 관리
- ⇒ 외부 서비스와의 연동 및 보안을 함께 사용할 때 OAuth 2.0과 Spring Security를 통합하여 외부 서비스와 애플리케이션 간의 보안을 통일시킴

## 2. 토큰 관리

- OAuth 2.0: 토큰 기반의 권한 부여 사용
- Spring Security: 토큰을 관리하고 검증하는데 도움을 줌

# OAuth 작동 원리

- [https://inpa.tistory.com/entry/WEB-📚-OAuth-20-개념-💯-정리](https://inpa.tistory.com/entry/WEB-%F0%9F%93%9A-OAuth-20-%EA%B0%9C%EB%85%90-%F0%9F%92%AF-%EC%A0%95%EB%A6%AC)

![1.PNG](https://prod-files-secure.s3.us-west-2.amazonaws.com/f056899b-90df-4908-b818-3d2a431b080c/38006313-bf9e-464a-a922-c93d81ee64be/1.png)

![2.PNG](https://prod-files-secure.s3.us-west-2.amazonaws.com/f056899b-90df-4908-b818-3d2a431b080c/eda60cbe-7f40-4d80-b794-408bd30fed92/2.png)

- 현재 프론트엔드에서 Access Token 발급까지 완료됨(Refresh Token도 같이 발급되는지 도현님한테 물어보자)

## 인증 과정

1. 사용자(Resource Owner)는 서비스(client)를 이용하기 위해 로그인 페이지에 접근한다.
2. 그럼 서비스(client)는 사용자(Resource Owner)에게 로그인 페이지를 제공하게 된다. 로그인 페이지에서 사용자는 "페이스북/구글 으로 로그인" 버튼을 누른다.
3. 만일 사용자가 Login with Facebook 버튼을 클릭하게 되면, 특정한 url이 페이스북 서버쪽으로 보내지게 된다.
4. 클라이언트로부터 보낸 서비스 정보와, 리소스 로그인 서버에 등록된 서비스 정보를 비교한다.
    - 확인이 완료되면, Resource Server로 부터 전용 로그인 페이지로 이동하여 사용자에게 보여준다.
5. ID/PW를 적어서 로그인을 하게되면, client가 사용하려는 기능(scope)에 대해 Resource Owner의 동의(승인)을 요청한다.
    - Resource Owner가 Allow 버튼을 누르면 Resource Owner가 권한을 위임했다는 승인이 Resource Server 에 전달된다.
6. 하지만, 이미 Owner가 Client에게 권한 승인을 했더라도 아직 Server가 허락하지 않았다. 따라서, Resource Server 도 Client에게 권한 승인을 하기위해 Authorization code를 Redirect URL을 통해 사용자에게 응답하고
7. 다시 사용자는 그대로 Client에게 다시 보낸다. 
    - → client는 Resource Server가 보낸 Authorization code를 Resource Owner를 통해 받음
8. 이제 Client가 Resource Server에게 직접 url(클라이언드 아이디, 비번, 인증코드 ...등)을 보낸다.
9. 그럼 Resource Server는 Client가 전달한 정보들을 비교해서 일치한다면, Access Token을 발급한다. 그리고 이제 필요없어진 Authorization code는 지운다.
10. 그렇게 토큰을 받은 Client는 사용자에게 최종적으로 로그인이 완료되었다고 응답한다.
11. 이제 client는 Resource server의 api를 요청해 Resource Owner의 ID 혹은 프로필 정보를 사용할 수 있다.
12. Access Token이 기간이 만료되어 401에러가 나면, Refresh Token을 통해  Access Token을 재발급 한다.
    - 보통 Resource Server는 Access Token을 발급할 때 Refresh Token을 함께 발급
    - Client는 두 Token을 모두 저장해두고, Resource Server의 API를 호출할 때는 Access Token을 사용
    - Access Token이 만료되어 401 에러가 발생하면, Client는 보관 중이던 Refresh Token을 보내 새로운 Access Token을 발급받게 되어 로그인 인증을 유지
