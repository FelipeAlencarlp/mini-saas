import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/lib/axios";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "login" },
                password: { label: "Password", type: "password" },
            },
            // Função que irá realizar o request de autenticação do usuário
            async authorize(credentials, req) {
                const res = await axios.post("/login/", {
                    username: credentials?.username,
                    password: credentials?.password,
                });

                // Atribui a variável user a resposta contendo o token
                let user = await res.data;
                
                if (user.access) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    // recuperar a sessão do usuário dentro da aplicação
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user = token as any;
            return session;
        },
    },
});