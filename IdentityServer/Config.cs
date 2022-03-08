using DotNetEnv;
using Duende.IdentityServer;
using Duende.IdentityServer.Models;

namespace IdentityServer;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
        {
            new ApiScope("scope1"),
            new ApiScope("scope2"),
        };

    public static IEnumerable<Client> Clients =>
        new Client[]
        {
            // JavaScript BFF client
            new Client
            {
                ClientId = "webstore",

                AllowedGrantTypes = GrantTypes.Code,
    
                // where to redirect to after login
                RedirectUris = { Env.GetString("REDIRECT_URIS") },

                // where to redirect to after logout
                PostLogoutRedirectUris = { Env.GetString("POST_LOGOUT_REDIRECT_URIS") },

                AllowedCorsOrigins = { Env.GetString("ALLOWED_CORS_ORIGINS") },

                AllowedScopes = new List<string>
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    "scope1"
                }
}

        };
}
