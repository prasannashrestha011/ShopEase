import {z} from 'zod'
const   schema=z.object({
    email:z.string().refine((value) => emailValidator(value), {
        message: "Invalid email format",
    }),
    username:z.string().min(4,"Username is required"),
    password:z.string().min(8,"Password is required"),
    contactNumber:z.number().int().min(8,"Invalid number format"),
    address:z.string().min(2,"Address is required"),
    postalCode:z.number().int().min(4,"invalid post code"),
    province:z.string().min(4,"Invalid province name")
})
function emailValidator(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
export default schema;