package solutions.sideklick.authentication.clients;

import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient;

public class CognitoClient {
  public CognitoIdentityProviderClient get() {
    return CognitoIdentityProviderClient.builder().region(Region.EU_CENTRAL_1).build();
  }
}
