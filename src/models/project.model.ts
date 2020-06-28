export interface IProject {
    id?:            number
    nombre:         string
    descripcion:    string
    userid:         number
    active?:        boolean,
    updated?:       Date
}

export interface IProjectId{
    id:         number
}