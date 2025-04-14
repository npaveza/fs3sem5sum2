import { Usuario } from './usuario.model';

export interface Publicacion {
    titulo: string;
    contenido: string;
    autor: Usuario;
}
