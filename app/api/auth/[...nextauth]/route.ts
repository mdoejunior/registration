// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { NextAuthOptions } from "next-auth";
// import { NextApiHandler } from 'next';
// import axios from "axios";
//
// const authOptions: NextAuthOptions = {
//     providers: [
//         CredentialsProvider({
//             name: 'credentials',
//             credentials: {
//                 email: { label: 'Email', type: 'text' },
//                 password: { label: 'Password', type: 'password' },
//             },
//             async authorize(credentials: any) {
//                 const { email, password } = credentials;
//
//                 try {
//                     const response = await axios.post('https://masasi-intel.vercel.app/api/login', {
//                         email: email,
//                         password: password,
//                     });
//                     console.log(response);
//                     if (response.status === 200) {
//                         // Handle success
//                         return response.data;
//                     } else {
//                         // Handle non-success status codes
//                         console.error('API responded with an error:', response.status);
//                         return null;
//                     }
//                 } catch (error) {
//                     console.error('Error connecting to the API:', error);
//                     return null;
//                 }
//             },
//         }),
//     ],
//     session: {
//         strategy: 'jwt',
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//     pages: {
//         signIn: '/login',
//     },
// };
//
// const handler: NextApiHandler = NextAuth(authOptions);
//
// export { handler as GET, handler as POST };