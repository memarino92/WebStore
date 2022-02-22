import { NgModule } from '@angular/core'
import { AuthModule } from 'angular-auth-oidc-client'

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://localhost:5001',
        redirectUrl: 'https://localhost:4200/auth',
        postLogoutRedirectUri: 'https://localhost:4200/auth',
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
