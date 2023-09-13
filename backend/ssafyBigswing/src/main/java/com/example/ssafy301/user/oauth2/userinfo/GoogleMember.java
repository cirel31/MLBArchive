package com.example.ssafy301.user.oauth2.userinfo;

import com.example.ssafy301.user.SocialType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class GoogleMember implements OauthMember {

    @JsonProperty("sub")
    private String id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("given_name")
    private String givenName;

    @JsonProperty("family_name")
    private String familyName;

    @JsonProperty("picture")
    private String picture;

    @JsonProperty("email")
    private String email;

    @JsonProperty("email_verified")
    private boolean emailVerified;

    @JsonProperty("locale")
    private String locale;

    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public String getNickName() {
        return name;
    }

    @Override
    public String getProfileImage() {
        return picture;
    }

    @Override
    public SocialType getOauthProvider() {
        return SocialType.GOOGLE;
    }

    @Override
    public void setNickName(String Temp) {
        this.name = Temp;
    }
}
