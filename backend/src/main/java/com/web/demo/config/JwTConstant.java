//package com.web.demo.config;
//
////public class JwTConstant {
////	public static final String SECRET_KEY ="JNVDNFVNHDFUFLIOJFIIUHFR09876543"; // IT SHOULD BE UNIQUE THE WHOLE APLICATION
////	public static final String JWT_HEADER ="Authorization"; // IT SHOULD BE UNIQUE THE WHOLE APLICATION
////}
//
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.security.Keys;
//
//import javax.crypto.SecretKey;
//import java.util.Base64;
//
//public class JwTConstant {
//	
//    public static final SecretKey SECRET_KEY_OBJECT = Keys.secretKeyFor(SignatureAlgorithm.HS256);
//    public static final String SECRET_KEY = Base64.getEncoder().encodeToString(SECRET_KEY_OBJECT.getEncoded());
//    public static final String JWT_HEADER = "Authorization";
//}
package com.web.demo.config;

public class JwTConstant {
    // 🔐 Base64-encoded 256-bit secret key (do NOT regenerate every time!)
    public static final String SECRET_KEY = "J25OpQLir/apfQmpo9hR/v6RarAC0/sHyvtW15vwo70=";
    public static final String JWT_HEADER = "Authorization";
}
