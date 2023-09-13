package com.example.ssafy301.user.repository;
import com.example.ssafy301.user.domain.User;
import com.example.ssafy301.user.SocialType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByNickname(String nickname);

    Optional<User> findByRefreshToken(String refreshToken);

    //Optional<User> findBySocialTypeAndSocialId(SocialType socialType, String socialId);

}
