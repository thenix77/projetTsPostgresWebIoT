import bycrypt from 'bcryptjs'

export interface IUser{
    id?:        number     
    nombre:     string       
    apellidop:  string
    apellidom:  string
    dni:        string
    email:      string
    password:   string
    rolid:      number
    active?:    boolean
    login?:     boolean
}

export interface ICredential{
    dni:        string
    password:   string
    login?:     boolean,
    logindate?: Date
}

export async function PasswordHash(password: string): Promise<string> {
    const salt = await bycrypt.genSalt(10);
    const pswd = await bycrypt.hash(password, salt);
    return pswd;
  }
  
  export async function ValidatePassword(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    return await bycrypt.compare(password, passwordHash);
  }