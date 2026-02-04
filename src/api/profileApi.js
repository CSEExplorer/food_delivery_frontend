import { request } from "./request";
import { SERVICE_URLS } from "./serviceUrls";

/**
 * PROFILE SERVICE (8081)
 * GraphQL-based profile APIs
 */

/**
 * Fetch user profile by userId (GraphQL)
 */
export const fetchUserProfileApi = (userId) => {
  return request({
    service: SERVICE_URLS.PROFILE,
    url: "/graphql",
    method: "POST",
    data: {
      query: `
        query GetProfileByUserId($userId: String!) {
          getProfileByUserId(userId: $userId) {
            id
            userId
            firstName
            lastName
            username
            email
            bio
            avatarUrl
            phone
            dateOfBirth
            gender
            country
            city
            language
            timezone
            verification {
              isEmailVerified
              isPhoneVerified
              isIdentityVerified
              kycStatus
            }
          }
        }
      `,
      variables: {
        userId,
      },
    },
  });
};

/**
 * Update user profile (GraphQL)
 */
export const updateUserProfileApi = (profileId, input) => {
  return request({
    service: SERVICE_URLS.PROFILE,
    url: "/graphql",
    method: "POST",
    data: {
      query: `
        mutation UpdateProfile($id: ID!, $input: UserProfileInput!) {
          updateProfile(id: $id, input: $input) {
            id
            userId
            firstName
            lastName
            username
            email
            bio
            avatarUrl
            phone
            country
            city
            language
            timezone
          }
        }
      `,
      variables: {
        id: profileId,
        input,
      },
    },
  });
};
