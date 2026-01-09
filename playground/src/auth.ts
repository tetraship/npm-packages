import { createAuth } from "@tetraship/backend/auth";

export const { handlers, auth, signIn, signOut } = createAuth();
