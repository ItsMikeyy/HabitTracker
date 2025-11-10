import "next-auth";

declare module "next-auth" {
  interface Profile {
    picture?: string;
    image?: string;
  }
}



