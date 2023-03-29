import type { User } from "@clerk/nextjs/dist/api";
export const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    name: user.firstName + "" + user.lastName,
    image: user.profileImageUrl,
  };
};
