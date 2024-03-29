import {  hash, compare } from 'bcryptjs';


export let HashPassword = async(password: string) => {
    return await hash(password, 12);
}

export let comparePassword = async(password: string, storedPassword: string) => {
    return await compare(password, storedPassword);
}
