import { NgModule } from '@angular/core'
import { AuthModule } from 'angular-auth-oidc-client'

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: process.env.NG_APP_TOKEN_AUTHORITY,
        redirectUrl: process.env.NG_APP_REDIRECT_URIS,
        postLogoutRedirectUri: process.env.NG_APP_POST_LOGOUT_REDIRECT_URIS,
        clientId: 'bff',
        scope: 'openid profile', // 'openid profile offline_access ' + your scopes
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        renewTimeBeforeTokenExpiresInSeconds: 30,
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
